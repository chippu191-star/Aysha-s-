import React, { useState } from "react";
import { 
  Instagram, 
  Bookmark, 
  Heart, 
  MessageCircle, 
  Send, 
  Plus, 
  Check, 
  Compass, 
  Sparkles, 
  Scissors, 
  Phone, 
  MapPin, 
  User, 
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";
import { CustomMeasurements } from "../types.js";
import { CATALOG, Product } from "../data.js";

interface InstaPinterestAppProps {
  currentMeasurements: CustomMeasurements;
  onApplyProductToCart: (product: Product) => void;
  onMatchedProductClick: (productId: string) => void;
}

interface SocialPost {
  id: string;
  platform: "instagram" | "pinterest";
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
  hasSaved?: boolean;
  whatsappMessage: string;
  correspondingCatalogProduct: string; // Product ID match e.g. "cas-3"
  tags: string[];
  ownerNote: string;
}

const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post-1",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=700&auto=format&fit=crop",
    title: "Gulhar Indigo Block-Print Co-ord",
    subtitle: "Aysha's Boutique Direct Curation",
    description: "Trending bohemian cotton Co-ord Set with beautiful vegetable-dyed hand-block motifs, styled with wooden buttons and straight cigarette trousers. Magical fit guaranteed!",
    likes: 1240,
    commentsCount: 84,
    tags: ["#CottonDoubleCoords", "#AestheticFits", "#JaipurPrints", "#TrendingFashion"],
    correspondingCatalogProduct: "cas-3",
    ownerNote: "Designer Shifana hand-selected this botanical Indigo scheme. Super lightweight!",
    whatsappMessage: "Hi Shifana / Niysnichu, I fell in love with the trending Indigo Block-Print Co-ord set from your Instagram Feed! I would love to order this customized with my measurements."
  },
  {
    id: "post-2",
    platform: "pinterest",
    imageUrl: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=700&auto=format&fit=crop",
    title: "Aura Pastel Sage Linen Kurta",
    subtitle: "Minimalist Pastel Fitcheck Pins",
    description: "A highly pinned minimalist summer drape. Breathable pastel sage Belgian linen short kurta with beautiful scalloped sleeve borders and straight walking slit trousers.",
    likes: 8520,
    commentsCount: 247,
    tags: ["#SageAesthetic", "#RusticLinen", "#SummerSalwars", "#PinterestInspiration"],
    correspondingCatalogProduct: "cas-4",
    ownerNote: "Stitched in-house with standard side slits for maximum walking comfort and flow.",
    whatsappMessage: "Hi Shifana / Niysnichu, saw your beautiful Pastel Sage Linen Kurta-Set pinned on Pinterest! Could you please customize this dreamy set for me?"
  },
  {
    id: "post-3",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1609187982841-184bc2471325?q=80&w=700&auto=format&fit=crop",
    title: "Zola Tiered Muslin Crop-Top Set",
    subtitle: "Cottagecore Autumn Wardrobe",
    description: "Swaying multi-tiered organic cotton gown skirt paired with our form-adaptive smocked crop top. Double-layered soft-spun gauze that floats gracefully with every move.",
    likes: 1895,
    commentsCount: 120,
    tags: ["#CottagecoreCropSet", "#PinterestClassic", "#DoubleGauze", "#KeralaDispatch"],
    correspondingCatalogProduct: "cas-5",
    ownerNote: "Extremely stretchy smocking ensures zero slip-offs or discomfort. Highly recommended!",
    whatsappMessage: "Hi Shifana / Niysnichu, I spotted the Zola Tiered Cotton Muslin crop top & skirt outfit from your Insta feed! Please tailor it to my exact body frame."
  },
  {
    id: "post-4",
    platform: "pinterest",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=700&auto=format&fit=crop",
    title: "Ivory Lucknowi Chikankari Kurthis & Lehenga",
    subtitle: "Heritage Royal Embroidery Pin",
    description: "Stuffed with 12,000 hand-sewn shadow-work stitches. Pure ivory royal festive dress that flows into a premium modal-satin coordinate. Ultimate elegance.",
    likes: 14200,
    commentsCount: 618,
    tags: ["#LucknowiChikankari", "#RoyalIvory", "#FestivalOutfit", "#BespokeTailors"],
    correspondingCatalogProduct: "eth-2",
    ownerNote: "This embroidery demands 3 months of meticulous craft, styled in our flagship workshop.",
    whatsappMessage: "Hi Shifana / Niysnichu, I am highly interested in the royal Ivory Lucknowi hand-work Kurthis & Lehenga set on your Pinterest Board! Stitched to my customized sizing."
  },
  {
    id: "post-5",
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1583391265517-35bbadd01209?q=80&w=700&auto=format&fit=crop",
    title: "Korean Silk-Crepe Saree & Tops Set",
    subtitle: "Fastest 2-Min Pre-Pleated Drape",
    description: "Saturated and sleek Korean georgette pre-pleated drape with comfortable styled supportive tops. Extremely trendy on Instagram reels for effortless draping.",
    likes: 3120,
    commentsCount: 198,
    tags: ["#KoreanCrepe", "#PrePleatedSaree", "#InstagramOutfit", "#FastDispatch"],
    correspondingCatalogProduct: "imp-1",
    ownerNote: "Pre-stitched pleats mean you can slide into high-glamour styling in less than 2 minutes!",
    whatsappMessage: "Hi Shifana / Niysnichu, your pre-pleated Korean Silk-Crepe draped saree from Instagram is a must-have! Please stitch this for my upcoming occasion."
  },
  {
    id: "post-6",
    platform: "pinterest",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=700&auto=format&fit=crop",
    title: "Catalina Cotton Ribbed Co-ord Set",
    subtitle: "Stitched Loungewear Pins",
    description: "A gorgeous sandy beige flat-knit coordinate set containing a luxurious bell-sleeve top and matching ribbed wide trousers for an effortless Sunday cafe outfit.",
    likes: 6730,
    commentsCount: 155,
    tags: ["#KnitwearCoords", "#LoungewearVibe", "#SandyBeige", "#ComfortStitching"],
    correspondingCatalogProduct: "cas-2",
    ownerNote: "Organic long-staple cotton guarantees zero pilling and absolute luxury texture.",
    whatsappMessage: "Hi Shifana / Niysnichu, I saw your Catalina Sand Beige Co-ord set on Pinterest! Perfect for my next cozy cafe morning. Can you make this to my size?"
  }
];

