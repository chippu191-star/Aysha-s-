import React, { useState } from "react";
import { Sparkles, Compass, Check, BookOpen, Loader2, ArrowRight, ShoppingBag } from "lucide-react";
import { StylingRequest, StylistLookbook, CustomMeasurements } from "../types.js";
import { CATALOG, Product } from "../data.js";

interface AiStylistProps {
  currentMeasurements: CustomMeasurements;
  onApplyProductToCart: (product: Product, lookbookDetails?: any) => void;
  onMatchedProductClick: (productId: string) => void;
}

const OCCASIONS = [
  "Bespoke Wedding Gala / Reception",
  "Elite High-Tea & Garden Party",
  "Red Carpet / Evening Soiree",
  "Embassy Gala & Corporate Dinner",
  "Luxury Jet-Set Resort Vacation",
  "Chic Sunday Brunch / Midsummer Lounge"
];

const VIBES = [
  "Majestic & Heavily Embroidered",
  "Minimalist Modern Contemporary",
  "Vibrant Avant-Garde Statement",
  "Classic Royal & Understated Elegance",
  "Bohemian Airy Flowing Drapes"
];

const SHAPES = [
  { value: "hourglass", label: "Hourglass Outline" },
  { value: "pear", label: "Pear/Spoon Outline" },
  { value: "petite", label: "Petite Linear Frame" },
  { value: "tall", label: "Tall & Rectangular" },
  { value: "triangle", label: "Inverted Triangle" }
];

const COLOR_TEMPLATES = [
  "Muted Sands, Cream & Antique Gold",
  "Deep Royal Jewel Tones (Emerald, Crimson)",
  "Airy Pastels (Blush, Mint, Lavender)",
  "Midnight Jet Black & Slate Noir",
  "Saturated Crimson Wine & Mahogany Wood"
];

const CLOTHING_CATEGORIES = ["All / Mix", "Ethnic", "Western", "Formal", "Imported", "Casual"];

