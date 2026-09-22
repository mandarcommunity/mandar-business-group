const fs = require('fs');
const pageFile = 'components/LandingPageClient.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

content = content.replace(/\{INDUSTRIES\.slice\(0, 15\)\.map/g, '{INDUSTRIES.map');

// Carefully replace just the Explore All block at the end of the map loop
const targetBlock = `            <Link href="/industries">
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="snap-start shrink-0 w-64 h-32 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all gap-3"
              >
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold">Explore All {INDUSTRIES.length}</span>
              </motion.div>
            </Link>`;

// Note: Because of formatting/indentation, the literal string match might fail if it's slightly off. I'll use a safer regex.
content = content.replace(/<Link href="\/industries">\s*<motion\.div\s*whileHover[\s\S]*?<span className="font-bold">Explore All \{INDUSTRIES\.length\}<\/span>[\s\S]*?<\/motion\.div>\s*<\/Link>/, '');

fs.writeFileSync(pageFile, content, 'utf8');
