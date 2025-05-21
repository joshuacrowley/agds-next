const fs = require('fs');
const path = require('path');
const lunr = require('lunr');

// Directory containing processed docs
const DOCS_DIR = path.join(__dirname, '../dist/docs');
// Output file for the search index
const INDEX_FILE = path.join(__dirname, '../dist/search-index.json');
// Output file for the document store
const DOCS_STORE = path.join(__dirname, '../dist/docs-store.json');

// Load all processed document JSONs
function loadDocuments(directory) {
  const documents = [];
  
  function walkDir(dir) {
    // Check if directory exists before reading
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}. Skipping loading documents from this directory.`);
      return;
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const doc = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        documents.push({
          id: doc.metadata.path,
          title: doc.metadata.title,
          content: doc.content,
          category: doc.metadata.category,
          tags: Array.isArray(doc.metadata.tags) ? doc.metadata.tags.join(' ') : (doc.metadata.tags || ''), // Ensure tags is a string
          path: doc.metadata.path
        });
      }
    }
  }
  
  walkDir(directory);
  return documents;
}

// Create the search index
function createSearchIndex(documents) {
  const idx = lunr(function() {
    this.ref('id');
    this.field('title', { boost: 10 });
    this.field('content');
    this.field('category', { boost: 5 });
    this.field('tags', { boost: 5 });
    
    documents.forEach(doc => {
      this.add(doc);
    });
  });
  
  return idx;
}

// Create a store of document metadata
function createDocStore(documents) {
  const store = {};
  
  documents.forEach(doc => {
    store[doc.id] = {
      title: doc.title,
      path: doc.path,
      category: doc.category,
      // Ensure tags are stored as an array in the docStore
      tags: typeof doc.tags === 'string' ? doc.tags.split(' ').filter(t => t.length > 0) : (doc.metadata.tags || []) 
    };
  });
  
  return store;
}

// Main execution
// Create dist directory if it doesn't exist, as DOCS_DIR is inside dist
if (!fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.mkdirSync(path.join(__dirname, '../dist'), { recursive: true });
}
// Also ensure DOCS_DIR exists, as it might not if process-markdown hasn't run or created output
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
  console.log(`Created DOCS_DIR as it was not found: ${DOCS_DIR}`);
}

const documents = loadDocuments(DOCS_DIR);

if (documents.length === 0) {
  console.warn('No documents found to index. Proceeding to create empty index and store.');
  // Ensure dist directory exists to write empty files
  if (!fs.existsSync(path.dirname(INDEX_FILE))) {
    fs.mkdirSync(path.dirname(INDEX_FILE), { recursive: true });
  }
} else {
  console.log(`Loaded ${documents.length} documents`);
}

const searchIndex = createSearchIndex(documents);
const docStore = createDocStore(documents);

// Write the search index to a file
fs.writeFileSync(INDEX_FILE, JSON.stringify(searchIndex));
console.log(`Search index written to ${INDEX_FILE}`);

// Write the document store to a file
fs.writeFileSync(DOCS_STORE, JSON.stringify(docStore));
console.log(`Document store written to ${DOCS_STORE}`);
