const fs = require('fs');

// 1. Update App.tsx
let appFile = 'admin-panel/src/App.tsx';
let appContent = fs.readFileSync(appFile, 'utf8');

if (!appContent.includes('IndustriesScreen')) {
  appContent = appContent.replace(
    "import Layout from './components/Layout';", 
    "import IndustriesScreen from './screens/IndustriesScreen';\nimport Layout from './components/Layout';"
  );
  
  appContent = appContent.replace(
    '<Route path="/feedbacks" element={token ? <FeedbackScreen /> : <Navigate to="/login" />} />',
    '<Route path="/feedbacks" element={token ? <FeedbackScreen /> : <Navigate to="/login" />} />\n          <Route path="/industries" element={token ? <IndustriesScreen /> : <Navigate to="/login" />} />'
  );
  fs.writeFileSync(appFile, appContent, 'utf8');
}

// 2. Update Layout.tsx (Sidebar navigation)
let layoutFile = 'admin-panel/src/components/Layout.tsx';
let layoutContent = fs.readFileSync(layoutFile, 'utf8');

if (!layoutContent.includes('/industries')) {
  // Lucide icons
  if (!layoutContent.includes('Briefcase')) {
    layoutContent = layoutContent.replace('MessageSquare,', 'MessageSquare, Briefcase,');
  }

  // Navigation array
  layoutContent = layoutContent.replace(
    "{ name: 'System Feedbacks', path: '/feedbacks', icon: MessageSquare }",
    "{ name: 'System Feedbacks', path: '/feedbacks', icon: MessageSquare },\n  { name: 'Master Industries', path: '/industries', icon: Briefcase }"
  );
  fs.writeFileSync(layoutFile, layoutContent, 'utf8');
}
