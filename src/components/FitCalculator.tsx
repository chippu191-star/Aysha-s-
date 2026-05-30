import React, { useState, useEffect } from "react";
import { Ruler, Sparkles, Sliders, Info, Check, Scissors } from "lucide-react";
import { CustomMeasurements } from "../types.js";

interface FitCalculatorProps {
  measurements: CustomMeasurements;
  onUpdateMeasurements: (m: CustomMeasurements) => void;
}

export default function FitCalculator({ measurements, onUpdateMeasurements }: FitCalculatorProps) {
  const [bust, setBust] = useState(measurements.bust);
  const [waist, setWaist] = useState(measurements.waist);
  const [hips, setHips] = useState(measurements.hips);
  const [shoulder, setShoulder] = useState(measurements.shoulder);
  const [heightVal, setHeightVal] = useState(measurements.heightValue);
  const [applied, setApplied] = useState(false);

  // Sync state if prop changes
  useEffect(() => {
    setBust(measurements.bust);
    setWaist(measurements.waist);
    setHips(measurements.hips);
    setShoulder(measurements.shoulder);
    setHeightVal(measurements.heightValue);
  }, [measurements]);

  // Determine standard size based on measurements
  const calculateBespokeCode = () => {
    let sizeIndex = 6;
    if (bust > 44 || waist > 38 || hips > 46) sizeIndex = 18;
    else if (bust > 41 || waist > 35 || hips > 43) sizeIndex = 16;
    else if (bust > 39 || waist > 32 || hips > 41) sizeIndex = 14;
    else if (bust > 37 || waist > 29 || hips > 39) sizeIndex = 12;
    else if (bust > 35 || waist > 27 || hips > 37) sizeIndex = 10;
    else if (bust > 33 || waist > 25 || hips > 35) sizeIndex = 8;

    let heightCode = "R"; // Regular
    if (heightVal < 160) heightCode = "P"; // Petite
    if (heightVal > 175) heightCode = "T"; // Tall

    let bodyShape = "Hourglass";
    const hipWaistRatio = hips / waist;
    const bustWaistRatio = bust / waist;
    if (hipWaistRatio > 1.3 && Math.abs(bust - hips) < 3) {
      bodyShape = "Classic Hourglass";
    } else if (hips - bust > 2.5) {
      bodyShape = "Elegant Pear";
    } else if (bust - hips > 2) {
      bodyShape = "Inverted Triangle";
    } else if (bustWaistRatio < 1.15 && hipWaistRatio < 1.15) {
      bodyShape = "Athletic Column";
    }

    return {
      code: `AB-${sizeIndex}${heightCode}-${bodyShape.split(" ")[1] || "Fit"}`,
      bodyShape,
      baseSize: sizeIndex,
      heightGroup: heightCode === "P" ? "Petite (Under 5'3\")" : heightCode === "T" ? "Tall (Over 5'9\")" : "Regular (5'3\" - 5'9\")"
    };
  };

  const { code, bodyShape, heightGroup } = calculateBespokeCode();

  const handleApply = () => {
    const heightCategory = heightVal < 160 ? "petite" : heightVal > 175 ? "tall" : "regular";
    onUpdateMeasurements({
      bust,
      waist,
      hips,
      shoulder,
      heightValue: heightVal,
      heightCategory
    });
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const getDrapingAdvice = () => {
    if (bodyShape.includes("Hourglass")) {
      return "Your balanced lines are perfect for belted cinches, tailored sheath lines, and cowled slips. We optimize bodice sewing to securely trace your waist.";
    } else if (bodyShape.includes("Pear")) {
      return "To balance weight distributions, we construct ethnic flares (Anarkalis) with 24+ heavy panels and western blazers with structured supportive shoulders.";
    } else if (bodyShape.includes("Triangle")) {
      return "Subtle V-necks and soft fluid chiffon sleeves are recommended. We soften shoulder padding seams to drape weightlessly downward.";
    } else {
      return "Bias cuts and high pleated necklines look exceptionally graceful. We recommend permanent sunburst accordion tucking to elevate motion fluidity.";
    }
  };

  return (
    <div id="perfect-fit-calculator" className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 lg:p-8 border border-[#1A1A1A]/10 luxury-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-[#1A1A1A]/10 pb-5">
        <div>
          <span className="text-xs font-grotesk tracking-[0.2em] text-[#8E8A7F] font-semibold uppercase">Heritage Atelier Accuracy</span>
          <h2 className="text-2xl font-display font-light text-[#1A1A1A] flex items-center gap-2 mt-1">
            <Ruler className="h-6 w-6 text-[#8E8A7F]" /> Perfect Fit Calculator
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Fine-tune measurements to receive your customized sewing blueprint code.</p>
        </div>
        <div className="bg-[#F8F7F4] border border-[#1A1A1A]/10 rounded-xl px-4 py-2 flex items-center gap-3">
          <Scissors className="h-4 w-4 text-[#8E8A7F] animate-pulse" />
          <div>
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-400">Atelier Profile Code</div>
            <div className="text-sm font-mono font-bold text-[#1A1A1A] uppercase">{code}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sliders Area */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-grotesk tracking-[0.2em] uppercase text-[#1A1A1A] font-semibold mb-2">
            <Sliders className="h-4 w-4 text-[#8E8A7F]" /> Sliders Controls
          </div>

          {/* Height slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Height (cm)</label>
              <span className="text-xs font-mono font-semibold text-atelier-gold">{heightVal} cm ({Math.floor(heightVal / 30.48)}&apos;{Math.floor((heightVal % 30.48) / 2.54)}&quot;)</span>
            </div>
            <input
              type="range"
              min="145"
              max="195"
              value={heightVal}
              onChange={(e) => setHeightVal(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-atelier-gold transition-colors focus:outline-none"
              style={{ minHeight: "44px" }}
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>145cm (4&apos;9&quot;)</span>
              <span>170cm (5&apos;7&quot;)</span>
              <span>195cm (6&apos;5&quot;)</span>
            </div>
          </div>

          {/* Bust slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Chest / Bust Circumference (inches)</label>
              <span className="text-xs font-mono font-semibold text-atelier-gold">{bust}&quot;</span>
            </div>
            <input
              type="range"
              min="30"
              max="48"
              value={bust}
              onChange={(e) => setBust(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-atelier-gold transition-colors focus:outline-none"
              style={{ minHeight: "44px" }}
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>30 inches</span>
              <span>39 inches</span>
              <span>48 inches</span>
            </div>
          </div>

          {/* Waist slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Natural Waistline (inches)</label>
              <span className="text-xs font-mono font-semibold text-atelier-gold">{waist}&quot;</span>
            </div>
            <input
              type="range"
              min="24"
              max="42"
              value={waist}
              onChange={(e) => setWaist(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-atelier-gold transition-colors focus:outline-none"
              style={{ minHeight: "44px" }}
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>24 inches</span>
              <span>33 inches</span>
              <span>42 inches</span>
            </div>
          </div>

          {/* Hips slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Hips (inches)</label>
              <span className="text-xs font-mono font-semibold text-atelier-gold">{hips}&quot;</span>
            </div>
            <input
              type="range"
              min="32"
              max="50"
              value={hips}
              onChange={(e) => setHips(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-atelier-gold transition-colors focus:outline-none"
              style={{ minHeight: "44px" }}
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>32 inches</span>
              <span>41 inches</span>
              <span>50 inches</span>
            </div>
          </div>

          {/* Shoulder width */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Shoulder Width (inches)</label>
              <span className="text-xs font-mono font-semibold text-atelier-gold">{shoulder}&quot;</span>
            </div>
            <input
              type="range"
              min="12"
              max="19"
              value={shoulder}
              onChange={(e) => setShoulder(parseInt(e.target.value))}
              className="w-full h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-atelier-gold transition-colors focus:outline-none"
              style={{ minHeight: "44px" }}
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>12 inches</span>
              <span>15.5 inches</span>
              <span>19 inches</span>
            </div>
          </div>
        </div>

        {/* Live Visualizer feedback and Advice */}
        <div className="flex flex-col justify-between bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block mb-1">Live Silhouette Report</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-display font-medium text-atelier-dark">{bodyShape}</span>
              <span className="text-xs text-neutral-500 font-mono">({heightGroup})</span>
            </div>

            <div className="mt-5 space-y-4 text-xs text-neutral-600">
              <div className="bg-white border border-neutral-200/50 rounded-xl p-3 flex gap-3">
                <Sparkles className="h-4 w-4 text-atelier-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-atelier-dark">Atelier Pattern Suggestion</h4>
                  <p className="mt-1 leading-relaxed text-neutral-500">{getDrapingAdvice()}</p>
                </div>
              </div>

              <div className="bg-white border border-neutral-200/50 rounded-xl p-3 flex gap-3">
                <Info className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-atelier-dark">Worldwide Stitching Services</h4>
                  <p className="mt-1 leading-relaxed text-neutral-500">Every design on our landing page can be fully customized with physical muslin drapes based on these inputs at no surplus cost.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-neutral-250">
            <button
              id="apply-measurement-btn"
              onClick={handleApply}
              className={`w-full py-3.5 px-6 rounded-xl font-grotesk font-semibold text-xs transition duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                applied
                  ? "bg-emerald-600 text-white"
                  : "bg-atelier-dark text-white hover:bg-atelier-clay"
              }`}
            >
              {applied ? (
                <>
                  <Check className="h-4 w-4" /> Applied to Personal Atelier Profile
                </>
              ) : (
                <>
                  <Scissors className="h-4 w-4" /> Save Measurement Snapshot
                </>
              )}
            </button>
            <p className="text-[10px] text-neutral-400 text-center mt-2 font-mono">Updating these automatically adapts every garment you inquire about.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
