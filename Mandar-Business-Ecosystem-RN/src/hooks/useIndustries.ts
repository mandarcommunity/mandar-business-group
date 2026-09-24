import { useState, useEffect } from "react";
import { API } from "../services/api";

const INDUSTRY_ICONS: Record<string, string> = {
  "3D Printing": "🖨️",
  "Agriculture": "🌾",
  "Agriculture Tech (AgTech)": "🚜",
  "Animation & VFX": "🎬",
  "Artificial Intelligence": "🤖",
  "Astrology & Spiritual Services": "✨",
  "Automobile": "🚗",
  "Aviation": "✈️",
  "Ayurveda & Alternative Medicine": "🌿",
  "Banking & Finance": "🏦",
  "Beauty & Personal Care": "💄",
  "Biotechnology": "🧬",
  "Blockchain & Crypto": "⛓️",
  "Chemicals": "🧪",
  "Clean Tech": "🌱",
  "Coaching & Mentoring": "🗣️",
  "Construction & Engineering": "🏗️",
  "Consulting": "💼",
  "Consumer Goods": "🛍️",
  "Coworking Spaces": "🏢",
  "Cybersecurity": "🔒",
  "Dairy & Poultry": "🥛",
  "Data Analytics": "📊",
  "Drones & UAVs": "🚁",
  "E-commerce": "🛒",
  "Education & EdTech": "🎓",
  "Electronics & Electrical": "🔌",
  "Energy & Power": "⚡",
  "Entertainment & Media": "🎭",
  "Environmental Services": "🌍",
  "Event Management": "🎉",
  "Fashion & Apparel": "👗",
  "FinTech": "💳",
  "Fitness & Wellness": "🧘",
  "Fitness Equipment": "🏋️",
  "Food & Beverage": "🍔",
  "Food Tech": "🥡",
  "Franchising": "🏪",
  "Furniture & Home Decor": "🛋️",
  "Gaming & Esports": "🎮",
  "Green Building Materials": "🧱",
  "Handicrafts & Artisans": "🏺",
  "Healthcare & Medical": "🏥",
  "HealthTech": "🩺",
  "Hospitality & Tourism": "🏨",
  "Human Resources (HR)": "👥",
  "Hydraulics & Pneumatics": "⚙️",
  "Import & Export": "🚢",
  "Industrial Automation": "🏭",
  "Information Technology (IT)": "💻",
  "Insurance": "🛡️",
  "InsurTech": "📱",
  "Interior Design & Architecture": "📐",
  "Jewelry & Gems": "💎",
  "Laser Technology": "🔦",
  "Legal Services": "⚖️",
  "Logistics & Supply Chain": "🚛",
  "Manufacturing": "🏭",
  "Marine Biology": "🐠",
  "Maritime & Shipping": "⚓",
  "Marketing & Advertising": "📈",
  "Metals & Mining": "⛏️",
  "Nanotechnology": "🔬",
  "NGO & Non-Profit": "🤝",
  "Optics & Photonics": "👓",
  "Packaging Solutions": "📦",
  "Pet Care & Veterinary": "🐾",
  "Pharmaceuticals": "💊",
  "Photography & Videography": "📸",
  "Plastics & Rubber": "🧪",
  "Printing & Publishing": "📰",
  "PropTech": "🏙️",
  "Public Relations (PR)": "🎤",
  "Quantum Computing": "⚛️",
  "Real Estate": "🏢",
  "RegTech": "📋",
  "Renewable Energy": "🌞",
  "Research & Development (R&D)": "🔬",
  "Retail": "🏪",
  "Robotics": "🤖",
  "Security & Defense": "👮",
  "Smart City Solutions": "🌆",
  "Social Media & Influencer Marketing": "📱",
  "Software & SaaS": "☁️",
  "Space Tech": "🚀",
  "Sports & Recreation": "⚽",
  "Sustainable Packaging": "♻️",
  "Telecommunications": "📡",
  "Textiles": "🧵",
  "Toys & Games": "🧸",
  "Translation & Localization": "🌐",
  "Transportation": "🚌",
  "Venture Capital & Private Equity": "💰",
  "Virtual Reality (VR) & Augmented Reality (AR)": "🥽",
  "Waste Management": "🗑️",
  "Water & Wastewater Management": "💧",
  "WealthTech": "📈",
  "Wearable Technology": "⌚",
  "Web3 & Metaverse": "🌐",
  "Wood & Paper Products": "🪵"
};

// Global cache
let cachedIndustries: string[] = [];
let cachedIndustryObjects: any[] = [];

export function useIndustries() {
  const [industries, setIndustries] = useState<string[]>(cachedIndustries);
  const [industryObjects, setIndustryObjects] = useState<any[]>(cachedIndustryObjects);
  const [isLoading, setIsLoading] = useState<boolean>(cachedIndustries.length === 0);

  useEffect(() => {
    if (cachedIndustries.length === 0) {
      API.get("/system/industries")
        .then((res) => {
          if (res.data && res.data.success) {
            const names = res.data.data.map((i: any) => i.name || i);
            const emojisMap = res.data.data.reduce((acc: any, i: any) => {
              if (i.name && i.emoji) acc[i.name] = i.emoji;
              return acc;
            }, {});

            cachedIndustries = names;
            
            const objs = names.map((industryName: string) => ({
              id: industryName.toLowerCase().replace(/\s+/g, '-'),
              name: industryName,
              icon: emojisMap[industryName] || INDUSTRY_ICONS[industryName] || "🏭",
            }));
            cachedIndustryObjects = objs;
            
            setIndustries(names);
            setIndustryObjects(objs);
            setIsLoading(false);
          }
        })
        .catch(console.error).finally(() => setIsLoading(false));
    }
  }, []);

  return { industries, industryObjects, isLoading };
}
