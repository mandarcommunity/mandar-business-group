const fs = require('fs');
const files = [
  'src/components/business/BusinessActionBar.tsx',
  'src/screens/BusinessDirectoryScreen.tsx',
  'src/screens/SavedBusinessesScreen.tsx',
  'src/screens/BusinessCatalogScreen.tsx',
  'src/screens/MyAdvertisementsScreen.tsx',
  'src/screens/AdvertisementDetailsScreen.tsx',
  'src/screens/MyRequirementsScreen.tsx',
  'src/screens/LeadsScreen.tsx',
  'src/screens/MyProductsScreen.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    const idx = lines.findIndex(l => l.includes('Share.share'));
    if (idx !== -1) {
      console.log(`\n--- ${f} ---`);
      console.log(lines.slice(Math.max(0, idx - 4), idx + 2).join('\n'));
    }
  }
});
