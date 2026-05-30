import React, { useState, useRef } from "react";
import {
  ShoppingBag,
  Sparkles,
  Scissors,
  Globe,
  Plus,
  Trash2,
  ChevronRight,
  Sliders,
  Check,
  ChevronLeft,
  X,
  PlusCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Instagram,
  MapPin,
  Phone,
  User,
  ExternalLink
} from "lucide-react";
import { Product, CATALOG, SHIPPING_PRESETS, ShippingRate } from "./data.js";
import { CustomMeasurements, CartItem } from "./types.js";
import FitCalculator from "./components/FitCalculator.js";
import AiStylist from "./components/AiStylist.js";

export default function App() {
  // Global tailored measurement snapshot state
  const [measurements, setMeasurements] = useState<CustomMeasurements>({
    bust: 36,
    waist: 28,
    hips: 38,
    heightValue: 165,
    heightCategory: "regular",
    shoulder: 14.5
  });

  // Shopping cart/enquiry bag
  const [cart, setCart] = useState<CartItem[]>([]);

  // Selected category state for collection filtering
  const [activeCategory, setActiveCategory] = useState<'Ethnic' | 'Western' | 'Formal' | 'Imported' | 'Casual'>("Ethnic");

  // Selected product in focus modal drawer
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Special worldwide destination state
  const [shippingRegion, setShippingRegion] = useState<string>("USA & Canada");

  // Custom order feedback state after success
  const [enquirySent, setEnquirySent] = useState(false);

  // Selected contact routing preference (Hotline numbers)
  const [chosenContact, setChosenContact] = useState<'Shifana' | 'Niyas'>('Shifana');

  // Scroll triggers
  const collectionsRef = useRef<HTMLDivElement>(null);
  const stylistRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const updateMeasurements = (newM: CustomMeasurements) => {
    setMeasurements(newM);
  };

  const getActiveShippingPreset = (): ShippingRate => {
    return SHIPPING_PRESETS.find((p) => p.region === shippingRegion) || SHIPPING_PRESETS[0];
  };

  // Convert measurement values to overall standard size
  const getStandardSizeCode = (m: CustomMeasurements) => {
    let sizeIndex = 6;
    if (m.bust > 44 || m.waist > 38 || m.hips > 46) sizeIndex = 18;
    else if (m.bust > 41 || m.waist > 35 || m.hips > 43) sizeIndex = 16;
    else if (m.bust > 39 || m.waist > 32 || m.hips > 41) sizeIndex = 14;
    else if (m.bust > 37 || m.waist > 29 || m.hips > 39) sizeIndex = 12;
    else if (m.bust > 35 || m.waist > 27 || m.hips > 37) sizeIndex = 10;
    else if (m.bust > 33 || m.waist > 25 || m.hips > 35) sizeIndex = 8;

    const heightCode = m.heightValue < 160 ? "P" : m.heightValue > 175 ? "T" : "R";
    return `AB-${sizeIndex}${heightCode}`;
  };

  // Add normal items to custom stitch list
  const handleAddProductToCart = (p: Product) => {
    const sizeCode = getStandardSizeCode(measurements);
    const newItem: CartItem = {
      id: `${p.id}-${Date.now()}`,
      product: p,
      measurementsSnapshot: { ...measurements },
      bespokeSizeCode: sizeCode,
      customNotes: ""
    };
    setCart((prev) => [...prev, newItem]);
    setSelectedProduct(null); // Close details modal if open
  };

  // Add lookbook product to cart with custom Gemini metrics
  const handleApplyProductToCart = (p: Product, lookbookRules?: any) => {
    const sizeCode = getStandardSizeCode(measurements);
    const newItem: CartItem = {
      id: `${p.id}-${Date.now()}`,
      product: p,
      measurementsSnapshot: { ...measurements },
      bespokeSizeCode: sizeCode,
      customNotes: `Applied recommended tailored cut instructions.`,
      lookbookApplied: true,
      lookbookCustomizations: lookbookRules
        ? {
            length: lookbookRules.optimalLength || "N/A",
            collar: lookbookRules.collarSuggestion || "N/A",
            sleeves: lookbookRules.sleeveStyling || "N/A",
            alt: lookbookRules.bodiceAlteration || "N/A"
          }
        : undefined
    };
    setCart((prev) => [...prev, newItem]);
  };

  const handleUpdateNotes = (cartItemId: string, notes: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, customNotes: notes } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Open an item in detail frame when clicked in the lookbook advisor
  const handleMatchedProductClick = (productId: string) => {
    const found = CATALOG.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
      setActiveCategory(found.category);
      if (collectionsRef.current) {
        collectionsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Generate perfect formatted text for genuine WhatsApp checkout redirect
  const generateWhatsAppCheckoutLink = () => {
    const activeShipping = getActiveShippingPreset();
    const sizeCode = getStandardSizeCode(measurements);

    let message = `*AYSHA'S BOUTIQUE - Haute Couture Order Enquiry*\n`;
    message += `======================================\n\n`;
    message += `• *Bespoke Sizing Snapshot (Tailored Fit Profile):*\n`;
    message += `  - Sizing Index Code: *${sizeCode}*\n`;
    message += `  - Chest/Bust: ${measurements.bust} inches\n`;
    message += `  - Waistline: ${measurements.waist} inches\n`;
    message += `  - Hips Measurement: ${measurements.hips} inches\n`;
    message += `  - Shoulder Width: ${measurements.shoulder} inches\n`;
    message += `  - Exact Height: ${measurements.heightValue} cm\n\n`;

    message += `• *Curated Enquired Designs List:*\n`;
    cart.forEach((item, index) => {
      message += `  ${index + 1}. *${item.product.name}* (${item.product.category})\n`;
      message += `     - Fabric choice: ${item.product.fabric}\n`;
      message += `     - Base Price: $${item.product.price} USD\n`;
      if (item.lookbookApplied && item.lookbookCustomizations) {
        message += `     - [AI Stylist Blueprint Opted]:\n`;
        message += `       * Style Neck: ${item.lookbookCustomizations.collar}\n`;
        message += `       * Style Sleeve: ${item.lookbookCustomizations.sleeves}\n`;
        message += `       * Stitch Length: ${item.lookbookCustomizations.length}\n`;
        message += `       * Tailor Alteration: ${item.lookbookCustomizations.alt}\n`;
      }
      if (item.customNotes) {
        message += `     - Hand-stitch instructions: "${item.customNotes}"\n`;
      }
      message += `\n`;
    });

    const itemsTotal = cart.reduce((sum, item) => sum + item.product.price, 0);
    const stitchFee = cart.length * 35; // Custom customwear fee
    const shippingFee = activeShipping.baseFee;
    const finalTotal = itemsTotal + stitchFee + shippingFee;

    message += `• *Worldwide Logistics Estimation:*\n`;
    message += `  - Shipping Location: *${activeShipping.region}*\n`;
    message += `  - Transit Lead Time: *${activeShipping.deliveryTime}*\n`;
    message += `  - Shipping & Packing Duty: $${shippingFee} USD\n\n`;

    message += `• *Estimated Grand Valuation:* $${finalTotal} USD\n`;
    message += `  _(Outfits Total: $${itemsTotal} | Personalized Fit & Muslin Drapery Fee: $${stitchFee} | Shipping: $${shippingFee})_\n\n`;
    message += `======================================\n`;
    message += `Thank you for choosing Aysha's Boutique. Fit, style, and perfection is our covenant. Please review my custom workshop pattern sheet and advise on the next steps!\n`;

    const phoneNum = chosenContact === 'Shifana' ? '917510537324' : '919645537324';
    const encodedText = encodeURIComponent(message);
    return `https://wa.me/${phoneNum}?text=${encodedText}`;
  };

  const handleSendWhatsAppEnquiry = () => {
    const link = generateWhatsAppCheckoutLink();
    window.open(link, "_blank");
    setEnquirySent(true);
    setTimeout(() => setEnquirySent(false), 5000);
  };

  // Filter products by active category
  const filteredProducts = CATALOG.filter((p) => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price, 0);
  const activeShipping = getActiveShippingPreset();

  return (
    <div className="min-h-screen bg-atelier-champagne flex flex-col justify-between selection:bg-gold-200">
      
      {/* ANNOUNCEMENT HEADER BANNER */}
      <div className="bg-[#1A1A1A] text-[#F8F7F4] text-center py-3 px-4 border-b border-[#F8F7F4]/10 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium flex flex-col md:flex-row justify-center items-center gap-1.5 md:gap-8 z-50">
        <span className="flex items-center gap-1.5"><span className="text-[#8E8A7F]">✈</span> All India Home Delivery &amp; Worldwide Shipping</span>
        <span className="hidden md:inline text-[#8E8A7F]">•</span>
        <span className="flex items-center gap-1.5"><span className="text-[#8E8A7F]">✨</span> Easy Customisation in Direct WhatsApp Chat</span>
        <span className="hidden md:inline text-[#8E8A7F]">•</span>
        <span className="text-[#8E8A7F]">Get your perfect fits in our magical hand</span>
      </div>

      {/* BRAND HEADER BAR */}
      <nav id="atelier-brand-navbar" className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-24 relative">
            
            {/* Left Nav links */}
            <div className="hidden lg:flex items-center space-x-8 text-[11px] uppercase tracking-[0.2em] font-semibold">
              <button
                onClick={() => scrollToSection(collectionsRef)}
                className="hover:opacity-60 cursor-pointer transition text-neutral-800"
              >
                Collections
              </button>
              <button
                onClick={() => scrollToSection(stylistRef)}
                className="hover:opacity-60 cursor-pointer transition flex items-center gap-1.5 text-neutral-800"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#8E8A7F]" /> Atelier Stylist
              </button>
              <button
                onClick={() => scrollToSection(fitRef)}
                className="hover:opacity-60 cursor-pointer transition flex items-center gap-1.5 text-neutral-800"
              >
                <Scissors className="h-3.5 w-3.5 text-[#8E8A7F]" /> Fitting Room
              </button>
            </div>

            {/* Mobile simplified trigger */}
            <div className="lg:hidden flex gap-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-700">
              <button onClick={() => scrollToSection(collectionsRef)} className="hover:opacity-60">Collections</button>
              <button onClick={() => scrollToSection(stylistRef)} className="hover:opacity-60">Stylist</button>
            </div>

            {/* Centered Brand Title */}
            <div className="absolute left-1/2 -translate-x-1/2 text-center flex flex-col items-center">
              <h1 className="text-2xl sm:text-3.5xl tracking-[0.25em] font-display uppercase font-light text-[#1A1A1A]">
                Aysha&apos;s
              </h1>
              <span className="text-[10px] font-grotesk tracking-[0.3em] uppercase text-[#8E8A7F] -mt-1 block">Boutique</span>
            </div>

            {/* Right-most icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("logistics-guide");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden md:block text-[11px] uppercase tracking-[0.2em] font-semibold text-neutral-800 hover:opacity-60 cursor-pointer transition"
              >
                Shipping
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("stitching-cart-dock");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-5 py-3 bg-[#1A1A1A] text-[#F8F7F4] hover:bg-[#1A1A1A]/90 transition cursor-pointer text-[11px] uppercase tracking-[0.2em] font-semibold relative"
                style={{ minHeight: "44px" }}
              >
                <ShoppingBag className="h-4 w-4 text-[#8E8A7F]" />
                <span className="hidden sm:inline">Cart</span>
                <span className="font-mono">({cart.length})</span>
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* EDITORIAL HERO LOBBY ROW */}
      <section id="atelier-hero-lobby" className="bg-[#F8F7F4] text-[#1A1A1A] border-b border-[#1A1A1A]/10 py-12 lg:py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Curating Arch Fashion Image */}
            <div className="lg:col-span-5 flex flex-col order-last lg:order-first">
              <div className="relative aspect-[3/4] bg-[#EBE9E2] overflow-hidden rounded-t-[180px] rounded-b-xl border border-[#1A1A1A]/5 shadow-sm group">
                <img
                  src="/src/assets/images/hero_fashion_banner_1780133691647.png" // High end fashion image asset
                  alt="Aysha's Boutique Couture Campaign"
                  className="absolute inset-0 w-full h-full object-cover object-center transition duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                {/* Visual linear gradient matching bottom of the design */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-[#F8F7F4]">
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-80 mb-1.5 font-grotesk font-semibold text-[#8E8A7F]">Haute Couture Volume 01</p>
                  <h3 className="font-display italic text-2xl tracking-wide font-light">The Summer Solstice</h3>
                </div>
              </div>
              <div className="mt-5 flex justify-between items-center text-[#1A1A1A]">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border border-[#F8F7F4] bg-[#D4D1CA] shadow-xs"></div>
                  <div className="w-8 h-8 rounded-full border border-[#F8F7F4] bg-[#B0ACA2] shadow-xs"></div>
                  <div className="w-8 h-8 rounded-full border border-[#F8F7F4] bg-[#8E8A7F] shadow-xs"></div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-semibold font-grotesk">The Curated Palette</span>
              </div>
            </div>

            {/* Right Column: Brand Identity & Elegant Action Details */}
            <div className="lg:col-span-7 flex flex-col justify-between py-4">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#1A1A1A]/15 px-3 py-1.5 rounded-full mb-6 bg-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8E8A7F] animate-pulse"></span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] font-semibold font-grotesk">Owner Niyas & Designer Shifana</span>
                </div>

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[0.95] text-[#1A1A1A] tracking-tight mb-8">
                  Fit, Style,<br />
                  <span className="italic sm:pl-16 text-[#8E8A7F] font-normal block sm:inline mt-2 sm:mt-0">&amp; Perfection.</span>
                </h2>

                <p className="text-xs sm:text-xs font-mono text-[#8E8A7F] tracking-[0.15em] mb-3 uppercase">
                  Complete women&apos;s clothing designs in a one touch
                </p>

                <p className="max-w-xl text-neutral-600 text-sm leading-relaxed mb-10 antialiased font-light">
                  Redefining elegance through a synthesis of heritage and modern design. At <strong>Aysha&apos;s Boutique</strong>, led by Owner <strong>Niyas .i</strong> and Designer <strong>Shifana</strong>, we merge elite fabrics with custom handloom embroidery. Discover gorgeous women&apos;s ethnic wears like <strong>salwar, kurthis, co-ord sets, tops, croptops, casual wears, office wears, and festive wears</strong>. Experience easy customisation in our direct WhatsApp chat and get your perfect fits in our magical hands.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-12">
                  <div 
                    onClick={() => scrollToSection(collectionsRef)}
                    className="border border-[#1A1A1A]/10 p-5 hover:bg-white transition-colors cursor-pointer group rounded-lg"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-[#8E8A7F] font-semibold block mb-2">01 / STYLIST BLUEPRINT</span>
                    <h4 className="text-base font-display font-medium text-[#1A1A1A] mb-1">Ethnic &amp; Formal</h4>
                    <p className="text-[11px] text-neutral-500 leading-normal">Timeless silhouettes for ceremonies with handloom details.</p>
                  </div>

                  <div 
                    onClick={() => scrollToSection(collectionsRef)}
                    className="border border-[#1A1A1A]/10 p-5 hover:bg-white transition-colors cursor-pointer group rounded-lg"
                  >
                    <span className="text-[9px] uppercase tracking-wider text-[#8E8A7F] font-semibold block mb-2">02 / CASUAL ATELIER</span>
                    <h4 className="text-base font-display font-medium text-[#1A1A1A] mb-1">Western &amp; Casual</h4>
                    <p className="text-[11px] text-neutral-500 leading-normal">Modern high-fashion wardrobes tailored for your daily look.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#1A1A1A]/10">
                <button
                  onClick={() => scrollToSection(collectionsRef)}
                  className="px-10 py-4.5 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] text-[11px] uppercase tracking-[0.2em] font-semibold transition duration-200 flex items-center justify-center gap-2"
                  style={{ minHeight: "48px" }}
                >
                  Shop Collections <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection(stylistRef)}
                  className="px-8 py-4.5 border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/5 text-[#1A1A1A] text-[11px] uppercase tracking-[0.2em] font-semibold transition duration-200 flex items-center justify-center gap-1.5"
                  style={{ minHeight: "48px" }}
                >
                  <Sparkles className="h-4 w-4 text-[#8E8A7F]" /> AI Direct Stylist
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative Sideways Rail Text */}
        <div className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-4 py-4 select-none">
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.4em] text-[#8E8A7F] font-semibold opacity-60">Aysha&apos;s Boutique Global Presence</span>
          <div className="w-[1.5px] h-32 bg-[#1A1A1A]/15"></div>
        </div>
      </section>

      {/* CATWALK INTUITIVE SUMMARY STRIP */}
      <section className="bg-[#1A1A1A] text-[#F8F7F4] py-12 border-b border-[#F8F7F4]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-display text-lg lg:text-xl text-[#F8F7F4] font-medium tracking-wide">Bespoke Atelier</div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-[#8E8A7F] uppercase mt-2 font-semibold">Stitched to Your Measure</div>
            </div>
            <div>
              <div className="font-display text-lg lg:text-xl text-[#F8F7F4] font-medium tracking-wide">All India Shipping</div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-[#8E8A7F] uppercase mt-2 font-semibold">Home delivery across all states</div>
            </div>
            <div>
              <div className="font-display text-lg lg:text-xl text-[#F8F7F4] font-medium tracking-wide">Easy Customisation</div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-[#8E8A7F] uppercase mt-2 font-semibold">WhatsApp chat for magical fits</div>
            </div>
            <div>
              <div className="font-display text-lg lg:text-xl text-[#F8F7F4] font-medium tracking-wide">Muslin Drapery</div>
              <div className="text-[9px] font-mono tracking-[0.2em] text-[#8E8A7F] uppercase mt-2 font-semibold">AI Guided Tailored Cuts</div>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY MAIN CATALOG EXPLORER CONTAINER */}
      <section ref={collectionsRef} id="collections" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-grotesk tracking-[0.3em] text-[#8E8A7F] font-semibold uppercase block mb-3">Curated Series</span>
          <h2 className="text-3xl sm:text-4xl font-display font-light text-[#1A1A1A]">The Season&apos;s Masterpieces</h2>
          <div className="w-12 h-[1px] bg-[#8E8A7F] mx-auto my-5"></div>
          <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed antialiased font-light">
            Explore five distinct collections meticulously mapped for exquisite fabric textures, permanent drapes, and fully insured worldwide delivery.
          </p>
        </div>

        {/* Collection Category Tabs Slider */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          {(["Ethnic", "Western", "Formal", "Imported", "Casual"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3.5 border text-[11px] uppercase tracking-[0.2em] font-semibold transition cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-[#F8F7F4] border-[#1A1A1A]"
                  : "bg-white/40 text-neutral-600 border-[#1A1A1A]/10 hover:bg-white"
              }`}
              style={{ minHeight: "44px" }}
            >
              {cat} Wear
            </button>
          ))}
        </div>

        {/* Curated Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white/50 backdrop-blur-xs rounded-2xl overflow-hidden border border-[#1A1A1A]/10 flex flex-col sm:flex-row luxury-shadow group hover:bg-white transition duration-300"
            >
              {/* Product Card Image Frame */}
              <div className="w-full sm:w-48 h-64 shrink-0 overflow-hidden relative bg-[#EBE9E2]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#F8F7F4]/95 backdrop-blur-xs text-[#1A1A1A] text-[9px] font-mono uppercase px-2 py-0.5 rounded-full tracking-wider font-semibold">
                  {p.fabric.split(" & ")[0]}
                </div>
              </div>

              {/* Product Card Details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[9px] font-mono tracking-widest text-[#8E8A7F] uppercase font-semibold">{p.category} Series</span>
                    <span className="text-sm font-semibold font-mono text-[#8E8A7F]">${p.price} USD</span>
                  </div>
                  <h3 className="font-display text-lg font-light text-[#1A1A1A]">{p.name}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mt-2.5 font-light line-clamp-3">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]/10 flex justify-between items-center mt-4">
                  <span className="text-[10px] text-neutral-400 font-mono">Model Code: ABS-{p.id}</span>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F8F7F4] flex items-center gap-1 cursor-pointer transition border border-[#1A1A1A]/15 px-3 py-1.5"
                    style={{ minHeight: "36px" }}
                  >
                    Atelier Specs <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI STYLIST DESK ATELIER SECTION */}
      <section ref={stylistRef} className="bg-neutral-50 border-y border-neutral-200/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AiStylist
            currentMeasurements={measurements}
            onApplyProductToCart={handleApplyProductToCart}
            onMatchedProductClick={handleMatchedProductClick}
          />
        </div>
      </section>

      {/* DUAL SLIDER PERFECT FIT CALCULATOR */}
      <section ref={fitRef} className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FitCalculator
          measurements={measurements}
          onUpdateMeasurements={updateMeasurements}
        />
      </section>

      {/* THE SHIPPING COMPASS INDEX GUIDE */}
      <section id="logistics-guide" className="bg-[#12100E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono tracking-widest text-gold-300 uppercase block mb-1">Logistics & Atelier Customs</span>
            <h2 className="text-2xl font-display font-medium text-white mb-3">Worldwide Premium Shipping Network</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We specialize in door-to-door fully insured worldwide delivery. Every package is sealed in weather-proof custom vacuum apparel folders and elegantly wrapped in branded linen gift bags.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHIPPING_PRESETS.map((p) => (
              <div key={p.region} className="bg-[#1B1613] p-5 rounded-2xl border border-gold-900/10 flex hover:border-gold-300/30 transition shadow-inner">
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="font-display font-medium text-sm text-gold-100">{p.region}</h4>
                    <span className="text-[11px] font-mono text-gold-300 font-semibold">Duty Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                    <Clock className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span>Transit: <strong>{p.deliveryTime}</strong></span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1 leading-normal">
                    Includes online state tracking and local dispatch notifications. Pre-paid customs and handling covers all local border processing.
                  </p>
                </div>
                <div className="pl-4 border-l border-gold-900/10 text-right flex flex-col justify-center shrink-0">
                  <div className="text-[10px] font-mono text-neutral-400 tracking-wider">BASE FEE</div>
                  <div className="text-lg font-mono font-bold text-gold-300">${p.baseFee}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER INSIGNIA & PHYSICAL CONTACT DESKTOP */}
      <section id="boutique-contact-deck" className="bg-white/50 border-y border-[#1A1A1A]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] font-grotesk tracking-[0.3em] text-[#8E8A7F] font-semibold uppercase block mb-3">Physical Boutique Headquarters</span>
            <h2 className="text-3xl font-display font-light text-[#1A1A1A]">Atelier &amp; Heritage Desk</h2>
            <div className="w-12 h-[1px] bg-[#8E8A7F] mx-auto my-5"></div>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              &ldquo;Complete women&apos;s clothing designs in a single touch.&rdquo; Visually examine luxury fabrics at our flagship workshop in Chengala, Kerala, or connect with our designers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Atelier Team Bios */}
            <div className="bg-white/60 p-6 rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Atelier Leadership</span>
                <h3 className="text-lg font-display font-medium text-[#1A1A1A] mt-1">Creative Craftsmen</h3>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-lg border border-[#1A1A1A]/10">
                    <div className="bg-[#F8F7F4] h-10 w-10 rounded-full flex items-center justify-center text-[#8E8A7F] shrink-0">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono uppercase text-neutral-400">PATRON / OWNER</div>
                      <div className="text-xs font-semibold text-neutral-800">Niyas .i</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/80 p-3.5 rounded-lg border border-[#1A1A1A]/10">
                    <div className="bg-[#F8F7F4] h-10 w-10 rounded-full flex items-center justify-center text-[#8E8A7F] shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-mono uppercase text-neutral-400">HAUTE COUTURE DESIGNER</div>
                      <div className="text-xs font-semibold text-neutral-800 font-display">Shifana</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10">
                <p className="text-[11px] text-neutral-500 leading-relaxed italic font-light">
                  &ldquo;We craft wearable emotions, stitching absolute comfort with state-of-the-art drape dynamics.&rdquo;
                </p>
              </div>
            </div>

            {/* Live Location Details */}
            <div className="bg-white/60 p-6 rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8E8A7F] uppercase font-semibold">Flagship Location</span>
                <h3 className="text-lg font-display font-medium text-[#1A1A1A] mt-1">Bespoke Fitting Room</h3>
                
                <div className="mt-6 flex gap-3 text-xs text-neutral-600">
                  <div className="bg-[#F8F7F4] h-10 w-10 rounded-full flex items-center justify-center text-[#8E8A7F] shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1A1A1A] text-xs uppercase tracking-wider mb-1">Aysha&apos;s Boutique flagship</h4>
                    <p className="leading-relaxed text-neutral-500 font-light">
                      Near Padupp Badar Juma Masjid,<br />
                      Shanakarampady via Chengala P.O,<br />
                      Kerala - Pin Code: 571641
                    </p>
                  </div>
                </div>

                <div className="bg-[#F8F7F4] border border-[#1A1A1A]/10 rounded-lg p-4 mt-5 text-[11px] text-neutral-500 leading-normal font-light">
                  <span className="font-semibold text-[#8E8A7F] block mb-0.5">Atelier Fitting Hours:</span>
                  Monday - Saturday: 10:00 AM - 08:30 PM (IST)
                </div>
              </div>

              <div className="mt-6">
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent("Near padupp badar juma masjid, Shanakarampady via chengala 571641")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] rounded-xs text-[11px] font-grotesk font-semibold tracking-[0.2em] uppercase transition flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#8E8A7F]" /> Flagship Map Coordinates
                </a>
              </div>
            </div>

            {/* Direct Connect & Social Media Links */}
            <div className="bg-white/60 p-6 rounded-xl border border-[#1A1A1A]/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8E8A7F] uppercase font-semibold">Interactive Connect</span>
                <h3 className="text-lg font-display font-medium text-[#1A1A1A] mt-1">Direct Lines &amp; Socials</h3>

                <div className="space-y-3 mt-6">
                  {/* Instagram Link */}
                  <a
                    href="https://instagram.com/ayshas_boutique._"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 bg-white hover:bg-[#F8F7F4] rounded-lg border border-[#1A1A1A]/10 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4.5 w-4.5 text-[#8E8A7F]" />
                      <div className="text-xs">
                        <div className="text-[9px] font-mono uppercase text-neutral-400">Instagram Handle</div>
                        <div className="font-semibold text-zinc-800">aysha&apos;s _boutique._</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neutral-400" />
                  </a>

                  {/* Shifana phone card */}
                  <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#1A1A1A]/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F8F7F4] h-8 w-8 rounded-full flex items-center justify-center text-emerald-600">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono uppercase text-neutral-400">Designer Shifana Hot-line</div>
                        <a href="tel:+917510537324" className="font-mono text-xs font-bold text-neutral-800 hover:underline">+91 75105 37324</a>
                      </div>
                    </div>
                  </div>

                  {/* Niyas phone card */}
                  <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#1A1A1A]/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F8F7F4] h-8 w-8 rounded-full flex items-center justify-center text-[#8E8A7F]">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[9px] font-mono uppercase text-neutral-400">Owner Niyas .i Line</div>
                        <a href="tel:+919645537324" className="font-mono text-xs font-bold text-neutral-800 hover:underline">+91 96455 37324</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[9px] text-center text-zinc-400 leading-normal uppercase tracking-wider font-semibold">
                Click any line to trigger standard cellular voice calls immediately.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STITCHING SEWING ENQUIRY BAG (CART checkout) */}
      <section id="stitching-cart-dock" className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-neutral-100 luxury-shadow flex flex-col justify-between">
          <div className="border-b border-neutral-100 pb-5 mb-6">
            <span className="text-xs font-grotesk tracking-wider text-atelier-gold font-medium uppercase">Pre-縫製 Workshop Customizer</span>
            <div className="flex justify-between items-center mt-1">
              <h2 className="text-xl font-display font-medium text-atelier-dark flex items-center gap-2">
                <ShoppingBag className="h-5.5 w-5.5 text-atelier-gold" /> My Custom Stitch Order Enquiry Sheet
              </h2>
              <span className="text-xs font-mono font-semibold bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">
                {cart.length} Outfit{cart.length !== 1 && "s"} Listed
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Review your snapshot sizes. You can custom specify any localized embroidery additions, height alterations, or lace tweaks prior to production.</p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
              <ShoppingBag className="h-10 w-10 text-zinc-300 mx-auto mb-3 animate-bounce" />
              <h4 className="font-display font-medium text-sm text-neutral-700">Enquiry Sheet empty</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto mt-1 leading-normal">
                Visit **The Collections** above and tap **View Atelier Specs** to add tailored dresses paired with your live measurements into this workshop sheet.
              </p>
              <button
                onClick={() => scrollToSection(collectionsRef)}
                className="mt-4 px-5 py-2.5 bg-atelier-dark text-white hover:bg-atelier-clay text-xs font-grotesk font-semibold tracking-wider uppercase rounded-lg cursor-pointer transition"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Sizing snapshot info card */}
              <div className="bg-gold-50/50 border border-gold-200/50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-atelier-gold font-semibold font-grotesk">
                    <Scissors className="h-4 w-4" /> ACTIVE WAISTLINE & BUST PROPORTIONS Snapped
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Bust: <strong>{measurements.bust}&quot;</strong> | Waist: <strong>{measurements.waist}&quot;</strong> | Hips: <strong>{measurements.hips}&quot;</strong> | Shoulder: <strong>{measurements.shoulder}&quot;</strong> | Height: <strong>{measurements.heightValue}cm ({measurements.heightCategory} fit)</strong>
                  </p>
                </div>
                <button
                  onClick={() => scrollToSection(fitRef)}
                  className="text-xs text-neutral-600 font-semibold underline hover:text-atelier-gold cursor-pointer"
                >
                  Adjust Sliders
                </button>
              </div>

              {/* Items stack */}
              <div className="divide-y divide-neutral-100">
                {cart.map((item) => (
                  <div key={item.id} className="py-5 flex flex-col md:flex-row justify-between gap-4 first:pt-0">
                    <div className="flex gap-4">
                      {/* Thumbnail photo */}
                      <div className="w-16 h-20 bg-neutral-100 rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-semibold text-neutral-800 text-sm">{item.product.name}</h4>
                          <span className="text-[9px] font-mono bg-neutral-100 px-1.5 py-0.5 rounded font-bold text-neutral-500 uppercase">Size: {item.bespokeSizeCode}</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Fabric: {item.product.fabric} - Base: ${item.product.price} USD</p>
                        
                        {item.lookbookApplied && item.lookbookCustomizations && (
                          <div className="mt-2 bg-amber-50 border border-amber-200/50 p-2.5 rounded-lg text-[10px] text-zinc-700 leading-normal max-w-md">
                            <span className="font-semibold block text-atelier-gold text-[9px] uppercase tracking-wider mb-1">✦ Lookbook Tailoring Specifications applied:</span>
                            Length suggestions: <strong>{item.lookbookCustomizations.length}</strong> | Coloured Neck: <strong>{item.lookbookCustomizations.collar}</strong> | Sleeves cut: <strong>{item.lookbookCustomizations.sleeves}</strong>
                          </div>
                        )}
                        
                        {/* Note updater input */}
                        <div className="mt-3">
                          <label className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase block mb-1">Tailoring customization requests (sleeves, embroidery, etc):</label>
                          <input
                            type="text"
                            placeholder="e.g. Please extend sleeves length to 3/4 with scallop lace finish..."
                            value={item.customNotes}
                            onChange={(e) => handleUpdateNotes(item.id, e.target.value)}
                            className="bg-neutral-50 border border-neutral-150 rounded px-2 py-1 text-xs text-neutral-700 w-full md:w-96 placeholder:text-neutral-400 outline-none focus:border-atelier-gold focus:bg-white"
                            style={{ minHeight: "36px" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end shrink-0">
                      <span className="text-sm font-semibold font-mono text-atelier-gold">${item.product.price} USD</span>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-500 transition cursor-pointer p-1"
                        title="Remove outfit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping location and Calculations total panel */}
              <div className="border-t border-neutral-150 pt-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                <div className="space-y-4">
                  {/* Whatsapp contact routing selector */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1.5">Direct Boutique Representative</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setChosenContact('Shifana')}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          chosenContact === 'Shifana'
                            ? "bg-atelier-dark text-white border-atelier-dark"
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                        style={{ minHeight: "44px" }}
                      >
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Designer Shifana
                      </button>
                      <button
                        type="button"
                        onClick={() => setChosenContact('Niyas')}
                        className={`py-2 px-3 rounded-lg border text-xs font-medium transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          chosenContact === 'Niyas'
                            ? "bg-atelier-dark text-white border-atelier-dark"
                            : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                        }`}
                        style={{ minHeight: "44px" }}
                      >
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Owner Niyas .i
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 select-none block mt-1.5">Chats will be directed directly to this professional profile standard WhatsApp line.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-2">Select Worldwide Logistics Destination</label>
                  <div className="relative">
                    <select
                      value={shippingRegion}
                      onChange={(e) => setShippingRegion(e.target.value)}
                      className="w-full bg-white border border-neutral-200 outline-none p-3.5 rounded-xl text-xs font-semibold text-neutral-800 focus:border-atelier-gold"
                      style={{ minHeight: "44px" }}
                    >
                      {SHIPPING_PRESETS.map((p) => (
                        <option key={p.region} value={p.region}>
                          {p.region} (Estimated {p.deliveryTime})
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Duty pre-paid securely logic applied. Deliveries are scheduled with DHL Express / FedEx directly.
                  </p>
                </div>
              </div>

                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-150 flex flex-col justify-between space-y-2.5">
                  <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>Selected Boutique Designs:</span>
                    <span className="font-mono">${cartTotal} USD</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>Personalized Stitch & Fit (x{cart.length}):</span>
                    <span className="font-mono">${cart.length * 35} USD</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-neutral-500">
                    <span>Insured Courier Packing/Shipping:</span>
                    <span className="font-mono">${activeShipping.baseFee} USD</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-2.5 flex justify-between items-baseline">
                    <span className="font-display font-medium text-sm text-atelier-dark">Estimated Grand Valuation:</span>
                    <span className="font-mono text-lg font-bold text-atelier-gold">${cartTotal + (cart.length * 35) + activeShipping.baseFee} USD</span>
                  </div>
                </div>
              </div>

              {/* Submit enquiry button */}
              <div className="border-t border-neutral-100 pt-6">
                <button
                  id="submit-enquiry-whatsapp"
                  onClick={handleSendWhatsAppEnquiry}
                  className="w-full py-4.5 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-600 text-white rounded-xl font-grotesk font-semibold text-xs tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:opacity-95"
                >
                  <Scissors className="h-4.5 w-4.5 text-gold-200" /> Compile Workshop Specifications & Submit Order via WhatsApp
                </button>
                <p className="text-[10px] text-neutral-400 text-center mt-2.5 leading-relaxed">
                  Completing this action compiles your perfect fit code (*{getStandardSizeCode(measurements)}*), physical slider measurements, lookbook guidelines, country transit estimates, and opens WhatsApp to securely connect directly to Aysha&apos;s Boutique concierge desk.
                </p>
              </div>

              {enquirySent && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-4 rounded-xl text-center">
                  <strong>Thank you!</strong> Your tailor measurement pattern file and desired clothing lists have been prepared. The concierge desk will confirm fabric drafts on WhatsApp shortly.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* DETAILED FOCUS MODAL DRAWER FOR DIRECT SPECIFICATIONS */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-atelier-dark/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full border border-neutral-100 flex flex-col md:flex-row relative max-h-[90vh] md:max-h-none">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-neutral-100 text-neutral-700 p-2 rounded-full cursor-pointer transition z-10"
              style={{ minHeight: "44px" }}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Spec Image */}
            <div className="w-full md:w-1/2 h-64 md:h-[480px] bg-neutral-100 relative shrink-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
            </div>

            {/* Spec Text Content */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-gold-100 text-atelier-gold font-bold px-2.5 py-1 rounded-full uppercase font-mono tracking-wider">
                  {selectedProduct.category} Collection
                </span>
                <h3 className="font-display text-2xl font-medium text-neutral-900 mt-3">{selectedProduct.name}</h3>
                <div className="text-lg font-semibold font-mono text-atelier-gold mt-1">${selectedProduct.price} USD</div>
                
                <p className="text-xs text-neutral-500 leading-relaxed mt-3 border-b border-neutral-100 pb-3 font-light">
                  {selectedProduct.description}
                </p>

                <div className="mt-4 space-y-3">
                  <div>
                    <h5 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Fabric Composition:</h5>
                    <p className="text-xs font-semibold text-neutral-800">{selectedProduct.fabric}</p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Atelier Craft Details:</h5>
                    <ul className="text-xs text-neutral-600 mt-1 space-y-1">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index} className="flex gap-1.5 items-start">
                          <Check className="h-3.5 w-3.5 text-atelier-gold shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/55 text-xs">
                    <strong className="text-atelier-dark font-semibold">Atelier Styling Guide:</strong>{" "}
                    <span className="text-neutral-500 leading-relaxed">{selectedProduct.stylingTips}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={() => handleAddProductToCart(selectedProduct)}
                  className="flex-1 py-3.5 bg-atelier-dark hover:bg-atelier-clay text-white rounded-xl text-xs font-grotesk font-semibold tracking-wider uppercase cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <PlusCircle className="h-4 w-4 text-atelier-gold" /> Enquire With Custom Stitch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-atelier-dark text-neutral-400 py-16 border-t border-gold-900/10 mt-16 text-center text-xs space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display text-xl font-bold tracking-tight text-white uppercase">Aysha&apos;s Boutique</span>
            <span className="text-[10px] font-mono tracking-widest text-gold-300 uppercase">Fit, style, & perfection</span>
            <span className="text-[10px] text-zinc-500 mt-1">Near Padupp Badar Juma Masjid, Chengala, Pin 571641</span>
          </div>

          <div className="flex gap-6 uppercase text-[10px] font-grotesk tracking-widest text-neutral-500">
            <a href="#collections" className="hover:text-gold-200">The Series</a>
            <a href="#ai-stylist-atelier" className="hover:text-gold-200">Digital Atelier</a>
            <a href="#perfect-fit-calculator" className="hover:text-gold-200">Fitting Guide</a>
            <a href="#boutique-contact-deck" className="hover:text-gold-200">Boutique Headquarters</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-neutral-850 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-neutral-500 font-mono gap-4">
          <p>© 2026 Aysha&apos;s Boutique. All rights reserved. Design & Fit curation by Owner Niyas and Des. Shifana.</p>
          <div className="flex gap-4">
            <span>Server Version CJS-v2</span>
            <span>|</span>
            <span>Gemini 3.5 Assistant Secured</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
