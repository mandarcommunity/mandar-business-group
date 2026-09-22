const fs = require('fs');
const file = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update lucide-react imports to have a bunch of icons
content = content.replace(
  /import \{.*?\} from 'lucide-react';/,
  `import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap, ShoppingBag, Truck, Wrench, Sprout, HeartPulse, Laptop, BookOpen, Utensils, Scissors, Sofa, Lightbulb, Shirt, HardHat, Car, Cpu } from 'lucide-react';`
);

// 2. Add the dynamic icon mapping function right after imports
const mapFunction = `
function getIndustryIcon(name) {
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
}
`;

content = content.replace('"use client";', `"use client";` + mapFunction);

// 3. Update the slider HTML to use the old style
const oldHtmlRegex = /<motion\.div\s+whileHover=\{\{\s*y:\s*-5,\s*scale:\s*1\.02\s*\}\}\s+className=\{`snap-start shrink-0 w-64 h-32 rounded-3xl \$\{colorClass\} border flex flex-col justify-between p-5 cursor-pointer shadow-sm hover:shadow-md transition-all`\}\s*>[\s\S]*?<\/motion\.div>/g;

const newHtml = `<motion.div 
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="snap-start shrink-0 flex flex-col items-center gap-3 cursor-pointer group w-32"
                >
                  <div className={\`w-20 h-20 rounded-2xl \${colorClass} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow\`}>
                    {(() => {
                      const IconComponent = getIndustryIcon(industry);
                      return <IconComponent className="w-8 h-8" />;
                    })()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700 text-center leading-tight line-clamp-2">{industry}</span>
                </motion.div>`;

content = content.replace(oldHtmlRegex, newHtml);

// 4. Update the color array to be background only (without border) to match old style
content = content.replace(
  'const colors = [',
  'const colors = [\n              "bg-blue-100 text-blue-600",\n              "bg-purple-100 text-purple-600",\n              "bg-emerald-100 text-emerald-600",\n              "bg-orange-100 text-orange-600",\n              "bg-pink-100 text-pink-600",\n              "bg-indigo-100 text-indigo-600",\n              "bg-yellow-100 text-yellow-600",\n            ];\n            //'
);

fs.writeFileSync(file, content, 'utf8');
