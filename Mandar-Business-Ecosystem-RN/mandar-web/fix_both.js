const fs = require('fs');

// 1. Put getIndustryIcon into utils
const utilsFile = 'lib/utils.js';
const getIconStr = `import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap, ShoppingBag, Truck, Wrench, Sprout, HeartPulse, Laptop, BookOpen, Utensils, Scissors, Sofa, Lightbulb, Shirt, HardHat, Car, Cpu } from 'lucide-react';

export function getIndustryIcon(name) {
  if (!name) return Briefcase;
  const n = name.toLowerCase();
  if (n.includes('agri') || n.includes('farm') || n.includes('seed')) return Sprout;
  if (n.includes('auto') || n.includes('car') || n.includes('vehicle')) return Car;
  if (n.includes('food') || n.includes('bake') || n.includes('restaurant')) return Utensils;
  if (n.includes('health') || n.includes('medic') || n.includes('clinic')) return HeartPulse;
  if (n.includes('tech') || n.includes('soft') || n.includes('it ')) return Laptop;
  if (n.includes('cloth') || n.includes('textile') || n.includes('garment')) return Shirt;
  if (n.includes('build') || n.includes('construct') || n.includes('cement')) return HardHat;
  if (n.includes('machin') || n.includes('equip') || n.includes('tool')) return Wrench;
  if (n.includes('retail') || n.includes('shop') || n.includes('store')) return ShoppingBag;
  if (n.includes('logist') || n.includes('transport') || n.includes('pack')) return Truck;
  if (n.includes('furnitur') || n.includes('wood')) return Sofa;
  if (n.includes('electric') || n.includes('power')) return Zap;
  if (n.includes('beauty') || n.includes('salon')) return Scissors;
  if (n.includes('educat') || n.includes('school')) return BookOpen;
  if (n.includes('manufactur') || n.includes('factor')) return Factory;
  return Briefcase;
}`;
let utilsContent = fs.readFileSync(utilsFile, 'utf8');
if (!utilsContent.includes('getIndustryIcon')) {
  fs.writeFileSync(utilsFile, getIconStr + '\n\n' + utilsContent, 'utf8');
}

// 2. Remove getIndustryIcon from LandingPageClient
const landingFile = 'components/LandingPageClient.jsx';
let landingContent = fs.readFileSync(landingFile, 'utf8');
landingContent = landingContent.replace(/function getIndustryIcon[\s\S]*?return Briefcase;\n\}/, '');
landingContent = landingContent.replace(/import \{ Search.*?from 'lucide-react';/, `import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap } from 'lucide-react';`);
landingContent = landingContent.replace('import { slugify } from "../lib/utils";', 'import { slugify, getIndustryIcon } from "../lib/utils";');
fs.writeFileSync(landingFile, landingContent, 'utf8');

// 3. Update /industries/page.js
const indFile = 'app/industries/page.js';
let indContent = fs.readFileSync(indFile, 'utf8');
indContent = indContent.replace('import { slugify } from \'../../lib/utils\';', 'import { slugify, getIndustryIcon } from \'../../lib/utils\';');

const oldHtml = `<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm font-black shrink-0">
                    {industry.charAt(0)}
                  </div>`;
const newHtml = `<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                    {(() => {
                      const Icon = getIndustryIcon(industry);
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>`;
indContent = indContent.replace(oldHtml, newHtml);
fs.writeFileSync(indFile, indContent, 'utf8');