export default function AiStylist({ currentMeasurements, onApplyProductToCart, onMatchedProductClick }: AiStylistProps) {
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [vibe, setVibe] = useState(VIBES[1]);
  const [shape, setShape] = useState(SHAPES[0].value);
  const [colors, setColors] = useState(COLOR_TEMPLATES[0]);
  const [category, setCategory] = useState(CLOTHING_CATEGORIES[0]);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [lookbook, setLookbook] = useState<StylistLookbook | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const [addedToCart, setAddedToCart] = useState(false);

  const startLoadingAnimation = () => {
    setLoading(true);
    setLoadingStep(0);
    setErrorStatus(null);
    setAddedToCart(false);

    const steps = [
      "Consulting heritage atelier patterns...",
      "Analyzing curves & vertical proportions...",
      "Matching luxury raw silks & chiffons...",
      "Finalizing embroidered drape alignment recommendations..."
    ];

    const timer = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);

    return timer;
  };

  const getStepText = () => {
    const steps = [
      "Consulting heritage atelier patterns...",
      "Analyzing curves & vertical proportions...",
      "Matching luxury raw silks & chiffons...",
      "Finalizing embroidered drape alignment recommendations..."
    ];
    return steps[loadingStep];
  };

  const generateLookbook = async () => {
    const timer = startLoadingAnimation();

    try {
      const response = await fetch("/api/stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          occasion,
          preferredStyle: vibe,
          bodyShape: shape,
          height: currentMeasurements.heightCategory,
          colorPalette: colors,
          selectedCategory: category === "All / Mix" ? "" : category
        })
      });

      if (!response.ok) {
        throw new Error("Atelier server busy drafting high fashion guidelines.");
      }

      const data = await response.json();
      setLookbook(data);
    } catch (err: any) {
      console.error(err);
      setErrorStatus("Our atelier is experiencing extremely high demand. Enjoying our seasonal curated styling preview below.");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  // Match the lookbook matched ID against our catalog data
  const getMatchedProduct = (): Product | undefined => {
    if (!lookbook) return undefined;
    const recId = lookbook.productRecommendation.productId;
    return CATALOG.find((p) => p.id.toLowerCase() === recId.toLowerCase()) || CATALOG[0];
  };

  const handleApplyToCart = () => {
    const matched = getMatchedProduct();
    if (!matched) return;
    onApplyProductToCart(matched, lookbook?.customTailoringRules);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const matchedProduct = getMatchedProduct();

  return (
    <div id="ai-stylist-atelier" className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-[#1A1A1A]/10 luxury-shadow">
      <div className="border-b border-[#1A1A1A]/10 pb-5 mb-6">
        <span className="text-xs font-grotesk tracking-[0.2em] text-[#8E8A7F] font-semibold uppercase">Personal Haute-Couture Consultation</span>
        <h2 className="text-2xl font-display font-light text-[#1A1A1A] flex items-center gap-2 mt-1">
          <Compass className="h-6 w-6 text-[#8E8A7F] rotate-12" /> AI Personal Stylist
        </h2>
        <p className="text-xs text-neutral-500 mt-1">Receive tailored outfit pairings, material selection tips, and custom tailor blueprints powered by Generative AI.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Style Consultation Desk Selector Form */}
        <div className="xl:col-span-5 bg-white/60 p-6 rounded-xl border border-[#1A1A1A]/10 space-y-5">
          <h3 className="text-xs font-grotesk tracking-[0.2em] text-[#1A1A1A] font-semibold uppercase flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#8E8A7F]" /> Consultation Desk
          </h3>

          {/* Occasion Selection */}
          <div>
            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em] block mb-2">The Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/15 outline-none p-3 rounded-lg text-xs font-medium text-neutral-800 focus:border-[#8E8A7F]"
              style={{ minHeight: "44px" }}
            >
              {OCCASIONS.map((occ) => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          {/* Preferred Vibe */}
          <div>
            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em] block mb-2">Preferred Style Vibe</label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/15 outline-none p-3 rounded-lg text-xs font-medium text-neutral-800 focus:border-[#8E8A7F]"
              style={{ minHeight: "44px" }}
            >
              {VIBES.map((vb) => (
                <option key={vb} value={vb}>{vb}</option>
              ))}
            </select>
          </div>

          {/* Body Shape Outline */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em]">Body Silhouette Profile</label>
              <span className="text-[9px] text-zinc-400 font-mono font-semibold">Synced</span>
            </div>
            <select
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/15 outline-none p-3 rounded-lg text-xs font-medium text-neutral-800 focus:border-[#8E8A7F]"
              style={{ minHeight: "44px" }}
            >
              {SHAPES.map((sh) => (
                <option key={sh.value} value={sh.value}>{sh.label}</option>
              ))}
            </select>
          </div>

          {/* Colors */}
          <div>
            <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-[0.15em] block mb-2">Color Palette Vibe</label>
            <select
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/15 outline-none p-3 rounded-lg text-xs font-medium text-neutral-800 focus:border-[#8E8A7F]"
              style={{ minHeight: "44px" }}
            >
              {COLOR_TEMPLATES.map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
          </div>

          {/* Targeted Category filter */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Target Boutique Department</label>
            <div className="grid grid-cols-3 gap-2">
              {CLOTHING_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 text-[11px] font-medium rounded-lg border transition-all ${
                    category === cat
                      ? "bg-atelier-dark text-white border-atelier-dark"
                      : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                  }`}
                  style={{ minHeight: "44px" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            id="draft-lookbook-btn"
            onClick={generateLookbook}
            disabled={loading}
            className="w-full py-4.5 rounded-xl font-grotesk font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition bg-gradient-to-r from-atelier-dark via-atelier-clay to-atelier-dark hover:opacity-90 text-white disabled:opacity-50"
            style={{ minHeight: "50px" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-atelier-gold" /> Generating Consultation Lookbook...
              </>
            ) : (
              <>
                <Sparkles className="h-4.5 w-4.5 text-atelier-gold animate-bounce" /> Draft My Lookbook Outline
              </>
            )}
          </button>
        </div>

        {/* Dynamic Stylist Lookbook Output Results Panel */}
        <div className="xl:col-span-7 min-h-[480px] bg-amber-50/20 border border-gold-200/50 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <Loader2 className="h-10 w-10 text-atelier-gold animate-spin mb-4" />
              <h4 className="font-display text-lg font-medium text-neutral-800">Drafting Your Couture Lookbook</h4>
              <p className="text-xs text-neutral-500 max-w-sm mt-2">{getStepText()}</p>
              <div className="w-48 h-1 bg-neutral-100 rounded-full overflow-hidden mt-6">
                <div
                  className="h-full bg-atelier-gold transition-all duration-1000"
                  style={{ width: `${(loadingStep + 1) * 25}%` }}
                ></div>
              </div>
            </div>
          ) : lookbook ? (
            <div className="space-y-6">
              {/* Header block of the document */}
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gold-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-atelier-gold" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Couture Lookbook Issue #2026</span>
                </div>
                <span className="text-[10px] font-mono bg-gold-100 text-atelier-gold font-semibold px-2 py-0.5 rounded-full">Premium Consult Complete</span>
              </div>

              {/* Lookbook main advice */}
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-atelier-gold uppercase font-mono block mb-1">Stylist Atelier Letter</span>
                <p className="text-xs leading-relaxed text-zinc-700 italic border-l-2 border-gold-300 pl-4 bg-white/50 py-3 rounded-r-xl">
                  &ldquo;{lookbook.stylingAdvice}&rdquo;
                </p>
              </div>

              {/* Recommended Product matching */}
              {matchedProduct && (
                <div className="bg-white border border-neutral-100 rounded-2xl p-4 flex flex-col md:flex-row gap-4 luxury-shadow">
                  <div className="w-full md:w-32 h-36 rounded-xl overflow-hidden bg-neutral-100 shrink-0 relative">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-atelier-dark/80 backdrop-blur-xs text-white text-[9px] font-mono uppercase px-1.5 py-0.5 rounded">
                      Matched Item
                    </div>
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[9px] font-mono bg-amber-50 text-atelier-gold px-2 py-0.5 rounded">{matchedProduct.category} Catalog Match</span>
                      <h4 className="text-sm font-display font-medium text-neutral-900 mt-1">{matchedProduct.name}</h4>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Premium silk fabric: {matchedProduct.fabric}</p>
                      <p className="text-xs text-neutral-600 leading-relaxed mt-2 line-clamp-2">
                        <strong className="text-neutral-700">Stylist Reason:</strong> {lookbook.productRecommendation.reasoning}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => onMatchedProductClick(matchedProduct.id)}
                        className="text-xs text-atelier-gold font-semibold underline flex items-center gap-1 hover:text-atelier-dark cursor-pointer"
                      >
                        Inspect Full Atelier Spec <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bespoke Tailoring blueprints */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-neutral-100">
                  <h5 className="text-xs font-semibold text-atelier-dark mb-2.5 flex items-center gap-1">
                    <Check className="h-4 w-4 text-emerald-500" /> Optimal Pattern Sizing
                  </h5>
                  <ul className="space-y-1.5 text-xs text-neutral-500 list-inside list-disc">
                    <li><span className="text-neutral-700 font-medium">Bespoke Length:</span> {lookbook.customTailoringRules.optimalLength}</li>
                    <li><span className="text-neutral-700 font-medium">Neckline Framing:</span> {lookbook.customTailoringRules.collarSuggestion}</li>
                    <li><span className="text-neutral-700 font-medium">Sleeves Cut:</span> {lookbook.customTailoringRules.sleeveStyling}</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-neutral-100">
                  <h5 className="text-xs font-semibold text-atelier-dark mb-2.5 flex items-center gap-1">
                    <Check className="h-4 w-4 text-emerald-500" /> Atelier Accent Assembly
                  </h5>
                  <ul className="space-y-1.5 text-xs text-neutral-500 list-inside list-disc">
                    <li><span className="text-neutral-700 font-medium">Body Alignment:</span> {lookbook.customTailoringRules.bodiceAlteration}</li>
                    {lookbook.accessorizingChecklist.slice(0, 2).map((item, i) => (
                      <li key={i}><span className="text-neutral-700 font-medium">Accents Pair:</span> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Accessories Checklist */}
              <div className="bg-white p-4 rounded-xl border border-neutral-100">
                <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase font-mono block mb-2">Curated Styling Pairings Accessory List</span>
                <div className="flex flex-col md:flex-row gap-3">
                  {lookbook.accessorizingChecklist.map((item, i) => (
                    <div key={i} className="flex-1 border-neutral-200 bg-neutral-50 p-2.5 rounded-lg text-xs text-neutral-600 flex items-start gap-2">
                      <span className="font-mono text-atelier-gold text-[10px] font-bold mt-0.5">#{i+1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold-200/30">
                <button
                  id="lookbook-add-cart"
                  onClick={handleApplyToCart}
                  className={`flex-1 py-3 px-6 rounded-xl font-grotesk font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer ${
                    addedToCart
                      ? "bg-emerald-600 text-white"
                      : "bg-atelier-dark text-white hover:bg-atelier-clay"
                  }`}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {addedToCart ? "Matched Outfit Added!" : "Add Matched Outfit to stitching order"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center text-neutral-400">
              <Compass className="h-12 w-12 text-gold-200 mb-3 animate-spin duration-3000" />
              <h4 className="font-display text-lg font-medium text-neutral-700">Digital Lookbook Waiting Room</h4>
              <p className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
                Provide your desirable occasion vibe, color palettes, and body format on the left to invoke the atelier styling computer.
              </p>
            </div>
          )}

          {errorStatus && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl mt-3">
              {errorStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