export default function AiStylist({ currentMeasurements, onApplyProductToCart, onMatchedProductClick }: InstaPinterestAppProps) {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [activeTab, setActiveTab] = useState<"all" | "instagram" | "pinterest">("all");
  const [vibeFilter, setVibeFilter] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [customComment, setCustomComment] = useState("");
  const [customCommentsList, setCustomCommentsList] = useState<{ [postId: string]: string[] }>({});
  
  // Quick customization options for one-touch ordering
  const [selectedNeck, setSelectedNeck] = useState("V-Shape Slit Lace");
  const [selectedSleeve, setSelectedSleeve] = useState("Bell Sleeves with Micro-Scallops");
  const [selectedFitNote, setSelectedFitNote] = useState("Slightly Loose, Flare Flow");

  // Story avatars list
  const STORIES = [
    { name: "Shifana (Designer)", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop", status: "Designing Co-ords" },
    { name: "Niysnichu (Owner)", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop", status: "Processing Kerala orders" },
    { name: "#AestheticSalwars", avatarUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=120&auto=format&fit=crop", status: "Lucknowi Handwork" },
    { name: "#Magical_Fits", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop", status: "Perfect Fit Checks" }
  ];

  // Handle Likes
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          const isLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  // Handle Saves
  const handleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev =>
      prev.map(post => {
        if (post.id === id) {
          return {
            ...post,
            hasSaved: !post.hasSaved
          };
        }
        return post;
      })
    );
  };

  // Add Comment
  const handleAddComment = (postId: string) => {
    if (!customComment.trim()) return;
    setCustomCommentsList(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), customComment]
    }));
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );
    setCustomComment("");
  };

  // One-touch direct WhatsApp redirection generator
  const triggerWhatsAppDispatch = (post: SocialPost) => {
    let msg = `*AYSHA'S BOUTIQUE INSTA-PINTEREST HANDMADE ORDER*\n`;
    msg += `======================================\n\n`;
    msg += `💖 *Outfit Chosen:* _${post.title}_\n`;
    msg += `🌸 *Fabrication Details:* _${post.description.slice(0, 100)}..._\n\n`;
    
    msg += `📏 *Bespoke physical fittings snapshot:*\n`;
    msg += `  - Chest/Bust: ${currentMeasurements.bust} inches\n`;
    msg += `  - Waistline: ${currentMeasurements.waist} inches\n`;
    msg += `  - Hips contour: ${currentMeasurements.hips} inches\n`;
    msg += `  - Shoulder support: ${currentMeasurements.shoulder} inches\n`;
    msg += `  - Exact height: ${currentMeasurements.heightValue} cm (${currentMeasurements.heightCategory} fit type)\n\n`;
    
    msg += `✍️ *Easy Customisation Instructions (One-Touch):*\n`;
    msg += `  - Neck Pattern: ${selectedNeck}\n`;
    msg += `  - Sleeve Cut: ${selectedSleeve}\n`;
    msg += `  - Silhouette Draping Option: ${selectedFitNote}\n\n`;
    
    msg += `🚚 *Logistics Advantage:*\n`;
    msg += `  - *All Kerala Fastest Dispatching Services Opted!*\n\n`;
    msg += `======================================\n`;
    msg += `"Complete women's clothing designs in a single touch." \n`;
    msg += `• Owned by *Niysnichu*\n`;
    msg += `• Designer: *Shifana*\n`;
    msg += `• Instagram ID: *aysha's _boutique_.*\n\n`;
    msg += `Dear Shifana & Niysnichu, please receive my dreamy customization request with your magical hands!`;

    const encoded = encodeURIComponent(msg);
    // WhatsApp Shifana's hotline count as primary, or fallback to Niyas
    const targetPhone = "917510537324";
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, "_blank");
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === "all" || post.platform === activeTab;
    const matchesVibe = vibeFilter === "All" || 
      (vibeFilter === "Co-ord Sets" && post.title.toLowerCase().includes("co-ord")) ||
      (vibeFilter === "Salwars & Kurthis" && (post.title.toLowerCase().includes("kurta") || post.title.toLowerCase().includes("kurthi") || post.title.toLowerCase().includes("lehenga"))) ||
      (vibeFilter === "Crop Tops" && post.title.toLowerCase().includes("crop"));
    return matchesTab && matchesVibe;
  });

  const savedPosts = posts.filter(p => p.hasSaved);

  return (
    <div id="ai-stylist-atelier" className="bg-[#FBFBFA] rounded-2xl p-6 lg:p-8 border border-[#1A1A1A]/10 luxury-shadow">
      
      {/* HEADER SECTION */}
      <div className="border-b border-[#1A1A1A]/10 pb-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-grotesk tracking-[0.3em] text-[#8E8A7F] font-bold uppercase block mb-1">
              Curated Interactive Aesthetics Portal
            </span>
            <h2 className="text-2xl font-display font-light text-[#1A1A1A] flex items-center gap-2 mt-1">
              <Compass className="h-6 w-6 text-[#8E8A7F] rotate-12" /> Explore Instagram &amp; Pinterest App
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Find customized trendy outfits from nowadays&apos; high-fashion feed checks. Click any card to customize and order.
            </p>
          </div>

          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] font-mono tracking-widest text-[#8E8A7F] uppercase font-semibold">Insta Direct Search</span>
            <a 
              href="https://instagram.com/ayshas_boutique._" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono font-bold text-[#1A1A1A] hover:underline flex items-center gap-1.5 mt-1 bg-white px-3 py-1.5 rounded-full border border-[#1A1A1A]/10"
            >
              <Instagram className="h-3.5 w-3.5 text-[#8E8A7F]" /> aysha&apos;s _boutique_. <ExternalLink className="h-3 w-3 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* INSTAGRAM & PINTEREST APPS BRAND PROCLAIMNOTE */}
        <div className="bg-[#F8F7F4] border-l-2 border-[#8E8A7F] p-4 rounded-r-lg mt-5 flex items-start gap-3">
          <div className="bg-[#8E8A7F]/10 h-8 w-8 rounded-full flex items-center justify-center text-[#8E8A7F] shrink-0 mt-0.5">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs text-[#1A1A1A] leading-relaxed italic">
              &ldquo;Finding the trendy outfits from Instagram and Pinterest to fill your bucket list fitchecks from nowadays&apos; trendy fashion world... All Kerala fastest dispatching services are provided by Aysha&apos;s Boutique to enjoy your dreamy day! &rdquo;
            </p>
            <div className="flex gap-4 mt-2 text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
              <span>Owner: <strong className="text-[#1A1A1A]">Niysnichu</strong></span>
              <span>•</span>
              <span>Head Designer: <strong className="text-[#1A1A1A]">Shifana</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* INSTAGRAM BUBBLES STORY BANNER */}
      <div className="mb-8 select-none">
        <h3 className="text-[10px] font-grotesk tracking-[0.2em] text-[#8E8A7F] font-bold uppercase mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Atelier Stories
        </h3>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {STORIES.map((st, idx) => (
            <div key={idx} className="flex flex-col items-center shrink-0 group">
              <div className="h-14 w-14 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 cursor-pointer hover:scale-105 transition-transform">
                <div className="h-full w-full bg-white rounded-full p-[2px]">
                  <img 
                    src={st.avatarUrl} 
                    alt={st.name} 
                    className="h-full w-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <span className="text-[10px] font-medium text-neutral-800 mt-1.5 max-w-[84px] truncate text-center">
                {st.name}
              </span>
              <span className="text-[8px] font-mono text-[#8E8A7F] mt-0.5 max-w-[90px] truncate text-center">
                {st.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PORTAL NAVIGATION TAB BAR AND TREND FILTER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-[#1A1A1A]/10 pb-4">
        {/* Apps Selection */}
        <div className="flex items-center gap-2 bg-[#F8F7F4] p-1 rounded-xl border border-[#1A1A1A]/5">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-grotesk font-semibold uppercase tracking-wider transition ${
              activeTab === "all"
                ? "bg-[#1A1A1A] text-[#F8F7F4] shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            All Trending
          </button>
          <button
            onClick={() => setActiveTab("instagram")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-grotesk font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
              activeTab === "instagram"
                ? "bg-[#1A1A1A] text-[#F8F7F4] shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Instagram className="h-3.5 w-3.5" /> Instagram
          </button>
          <button
            onClick={() => setActiveTab("pinterest")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-grotesk font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
              activeTab === "pinterest"
                ? "bg-[#1A1A1A] text-[#F8F7F4] shadow-xs"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <Bookmark className="h-3.5 w-3.5 text-red-500 fill-red-500" /> Pinterest Pins
          </button>
        </div>

        {/* Costume Type Filter Pillbox */}
        <div className="flex flex-wrap gap-1.5">
          {["All", "Co-ord Sets", "Salwars & Kurthis", "Crop Tops"].map((v) => (
            <button
              key={v}
              onClick={() => setVibeFilter(v)}
              className={`px-3 py-1 rounded-full text-xs transition border cursor-pointer ${
                vibeFilter === v
                  ? "bg-[#8E8A7F] text-[#F8F7F4] border-[#8E8A7F] font-semibold"
                  : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {v === "All" ? "All Segments" : v}
            </button>
          ))}
        </div>
      </div>

      {/* FEED GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group bg-white rounded-xl border border-[#1A1A1A]/10 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Post Image Container */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Placement badge icon */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase font-semibold flex items-center gap-1 bg-black/65 text-white backdrop-blur-xs">
                {post.platform === "instagram" ? (
                  <>
                    <Instagram className="h-3 w-3 text-pink-400" /> INSTAGRAM STORY
                  </>
                ) : (
                  <>
                    <Bookmark className="h-3 w-3 text-red-400 fill-red-400" /> PINTEREST FAVORITE
                  </>
                )}
              </div>

              {/* Magical Hand Banner Overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-end justify-between">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#8E8A7F] uppercase font-bold block">Perfect Fit Handcheck</span>
                  <p className="text-xs text-white font-medium">Complete design in one touch.</p>
                </div>
                <div className="bg-[#8E8A7F] h-7 w-7 rounded-full flex items-center justify-center text-white">
                  <Scissors className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>

            {/* Post Details Content */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider block mb-1">
                  {post.subtitle}
                </span>
                <h4 className="text-base font-display font-medium text-[#1A1A1A] group-hover:text-[#8E8A7F] transition-colors">
                  {post.title}
                </h4>
                <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {post.description}
                </p>

                {/* Hashtags display */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-mono text-[#8E8A7F] bg-[#F8F7F4] px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feed Buttons & Actions */}
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Like Button */}
                  <button 
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer group/like ${
                      post.hasLiked ? "text-red-500" : "text-neutral-500 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`h-4.5 w-4.5 transition-transform ${post.hasLiked ? "fill-red-500 scale-110" : "group-hover/like:scale-110"}`} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Count Indicator */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MessageCircle className="h-4.5 w-4.5" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>

                {/* Save Bucket List Button */}
                <button
                  onClick={(e) => handleSave(post.id, e)}
                  title="Add to Stitch Bucket List"
                  className={`p-2 rounded-full border transition cursor-pointer ${
                    post.hasSaved 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "bg-white border-neutral-150 text-neutral-400 hover:text-[#1A1A1A] hover:bg-neutral-50"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${post.hasSaved ? "fill-red-500" : ""}`} />
                </button>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="px-4 pb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPost(post);
                }}
                className="w-full bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] py-2 px-3 text-[10px] sm:text-[11px] font-grotesk font-semibold tracking-[0.2em] uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                style={{ minHeight: "40px" }}
              >
                <Scissors className="h-3.5 w-3.5 text-[#8E8A7F]" /> One-Touch Customise Fit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BUCKET LIST / PINNED FITCHECKS SHELF */}
      {savedPosts.length > 0 && (
        <div className="mt-12 bg-[#F8F7F4]/80 p-5 rounded-2xl border border-[#1A1A1A]/10">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="h-5 w-5 text-red-500 fill-red-500" />
            <h4 className="text-sm font-display font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Your Pinned Fitchecks &amp; Bucket List ({savedPosts.length})
            </h4>
          </div>
          <p className="text-xs text-neutral-500 mb-4 font-light">
            You have saved these trending designs. Ready to transform them with Shifana&apos;s magical hand?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedPosts.map(p => (
              <div 
                key={p.id} 
                onClick={() => setSelectedPost(p)}
                className="bg-white p-2.5 rounded-lg border border-[#1A1A1A]/10 cursor-pointer hover:border-[#8E8A7F] transition flex flex-col justify-between"
              >
                <img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className="aspect-square object-cover rounded mb-2 h-20 w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="text-[10px] font-medium text-[#1A1A1A] truncate">{p.title}</div>
                <div className="text-[9px] text-[#8E8A7F] font-semibold mt-1">One-Touch Order ready</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILED ONE-TOUCH CUSTOMISATION DRAWER MODEL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBFA] rounded-xl border border-[#1A1A1A]/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full border border-neutral-150 z-10 cursor-pointer shadow-xs"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Product Visual */}
              <div className="md:col-span-5 bg-neutral-100 aspect-square md:aspect-auto md:h-full relative overflow-hidden min-h-[300px]">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-xs p-3.5 rounded-lg text-white">
                  <div className="flex items-center gap-1.5 text-[9px] text-[#8E8A7F] uppercase tracking-widest font-black">
                    <Sparkles className="h-3 w-3 animate-pulse" /> Heritage Touch Premium
                  </div>
                  <h4 className="text-sm font-display font-medium mt-0.5">{selectedPost.title}</h4>
                  <p className="text-[10px] text-neutral-300 font-light mt-1">Stitched uniquely under Shifana&apos;s close eyes.</p>
                </div>
              </div>

              {/* Customisation Controls & physical parameters sync */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-pink-100 text-pink-700">
                      {selectedPost.platform === "instagram" ? "Trending on Insta" : "Pinterest Aesthetic"}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">ID: FITCHECK-{selectedPost.id.toUpperCase()}</span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[#1A1A1A] mt-2 line-clamp-1">
                    {selectedPost.title}
                  </h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mt-2 font-light">
                    {selectedPost.description}
                  </p>

                  <div className="mt-4 p-3 bg-[#F8F7F4] border border-[#1A1A1A]/10 rounded-lg text-xs">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#8E8A7F] tracking-widest block mb-1">DESIGN WORKSHOP NOTES</span>
                    <p className="text-neutral-700 leading-normal italic font-light">&ldquo;{selectedPost.ownerNote}&rdquo;</p>
                  </div>

                  {/* LIVE PHYSICAL MEASUREMENTS SYNC FROM SLIDERS */}
                  <div className="mt-6 border-t border-[#1A1A1A]/10 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-[#8E8A7F] uppercase tracking-widest font-bold flex items-center gap-1">
                        <Scissors className="h-3.5 w-3.5" /> LIVE ATELIER SYNCED MEASUREMENTS
                      </span>
                      <span className="text-[10px] text-neutral-400 italic">Adjust sliders in fit calculator</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-white p-2 rounded-lg border border-[#1A1A1A]/5">
                        <div className="text-[9px] uppercase text-neutral-400 tracking-wider">Chest/Bust</div>
                        <div className="text-sm font-semibold font-mono text-[#1A1A1A]">{currentMeasurements.bust}&rdquo;</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#1A1A1A]/5">
                        <div className="text-[9px] uppercase text-neutral-400 tracking-wider">Waistline</div>
                        <div className="text-sm font-semibold font-mono text-[#1A1A1A]">{currentMeasurements.waist}&rdquo;</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#1A1A1A]/5">
                        <div className="text-[9px] uppercase text-neutral-400 tracking-wider">Hips Drape</div>
                        <div className="text-sm font-semibold font-mono text-[#1A1A1A]">{currentMeasurements.hips}&rdquo;</div>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-[#1A1A1A]/5">
                        <div className="text-[9px] uppercase text-neutral-400 tracking-wider">Shoulder</div>
                        <div className="text-sm font-semibold font-mono text-[#1A1A1A]">{currentMeasurements.shoulder}&rdquo;</div>
                      </div>
                    </div>
                  </div>

                  {/* ONE-TOUCH ATELIER PREFERENCES FOR CHATTING */}
                  <div className="mt-5 space-y-3">
                    <h5 className="text-[10px] font-mono text-[#8E8A7F] uppercase tracking-widest font-bold">
                      ONE-TOUCH STITCH ADJUSTMENT OPTIONS
                    </h5>
                    
                    {/* Neckline selection */}
                    <div>
                      <label className="text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">Neck Pattern Customisation</label>
                      <select 
                        value={selectedNeck} 
                        onChange={(e) => setSelectedNeck(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-lg text-neutral-700 font-medium"
                      >
                        <option>V-Shape Slit Lace Border</option>
                        <option>Classic Scoop Neck with Golden Thread</option>
                        <option>Bespoke High Neck with Back Tie-Bow</option>
                        <option>Mandarin Collar with Loop Slit</option>
                        <option>Sweetheart Deep Cut</option>
                      </select>
                    </div>

                    {/* Sleeves Selection */}
                    <div>
                      <label className="text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">Sleeve Cut Styles</label>
                      <select 
                        value={selectedSleeve} 
                        onChange={(e) => setSelectedSleeve(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-lg text-neutral-700 font-medium"
                      >
                        <option>Bell Sleeves with Micro-Scallops</option>
                        <option>Elegant Half Sleeves with Lace Trims</option>
                        <option>Gauze Puff Sleeves with Elastic Ruffles</option>
                        <option>Full Umbrella Majestic Flare</option>
                        <option>Sleek Sleeveless Straight Cut</option>
                      </select>
                    </div>

                    {/* Silhouette comfort */}
                    <div>
                      <label className="text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">Fitting Style Preference</label>
                      <select 
                        value={selectedFitNote} 
                        onChange={(e) => setSelectedFitNote(e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/10 rounded-lg text-neutral-700 font-medium"
                      >
                        <option>Slightly Loose, Flare Flow</option>
                        <option>Fitted Body Hugging Silhouette</option>
                        <option>Breezy Oversized Leisure Cut</option>
                        <option>A-Line Standard Fluidity</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* BOTTOM ACTION TRIGGERS */}
                <div className="mt-8 pt-4 border-t border-[#1A1A1A]/10 space-y-3">
                  
                  {/* WhatsApp Order Button */}
                  <button
                    onClick={() => triggerWhatsAppDispatch(selectedPost)}
                    className="w-full bg-[#1A1A1A] hover:bg-black text-[#F8F7F4] py-3.5 px-4 rounded-lg text-xs font-grotesk font-bold tracking-[0.25em] uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    style={{ minHeight: "44px" }}
                  >
                    <Send className="h-4 w-4 text-[#8E8A7F] fill-[#8E8A7F]" /> One-Touch WhatsApp Dispatch &amp; Buy
                  </button>

                  <div className="flex gap-2">
                    {/* Quick inspect catalog item */}
                    <button
                      onClick={() => {
                        onMatchedProductClick(selectedPost.correspondingCatalogProduct);
                        setSelectedPost(null);
                      }}
                      className="w-1/2 py-2 px-3 bg-white hover:bg-neutral-50 text-neutral-700 border border-[#1A1A1A]/10 rounded-lg text-[10px] font-semibold tracking-wider uppercase transition flex items-center justify-center gap-1"
                      style={{ minHeight: "40px" }}
                    >
                      <Info className="h-3.5 w-3.5 text-[#8E8A7F]" /> Detailed Specs
                    </button>

                    {/* Add directly to stitch list */}
                    <button
                      onClick={() => {
                        const product = CATALOG.find(p => p.id === selectedPost.correspondingCatalogProduct);
                        if (product) {
                          onApplyProductToCart(product);
                        }
                        setSelectedPost(null);
                      }}
                      className="w-1/2 py-2 px-3 bg-[#8E8A7F]/10 hover:bg-[#8E8A7F]/20 text-[#1A1A1A] rounded-lg text-[10px] font-bold tracking-wider uppercase transition flex items-center justify-center gap-1"
                      style={{ minHeight: "40px" }}
                    >
                      <Plus className="h-3.5 w-3.5" /> Direct Stitch-Bag
                    </button>
                  </div>

                  <p className="text-[9px] text-center text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 mt-2">
                    <span>⚡ All Kerala Fastest dispatching service available</span>
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
