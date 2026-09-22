import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap, ShoppingBag, Truck, Wrench, Sprout, HeartPulse, Laptop, BookOpen, Utensils, Scissors, Sofa, Lightbulb, Shirt, HardHat, Car, Cpu } from 'lucide-react';

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
}

export function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}
