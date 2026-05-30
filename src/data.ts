export interface Product {
  id: string;
  name: string;
  category: 'Ethnic' | 'Western' | 'Formal' | 'Imported' | 'Casual';
  fabric: string;
  price: number;
  description: string;
  image: string;
  details: string[];
  stylingTips: string;
  fitNotes: string;
}

export const CATALOG: Product[] = [
  {
    id: "eth-1",
    name: "Zari-Embroidered Rosewood Festive Salwar Suit",
    category: "Ethnic",
    fabric: "Premium Pure Banarasi Organza & Raw Silk",
    price: 340,
    description: "An elegant, voluminous premium festive salwar suit detailed with authentic metallic silver and golden Zari hand embroidery. Framed with custom tailored lining that creates a flattering drape profile across the torso.",
    image: "/src/assets/images/ethnic_festive_luxury_1780133712929.png", // Custom generated asset
    details: [
      "Bespoke hand-tailored festive salwar silhouette finished with golden threadwork",
      "Stitched with traditional Indian necklines and elegant side cuts",
      "Sheer organza sleeves with handcrafted scallop lace borders",
      "Paired with a pure Banarasi tissue-silk dupatta weave"
    ],
    stylingTips: "Pair with vintage gold jhumkas and flat juttis or gold wedges. Perfect for grand weddings and festive occasions.",
    fitNotes: "Structured bodice with supportive double lining. Highly versatile drape that flatters hourglass and spoon shapes."
  },
  {
    id: "eth-2",
    name: "Ivory Jada Lucknowi Chikankari Kurthis & Lehenga",
    category: "Ethnic",
    fabric: "Delicate Chanderi Silk & Handloom Voile",
    price: 410,
    description: "A breathtaking pure ivory handcrafted kurthis set boasting thousands of shadow-work embroidery stitches, paired with a heavy flare bottom set. Perfect for luxury traditional styling.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop",
    details: [
      "Mastercrafted Lucknowi shadow-work kurthis handiwork with fine cotton floss",
      "Subtle silver Mukaish embellishments interspersed throughout the flare",
      "Comfort-fit drawstring waist finished with hand-spun cotton tassels",
      "Full modal satin lining for a rich, heavy cascade effect"
    ],
    stylingTips: "Best styled with uncut polki or high-contrast emerald jewelry and a middle-parted sleek bun.",
    fitNotes: "Adjustable drawstring waist. Ideal for customizing flare-drop to accent torso height."
  },
  {
    id: "west-1",
    name: "Sorrento Blazer & Tailored Office Wear Suit",
    category: "Western",
    fabric: "Premium Italian Worsted Wool & Viscose",
    price: 290,
    description: "A signature sharp professional suit crafted for elite office wears and formal meetings. Designed with clean architectural shoulder lines, a deep double-breasted lapel, and fluid wide-leg trouser fall.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=700&auto=format&fit=crop",
    details: [
      "Sharp split lapels with hand-stitched reinforcement",
      "Sleek concealed pockets and hand-selected buttoning",
      "High-rise trouser featuring permanent front-creased stitch",
      "Full breathable satin backlining"
    ],
    stylingTips: "Accompany with a gold link neck choker, bare neck, and pointed block-heel mules.",
    fitNotes: "Sculpted shoulders with regular casual waist sizing. Fits wonderfully on rectangular and athletic forms."
  },
  {
    id: "west-2",
    name: "Parisienne Silk Satin Crop Top & Slip Set",
    category: "Western",
    fabric: "Heavyweight Mulberry Silk Satin",
    price: 220,
    description: "An elegant crop top combined with our iconic bias-cut drape skirt set. Designed with a loose fluid aesthetic to bring comfort to high-fashion western silhouettes.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=700&auto=format&fit=crop",
    details: [
      "Premium satin crop top with high support and hand-finished borders",
      "True bias cut slip structure facilitating gentle contour fitting",
      "Low cowl back with secure micro-tie-back adjustments",
      "Double lined panels to ensure comfort and seamless wear"
    ],
    stylingTips: "Wear an oversized heavy camel-wool trench coat on top for an effortless Parisian evening look.",
    fitNotes: "Bias cut grows horizontally to accommodate curves. Fits hourglass, pear, and athletic body frames wonderfully."
  },
  {
    id: "form-1",
    name: "Royal Velvet Festive & Office Wear Gown",
    category: "Formal",
    fabric: "Deep Onyx French Silk Velvet",
    price: 360,
    description: "A breathtaking wrap velvet formal outfit styled elegantly for high-stakes professional meetings or festive celebrations. Features silk shawl lapels and a tailored wrap-clasp.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=700&auto=format&fit=crop",
    details: [
      "Lustrous silk satin face lapels contrasting off heavy black plush velvet",
      "Gilded interior button locks and wrap front wrap-clasp hardware",
      "Elegant high slit detailed with soft silk gathers",
      "Premium padded shoulder structure"
    ],
    stylingTips: "Wear with diamond studs and minimalist black strappy heels to showcase the leg split.",
    fitNotes: "Crossover design makes the waist highly adjustable. Best choice for pear and inverted triangle structures."
  },
  {
    id: "form-2",
    name: "Classic High-Neck Festive Kurthis Gown",
    category: "Formal",
    fabric: "Japanese Pleated Micro-Organza",
    price: 450,
    description: "A masterful visual couture gown representing modern Indian fashion. Featuring an intricate sunburst pleated upper panel that descends into a layered voluminous festive silhouette.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=700&auto=format&fit=crop",
    details: [
      "Hand-pleated high jewel neckline with elegant back-nape tie bow",
      "Triple layered organza crinoline inner mesh for full structured shape",
      "Unfinished hemlines to accentuate the airy, floating movement",
      "Sleek hidden side zip closure"
    ],
    stylingTips: "Accessorize minimally with drop pearl earrings and a simple gold clutch.",
    fitNotes: "Fitted around the chest and high ribs, entirely free through the hips. Beautiful on petite as well as tall formats."
  },
  {
    id: "imp-1",
    name: "Korean Silk-Crepe Draped Tops & Saree Set",
    category: "Imported",
    fabric: "Premium Imported Korean Georgette-Silk Crepe",
    price: 310,
    description: "Crafted directly from imported East-Asian textile houses. Featuring a bespoke pre-pleated drape with designer tops. Highly adaptable for dynamic style statement edits.",
    image: "https://images.unsplash.com/photo-1583391265517-35bbadd01209?q=80&w=700&auto=format&fit=crop",
    details: [
      "Pre-engineered structural waist pleats suitable for instant slip-on",
      "Ethereal shimmer-crepe texture that catches candle-lighting wonderfully",
      "Contoured waistline border embedded with subtle metallic luster thread",
      "Includes premium semi-stitched standard designer tops and blouse fabric"
    ],
    stylingTips: "Drape the pallu loosely over the arm and match with sleek art-deco metal bracelets.",
    fitNotes: "Custom adjustable inner waistband fits waistlines from 24 to 38 inches effortlessly."
  },
  {
    id: "imp-2",
    name: "Kyoto Blossom Chiffon Crop Top Dress",
    category: "Imported",
    fabric: "Traditional Japanese Habotai Silk Blend Chiffon",
    price: 270,
    description: "An imported luxury overlay detailed with intricate painted floral motifs, paired with an silk inner crop top. Perfect for hot weather resort styles or summer luxury getaways.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=700&auto=format&fit=crop",
    details: [
      "Extremely wide, flowing sleeves representing classic drape cuts",
      "Semi-sheer silk finish with hand-painted organic flora illustrations",
      "Open-front flow with adjustable double-braided silk waist chord",
      "Delicate French-rolled lock seam margins throughout"
    ],
    stylingTips: "Wear over ivory linen coordinates or as an accent dress wrap over satin pants.",
    fitNotes: "Relaxed fluid drape. One size fits all spectacularly from size US 0 to US 16."
  },
  {
    id: "cas-1",
    name: "Portofino Linen Casual Wear Set",
    category: "Casual",
    fabric: "Pure Sourced Belgian Flax Linen",
    price: 180,
    description: "Sophisticated organic design for everyday casual wear. A relaxed, modern utility long collar popover coupled with mid-weight drawcord wide-leg trousers. Naturally textured and pre-washed for extreme softness.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=700&auto=format&fit=crop",
    details: [
      "Premium 100% Belgian organic linen weave with elegant slub texture",
      "Camp collar relaxed shirt with premium real pearl shell buttoning",
      "Elasticated back-waistband with solid organic cotton drawcords",
      "Deep concealed side-slash pockets"
    ],
    stylingTips: "Style with tortoiseshell sunglasses, a straw beach bag, and leather strap flat slide-ons.",
    fitNotes: "Generous fit. Order regular size for true laid-back resort fit or down one size for slim styling."
  },
  {
    id: "cas-2",
    name: "Catalina Cotton Ribbed Knit Co-ord Set",
    category: "Casual",
    fabric: "Organic Mercerized Long-Staple Cotton",
    price: 195,
    description: "Ultra-soft cotton ribbed knit co-ord sets that bring structured refinement to leisure. Designed in a gorgeous sandy beige hue, containing a luxurious knit top and matching ribbed wide-pants.",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=700&auto=format&fit=crop",
    details: [
      "Premium fine-gauge knit stitch providing natural 4-way stretch",
      "Elegant mock-turtleneck band line for beautiful structural look",
      "Side tunic slits matching the tailored floor-skimming pants sweep",
      "Lint-resistant finish that preserves the premium smooth sheen"
    ],
    stylingTips: "Accentuate with gold hoop earrings and neutral chunky leather sneakers or loafers.",
    fitNotes: "Highly forgiving knit weave that contours curves without compression. Magnificent on all shapes."
  },
  {
    id: "cas-3",
    name: "Gulhar Handloom Indigo Block-Print Co-ord Set",
    category: "Casual",
    fabric: "Premium 100% Handloom Jaipur Cotton",
    price: 165,
    description: "A Pinterest-trending bohemian double-cotton coordinate featuring a stunning hand-block printed indigo motif. Engineered with a relaxed notched-collar shirt-tunic and breezy tailored cigarette pants for supreme daylong elegance.",
    image: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=700&auto=format&fit=crop",
    details: [
      "Genuine vegetable-dyed Indigo block prints handcrafted by regional artisans",
      "Relaxed drop-shoulder silhouette with elegant wooden coconut shell button closures",
      "Tailored utility ankle pants finished with a subtle scalloped hem detail",
      "Two functional deep side pockets for effortless utility"
    ],
    stylingTips: "Complements leather slide sandals, oversized canvas totes, and raw silver jewelry.",
    fitNotes: "Breezy drape with adjustable back-elastic waistband. Beautifully fits rectangle, pear, and column shapes."
  },
  {
    id: "cas-4",
    name: "Aura Pastel Sage Linen Kurta-Set",
    category: "Casual",
    fabric: "Premium Belgian Linen [Rustic Slub]",
    price: 190,
    description: "The ultimate minimalist summer drape seen all over Pinterest. A soothing pastel sage green short kurta paired with signature fluid straight-leg bottoms, embellished with subtle organic ivory hand-threadwork embroidery.",
    image: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=700&auto=format&fit=crop",
    details: [
      "Breathable pure-spun flax fibers with a premium rustic slub texture",
      "Aesthetic V-neck accented with delicate lace insertion panels",
      "Straight relaxed bottoms with comfort elastication and flat-front waist",
      "Finished with elegant side slit drapes for effortless walking mobility"
    ],
    stylingTips: "Style with pearl stud earrings and braided jute wedges for a clean organic design aesthetic.",
    fitNotes: "Designed for a relaxed breathing room drape. Flattering for athletic, pear, and round silhouettes."
  },
  {
    id: "cas-5",
    name: "Zola Tiered Muslin Crop-Top & Skirt Set",
    category: "Casual",
    fabric: "Double-Weave Organic Cotton Muslin",
    price: 175,
    description: "Deeply inspired by Parisian countryside aesthetics trending on Pinterest. A breathable tiered coordinate comprising a tailored smocked crop top and a dynamic high-rise matching tiered maxi skirt with a majestic swaying silhouette.",
    image: "https://images.unsplash.com/photo-1609187982841-184bc2471325?q=80&w=700&auto=format&fit=crop",
    details: [
      "Premium organic double-layered gauze muslin that softens with every wash",
      "Form-adaptive smocked bodice ensuring secure slip-free support",
      "Graceful multi-tiered gathered panel skirt ending in delicate lettuce edges",
      "Fully lined with ultra-breathable soft cotton lawn fabric"
    ],
    stylingTips: "Accompany with a messy bun, golden dainty chain necklaces, and flat tan gladiators.",
    fitNotes: "Smocked elastic stretch top and flexible skirt waistband accommodates multiple sizes easily."
  }
];

export interface ShippingRate {
  region: string;
  deliveryTime: string;
  baseFee: number;
  expressUpgrade: number;
}

export const SHIPPING_PRESETS: ShippingRate[] = [
  { region: "India (All States & Home Delivery)", deliveryTime: "2 - 4 Business Days", baseFee: 0, expressUpgrade: 5 },
  { region: "Middle East & Gulf Counties", deliveryTime: "3 - 5 Business Days", baseFee: 10, expressUpgrade: 20 },
  { region: "USA & Canada Logistics", deliveryTime: "4 - 7 Business Days", baseFee: 15, expressUpgrade: 30 },
  { region: "United Kingdom & UK Ports", deliveryTime: "3 - 5 Business Days", baseFee: 12, expressUpgrade: 25 },
  { region: "Europe (Schengen Zone)", deliveryTime: "4 - 6 Business Days", baseFee: 15, expressUpgrade: 28 },
  { region: "Rest of Asia & Worldwide", deliveryTime: "5 - 8 Business Days", baseFee: 18, expressUpgrade: 35 }
];
