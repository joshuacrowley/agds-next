const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // Using exec for wrangler commands

// Directory containing processed docs
const DOCS_OUTPUT_DIR = path.join(__dirname, '../dist/docs'); // Corrected variable name from DOCS_DIR to avoid conflict
// Search index file
const INDEX_FILE = path.join(__dirname, '../dist/search-index.json');
// Document store file
const DOCS_STORE_FILE = path.join(__dirname, '../dist/docs-store.json'); // Corrected variable name

// KV namespace binding (should match wrangler.toml)
// Note: Wrangler uses the binding name specified in wrangler.toml for the --binding flag.
// The actual KV_NAMESPACE_ID is configured in wrangler.toml or via environment variables for Wrangler.
const KV_BINDING_NAME = 'DOCS_KV'; // This is the binding name, not the ID.

// Helper function to run wrangler commands
function runWranglerCommand(command) {
  return new Promise((resolve, reject) => {
    // Log the command being executed
    console.log(`Executing: wrangler ${command}`);
    exec(`wrangler ${command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: wrangler ${command}`);
        console.error('stdout:', stdout);
        console.error('stderr:', stderr);
        reject(error);
        return;
      }
      if (stderr) {
        // Wrangler sometimes outputs info to stderr, so log it but don't necessarily reject
        console.warn(`stderr output for command: wrangler ${command}
${stderr}`);
      }
      console.log(`Success: wrangler ${command}
${stdout}`);
      resolve(stdout);
    });
  });
}

// Upload a single file to KV
async function uploadFileToKV(key, filePath, isJson = false) {
  // Wrangler kv:key put expects the value directly for JSON or path for file.
  // If it's JSON, we should pass the file path and let wrangler handle it.
  // The command format is `wrangler kv:key put --binding=<binding_name> <key_name> <value_or_filepath>`
  // For JSON files, providing filepath is standard.
  // Ensure filePath is properly quoted if it contains spaces, though paths here shouldn't.
  try {
    await runWranglerCommand(`kv:key put --binding=${KV_BINDING_NAME} "${key}" "${filePath}"`);
    console.log(`Successfully uploaded ${filePath} to KV with key "${key}"`);
  } catch (error) {
    console.error(`Failed to upload ${filePath} to KV with key "${key}".`);
    throw error; // Re-throw to be caught by main
  }
}


// Upload the search index to KV
async function uploadSearchIndex() {
  if (!fs.existsSync(INDEX_FILE)) {
    console.warn(`Search index file not found: ${INDEX_FILE}. Skipping upload.`);
    return;
  }
  console.log(`Uploading search index from ${INDEX_FILE}...`);
  // Key name in KV for the search index
  const keyName = 'search-index';
  await uploadFileToKV(keyName, INDEX_FILE, true);
}

// Upload the document store to KV
async function uploadDocStore() {
  if (!fs.existsSync(DOCS_STORE_FILE)) {
    console.warn(`Document store file not found: ${DOCS_STORE_FILE}. Skipping upload.`);
    return;
  }
  console.log(`Uploading document store from ${DOCS_STORE_FILE}...`);
  // Key name in KV for the document store
  const keyName = 'docs-store';
  await uploadFileToKV(keyName, DOCS_STORE_FILE, true);
}

// Upload individual documents to KV
async function uploadDocuments() {
  if (!fs.existsSync(DOCS_OUTPUT_DIR)) {
    console.warn(`Processed documents directory not found: ${DOCS_OUTPUT_DIR}. Skipping document uploads.`);
    return;
  }

  console.log(`Uploading individual documents from ${DOCS_OUTPUT_DIR}...`);
  let uploadCount = 0;
  const uploadPromises = []; // Collect promises here

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const docJsonContent = fs.readFileSync(fullPath, 'utf8');
        const docJson = JSON.parse(docJsonContent);
        
        const relativePath = docJson.metadata.path; 
        if (!relativePath) {
          console.warn(`Skipping file ${fullPath} as it does not contain metadata.path.`);
          continue;
        }

        const keyName = `doc:${relativePath}`; 
        
        // Push the promise to the array
        uploadPromises.push(
          uploadFileToKV(keyName, fullPath, true)
            .then(() => {
              uploadCount++;
            })
            .catch(err => {
              console.error(`Error during upload of ${fullPath}. Continuing with others.`);
              // Optionally, re-throw if one error should stop all, or handle as needed
            })
        );
      }
    }
  }
  
  walkDir(DOCS_OUTPUT_DIR);
  
  // Wait for all collected promises to settle
  await Promise.all(uploadPromises);
  console.log(`Finished processing all document uploads. Successful uploads: ${uploadCount} / (total attempted: ${uploadPromises.length})`);
}

// Main execution
async function main() {
  try {
    // Ensure dist directory exists (where files are expected)
    if (!fs.existsSync(path.join(__dirname, '../dist'))) {
        console.warn('Dist directory not found. No files to upload.');
        return;
    }

    await uploadSearchIndex();
    await uploadDocStore();
    await uploadDocuments(); // Now this will wait for all document uploads to complete
    
    console.log('All upload tasks completed.');
    console.log("Important: Ensure you have run 'wrangler login' and that the KV_BINDING_NAME in this script matches a [kv_namespaces] binding in your wrangler.toml, and that wrangler.toml has the correct 'id' for that binding.");

  } catch (error) {
    console.error('Upload process failed:', error);
    process.exit(1);
  }
}

main();
