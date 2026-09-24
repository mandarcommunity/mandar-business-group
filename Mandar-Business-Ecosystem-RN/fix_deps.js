const fs = require('fs');
let path = 'mandar-web/components/LandingPageClient.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports if missing
if (!content.includes('useRouter')) {
  content = content.replace(
    'import { motion, useScroll, useTransform } from "framer-motion";',
    'import { motion, useScroll, useTransform } from "framer-motion";\nimport { useRouter } from "next/navigation";\nimport { useState } from "react";'
  );
}

// 2. Add state and handleSearch
if (!content.includes('handleSearch')) {
  content = content.replace(
    'export default function LandingPageClient({ businesses, industries }) {\n  const { scrollY } = useScroll();',
    'export default function LandingPageClient({ businesses, industries }) {\n  const router = useRouter();\n  const [searchQuery, setSearchQuery] = useState("");\n  const handleSearch = (e) => {\n    e.preventDefault();\n    if (searchQuery.trim()) {\n      router.push(`/directory?q=${encodeURIComponent(searchQuery.trim())}`);\n    }\n  };\n  const { scrollY } = useScroll();'
  );
}

fs.writeFileSync(path, content, 'utf8');
console.log("handleSearch and imports added!");
