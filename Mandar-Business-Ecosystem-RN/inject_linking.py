import sys

with open('src/navigation/RootNavigator.tsx', 'r') as f:
    content = f.read()

linking_config = """
const linking = {
  prefixes: ['https://mandarcommunity.in', 'mandar://'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Explore: {
            screens: {
              BusinessProfile: 'biz/:slug',
              AdvertisementDetails: 'ad/:slug'
            }
          },
          Leads: {
            screens: {
              LeadsHome: 'req/:slug'
            }
          }
        }
      }
    }
  }
};
"""

if "const linking =" not in content:
    content = content.replace('export default function RootNavigator() {', linking_config + '\nexport default function RootNavigator() {')
    content = content.replace('<NavigationContainer\n      theme={navigationTheme}\n    >', '<NavigationContainer\n      theme={navigationTheme}\n      linking={linking}\n    >')

with open('src/navigation/RootNavigator.tsx', 'w') as f:
    f.write(content)
