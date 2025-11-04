import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts an SVG string into a React component with customizable stroke.
 * @param {string} svgString - The SVG string to convert.
 * @returns {React.FC<{ stroke?: string }>} - A React component with a customizable stroke.
 */
export function createSvgComponent(
  svgString: string
): React.FC<{ stroke?: string }> {
  return ({ stroke = "currentColor", ...props }) => {
    // Create a wrapper div to parse the SVG string
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Update the stroke attribute dynamically
    if (svgElement.hasAttribute("stroke")) {
      svgElement.setAttribute("stroke", stroke);
    }

    // Convert the SVG element back to a string
    const updatedSvgString = new XMLSerializer().serializeToString(svgElement);

    return React.createElement("span", {
      ...props,
      dangerouslySetInnerHTML: { __html: updatedSvgString },
    });
  };
}

/**
 * Reads an SVG file from the assets folder and converts it into a React component.
 * @param {string} fileName - The name of the SVG file (e.g., 'icon.svg').
 * @returns {Promise<React.FC<{ stroke?: string }>>} - A Promise resolving to a React component with a customizable stroke.
 */
export async function createSvgComponentFromFile(
  fileName: string
): Promise<React.FC<{ stroke?: string }>> {
  // Construct the file path relative to the public folder
  const filePath = `/src/assets/icons/${fileName}`;

  // Fetch the SVG file content
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Failed to load SVG file: ${fileName}`);
  }

  const svgString = await response.text();

  // Use the existing createSvgComponent function to generate the React component
  return createSvgComponent(svgString);
}
