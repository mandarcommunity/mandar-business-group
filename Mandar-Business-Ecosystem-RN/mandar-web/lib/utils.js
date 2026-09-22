import { INDUSTRY_ICONS } from '../constants/industryIcons';
export function getIndustryEmoji(name) {
  return INDUSTRY_ICONS[name] || "??";
}


export function slugify(text) {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}
