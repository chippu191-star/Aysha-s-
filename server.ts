import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { CATALOG } from "./src/data.js"; // Standard import or keep consistent with TS

dotenv.config();

const app = express();
const PORT = 3000;

// Parse JSON payload sizes
app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Stylist AI will yield elegant high-fashion custom rules on localized logic.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoint for the AI Personal Stylist
app.post("/api/stylist", async (req, res) => {
  try {
    const { occasion, preferredStyle, bodyShape, height, colorPalette, selectedCategory } = req.body;

    const fallbackStylingAdvice = `Welcome to Aysha's Boutique. As your private atelier, we recommend styling based on your choice: ${selectedCategory || "Elite customwear"}. For a height of ${height || "standard sizing"} and ${bodyShape || "premium contour"} frame, our signature drape silhouettes in ${colorPalette || "luxurious neutrals"} are optimized to yield a statuesque, flowing contour. We suggest high-waisted cinches and tailored bodice structures to promote elegant length and majestic movement.`;

    const getFallbackProduct = (cat: string) => {
      const c = (cat || "").toLowerCase();
      if (c.includes("salwar") || c.includes("kurthi") || c.includes("ethnic")) {
        return { id: "eth-1", name: "Zari-Embroidered Rosewood Festive Salwar Suit" };
      } else if (c.includes("coord") || c.includes("co-ord")) {
        return { id: "cas-3", name: "Gulhar Handloom Indigo Block-Print Co-ord Set" };
      } else if (c.includes("top") || c.includes("crop")) {
        return { id: "cas-5", name: "Zola Tiered Muslin Crop-Top & Skirt Set" };
      } else if (c.includes("office") || c.includes("formal")) {
        return { id: "west-1", name: "Sorrento Blazer & Tailored Office Wear Suit" };
      } else if (c.includes("festive")) {
        return { id: "form-2", name: "Classic High-Neck Festive Kurthis Gown" };
      } else if (c.includes("casual")) {
        return { id: "cas-4", name: "Aura Pastel Sage Linen Kurta-Set" };
      }
      return { id: "eth-1", name: "Zari-Embroidered Rosewood Festive Salwar Suit" };
    };

    const recommended = getFallbackProduct(selectedCategory);

    const fallbackResponse = {
      stylingAdvice: fallbackStylingAdvice,
      productRecommendation: {
        productId: recommended.id,
        productName: recommended.name,
        reasoning: "Selected based on design proportions to optimize silhouette draping, shoulder structure, and effortless premium wear."
      },
      customTailoringRules: {
        optimalLength: height === "petite" ? "52 inches (ankle length overlay)" : "56-58 inches (full-sweep grace drape)",
        collarSuggestion: bodyShape === "hourglass" || bodyShape === "pear" ? "Mandarin neckline with fine gold accent lace" : "Elongated soft sweetheart collar line",
        sleeveStyling: "Flared three-quarter organza sleeves with handcrafted micro-scallop hems",
        bodiceAlteration: "Relaxed custom corset bone lines to anchor posture and emphasize natural draping points"
      },
      accessorizingChecklist: [
        "Uncut heavy pearl earrings matching the subtle collar glints",
        "Pointed toe block-heel mules or subtle matching silk shoes",
        "Minimalist handwoven metal box-clutch"
      ]
    };

    const ai = getAiClient();
    if (!ai) {
      // Return beautiful fallback if Gemini API is not yet supplied by user panels
      return res.json(fallbackResponse);
    }

    const catalogCompact = CATALOG.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      fabric: p.fabric,
      description: p.description,
      stylingTips: p.stylingTips,
      fitNotes: p.fitNotes
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are the Elite Lead Haute-Couture Stylist at "Aysha's Boutique" (Premium Women's Clothing brand specializing in Ethnic, western, formal, imported, and casual wear, focusing on Fit, style, and perfection with worldwide shipping).
      Analyze this customer's profile and recommend the perfect fit guidelines and catalog selection.

      User Profile:
      - Occasion: ${occasion}
      - Preferred Vibe: ${preferredStyle}
      - Body Shape Profile: ${bodyShape}
      - Height Category: ${height}
      - Color Palette Preference: ${colorPalette}
      - Selected Apparel Category: ${selectedCategory || "Any/Premium"}

      Here is Aysha's Boutique's current curated catalog for recommendations:
      ${JSON.stringify(catalogCompact, null, 2)}`,
      config: {
        systemInstruction: "You are an elite, warm, highly professional French-Arabic fashion atelier styling consultant. You always write with gorgeous style terminology, avoiding dry code lingo. Generate beautiful, precise fitting tips and tailor adjustments for their height and body shapes.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stylingAdvice: {
              type: Type.STRING,
              description: "Warm, highly detailed stylist advice (~120-180 words) focusing on the draping, colors, and balance of curves for their height and shape profile."
            },
            productRecommendation: {
              type: Type.OBJECT,
              properties: {
                productId: { type: Type.STRING, description: "Must match exactly one ID in the catalog, e.g. 'eth-1', 'west-1', 'form-2' or 'cas-1'." },
                productName: { type: Type.STRING, description: "Name of the matched product from the catalog." },
                reasoning: { type: Type.STRING, description: "Bespoke reason why this specific product behaves beautifully with their request." }
              },
              required: ["productId", "productName", "reasoning"]
            },
            customTailoringRules: {
              type: Type.OBJECT,
              properties: {
                optimalLength: { type: Type.STRING, description: "Optimal dress length suggestion in inches & why based on their height category." },
                collarSuggestion: { type: Type.STRING, description: "Flattering collar style recommendation based on body shape/face frame." },
                sleeveStyling: { type: Type.STRING, description: "Sleeve style recommendation, e.g. bishop sleeves, micro-pleat sheer cup, tailored cuff." },
                bodiceAlteration: { type: Type.STRING, description: "Atelier custom tailor adjustment, such as center waist cinch, padded-shoulder structure, bias drape alignment." }
              },
              required: ["optimalLength", "collarSuggestion", "sleeveStyling", "bodiceAlteration"]
            },
            accessorizingChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of exactly 3 curated accessories or shoes to complement this ensemble."
            }
          },
          required: ["stylingAdvice", "productRecommendation", "customTailoringRules", "accessorizingChecklist"]
        }
      }
    });

    const textOutput = response.text;
    if (textOutput) {
      const parsedData = JSON.parse(textOutput);
      return res.json(parsedData);
    } else {
      return res.json(fallbackResponse);
    }
  } catch (error) {
    console.error("Gemini API server proxy encountered an error:", error);
    // Graceful recovery
    res.status(200).json({
      stylingAdvice: "Our atelier is currently optimizing recommendations under custom artisan guidelines. For your body shape and desired occasion, we suggest prioritizing fluid, long-torso drapes with structured waist alignments. We recommend our pure raw silks or mulberry satins designed to cascade gracefully.",
      productRecommendation: {
        productId: "eth-1",
        productName: "Zari-Embroidered Rosewood Anarkali",
        reasoning: "Crafted with majestic floor-sweeping panels that elongate the body line while offering adjustable corset-laced backs for custom bodice fit."
      },
      customTailoringRules: {
        optimalLength: "54-56 inches based on standard grace-cut requirements",
        collarSuggestion: "Subtle jewel sweetheart collar finished with micro-zari linings",
        sleeveStyling: "Sheer Organza slim sleeves with delicate scalloping cuffs",
        bodiceAlteration: "Double reinforced boning stitch at mid-waist for maximum support and vertical flow accentuation"
      },
      accessorizingChecklist: [
        "Uncut Polki or drop pearl neckwear and matching minimal studs",
        "Metallic gold pointed block heels for majestic posture",
        "Premium matching hand-beaded raw-silk mini pouch"
      ]
    });
  }
});

// Configure Vite or Static Asset Fallback
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve SPA index
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Boutique server humming elegantly on http://0.0.0.0:${PORT}`);
  });
};

startServer();
