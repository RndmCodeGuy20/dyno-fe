import { promises as fs } from 'fs';
import path from 'path';

/**
 * Reads all SVG files from the `src/assets/icons` folder, replaces stroke attributes with customizable props,
 * and generates React components in the `src/components/icons` folder.
 * If a component file already exists, it will not be overridden.
 */
export async function generateSvgComponents() {
    const iconsDir = path.join(process.cwd(), 'src/assets/icons');
    const componentsDir = path.join(process.cwd(), 'src/components/icons');

    // Ensure the components directory exists
    try {
        await fs.mkdir(componentsDir, { recursive: true });
    } catch (err) {
        console.error('Error creating components directory:', err);
        return;
    }

    try {
        // Read all SVG files from the icons directory
        const files = await fs.readdir(iconsDir);
        const svgFiles = files.filter(file => file.endsWith('.svg'));

        for (const file of svgFiles) {
            const filePath = path.join(iconsDir, file);
            const svgContent = await fs.readFile(filePath, 'utf-8');

            // Replace stroke attributes with props
            const componentName = path.basename(file, '.svg') as string;
            const updatedSvgContent = svgContent
                .replace(/stroke="(.*?)"/g, 'stroke={props.stroke || "black"}')
                .replace(/<svg(.*?)(width=".*?"|height=".*?")?(.*?)>/, '<svg$1 width={props.width || "24"} height={props.height || "24"}$3>');

            // Generate the React component
            const componentCode = `import React from 'react';

            interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  stroke?: string;
  height?: number | string;
  width?: number | string;
}

const ${componentName} = (props: ${componentName}Props) => (
    ${updatedSvgContent}
);

export default ${componentName};
`;

            // Write the component to the components directory if it doesn't already exist
            const componentPath = path.join(componentsDir, `${componentName
                .split('_')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join('')}Icon.tsx`);
            try {
                await fs.access(componentPath);
                console.log(`Component ${componentName} already exists. Skipping...`);
            } catch {
                await fs.writeFile(componentPath, componentCode, 'utf-8');
                console.log(`Component ${componentName} created successfully.`);
            }
        }
    } catch (err) {
        console.error('Error processing SVG files:', err);
    }
}
// Run the SVG component generation
generateSvgComponents();