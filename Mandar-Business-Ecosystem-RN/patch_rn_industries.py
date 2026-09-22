import os
import re

directory = 'src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if 'import { INDUSTRIES } from "../constants/industries";' in content or 'import { INDUSTRIES } from "../../constants/industries";' in content:
                # Calculate path depth to hooks
                depth = filepath.count(os.sep) - 1 # because 'src' is 1
                hooks_path = '../' * depth + 'hooks/useIndustries' if depth > 0 else './hooks/useIndustries'
                if depth == 1: hooks_path = '../hooks/useIndustries'
                if depth == 2: hooks_path = '../../hooks/useIndustries'

                content = re.sub(
                    r'import \{\s*INDUSTRIES,?\s*\} from "\.\./\.\./constants/industries";',
                    f'import {{ useIndustries }} from "../../hooks/useIndustries";',
                    content
                )
                
                content = re.sub(
                    r'import \{\s*INDUSTRIES,?\s*\} from "\.\./constants/industries";',
                    f'import {{ useIndustries }} from "../hooks/useIndustries";',
                    content
                )
                
                # Add hook call at the top of the component
                # Find the component definition
                component_match = re.search(r'export default function (\w+)\(.*?\) \{', content)
                if component_match:
                    content = content.replace(
                        component_match.group(0),
                        component_match.group(0) + '\n  const { industries: INDUSTRIES } = useIndustries();'
                    )
                else:
                    component_match = re.search(r'const (\w+) = \(.*?\) => \{', content)
                    if component_match:
                        content = content.replace(
                            component_match.group(0),
                            component_match.group(0) + '\n  const { industries: INDUSTRIES } = useIndustries();'
                        )
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

