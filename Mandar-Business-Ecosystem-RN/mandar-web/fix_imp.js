const fs = require('fs');
let content = fs.readFileSync('components/LandingPageClient.jsx', 'utf8');

// Replace any import line for lucide-react with the full one
content = content.replace(/import \{.*?\} from 'lucide-react';/, "import { Search, ShieldCheck, TrendingUp, Building2, Smartphone, ArrowRight, Package, MapPin, CheckCircle2, Factory, Briefcase, Zap, Sprout } from 'lucide-react';");

fs.writeFileSync('components/LandingPageClient.jsx', content, 'utf8');
