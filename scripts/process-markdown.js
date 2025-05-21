const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const marked = require('marked');

// Directory containing the cloned design system docs
const DOCS_DIR = path.join(__dirname, '../design-system');
// Output directory for processed files
const OUTPUT_DIR = path.join(__dirname, '../dist/docs');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Process a markdown file
function processMarkdown(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  // Extract metadata and content
  const metadata = {
    title: data.title || path.basename(filePath, '.md'),
    category: data.category || 'uncategorized',
    tags: data.tags || [],
    path: filePath.replace(DOCS_DIR, '').replace(/\.md$/, ''),
    lastUpdated: data.lastUpdated || new Date().toISOString()
  };
  
  // Convert markdown to HTML (optional, depending on your needs)
  const html = marked(content);
  
  return {
    metadata,
    content,
    html
  };
}

// Walk through all markdown files in the directory
function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) { // Modified to include .mdx
      const processed = processMarkdown(fullPath);
      
      // Create relative output path
      const relativePath = fullPath.replace(DOCS_DIR, '');
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      const outputDir = path.dirname(outputPath);
      
      // Create output directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Write processed file as JSON
      fs.writeFileSync(
        outputPath.replace(/\.mdx?$/, '.json'), // Modified to replace .mdx or .md
        JSON.stringify(processed, null, 2)
      );
      
      console.log(`Processed: ${relativePath}`);
    }
  }
}

// Start processing from the root docs directory
// Check if the design-system directory exists before processing
if (fs.existsSync(DOCS_DIR)) {
  processDirectory(DOCS_DIR);
  console.log('All markdown files processed successfully!');
} else {
  console.warn(`DOCS_DIR not found: ${DOCS_DIR}. Skipping processing. This directory should be created by the GitHub Action by cloning the design system repository.`);
}
