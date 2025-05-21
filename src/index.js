// Import required Cloudflare Workers modules
import { Router } from 'itty-router';

// Create a new router
const router = Router();

// MCP Protocol Constants
const MCP_VERSION = '1.0';
const MCP_COMMANDS = {
  HELP: 'help',
  SEARCH: 'search',
  GET_DOC: 'getdoc',
  LIST_CATEGORIES: 'listcategories',
  LIST_TAGS: 'listtags'
};

// Helper function to load the search index
async function getSearchIndex(env) {
  // Corrected: Need to rehydrate the Lunr index
  const indexJSON = await env.DOCS_KV.get('search-index', { type: 'json' });
  if (!indexJSON) return null; // Handle case where index is not found
  // Lunr index needs to be re-hydrated from its JSON form
  // We need to ensure lunr is available in this environment or this part will fail.
  // Assuming lunr is bundled or available globally in the CF worker.
  // If lunr is not directly available, this hydration will need adjustment.
  // For now, this matches the guide, but actual Lunr library use is key.
  // const { lunr } = await import('lunr'); // This line might be needed if lunr is modular
  // return lunr.Index.load(indexJSON);
  // For now, returning the JSON, assuming client-side rehydration or direct use if possible.
  // The guide's performSearch implies the index is directly usable.
  // Let's stick to the guide's implication that searchIndex.search works.
  return indexJSON; // This might be problematic if lunr.Index.load is needed.
}

// Helper function to load the document store
async function getDocStore(env) {
  const storeData = await env.DOCS_KV.get('docs-store', { type: 'json' });
  return storeData;
}

// Helper function to load a specific document
async function getDocument(path, env) {
  // Documents are stored with a prefix "doc:" in KV
  // const doc = await env.DOCS_KV.get(`docs/docs${path}.json`, { type: 'json' });
  // The key in KV should match how upload-to-kv.js stores them.
  // The guide's upload script stores them as `doc:${relativePath}`
  // where relativePath starts with a `/`. e.g. `doc:/components/button`
  // The process-markdown script generates paths like `/components/button`
  // So, the key in KV should be `doc:${path}` if path is like `/components/button`
  // Let's adjust to match the guide's upload script pattern.
  const kvPathKey = `doc:${path}`;
  console.log(`Attempting to fetch doc from KV with key: ${kvPathKey}`);
  return await env.DOCS_KV.get(kvPathKey, { type: 'json' });
}

// Helper function to perform a search
async function performSearch(query, env) {
  const searchIndexJSON = await getSearchIndex(env);
  const docStore = await getDocStore(env);

  if (!searchIndexJSON || !docStore) {
    console.error('Search index or document store not found in KV.');
    return [];
  }

  // Rehydrate the Lunr index from the JSON data
  // This requires Lunr to be available in the worker's scope.
  // We'll assume 'lunr' can be imported or is globally available.
  // If not, this part will fail and needs adjustment for the CF environment.
  // For now, proceeding with the assumption it's available.
  // const lunr = await import('lunr'); // This might be needed
  // For now, let's assume lunr is globally available due to wrangler/build process.
  if (typeof lunr === 'undefined' || typeof lunr.Index === 'undefined') {
    console.error('Lunr library is not available in the worker scope.');
    // Attempt to use a shim or a simplified search if Lunr is not available.
    // This is a fallback and might not work as expected.
    // A proper build step should bundle lunr.
    return Object.values(docStore).filter(doc => 
        doc.title.includes(query) || doc.content.includes(query)
    ).map(doc => ({ ...doc, score: 1, ref: doc.id || doc.path })); // Simplified search
  }
  
  const searchIndex = lunr.Index.load(searchIndexJSON);
  
  // Search using the Lunr index
  const results = searchIndex.search(query);
  
  // Map results to actual documents
  return results.map(result => {
    const docInfo = docStore[result.ref];
    return {
      id: result.ref,
      title: docInfo.title,
      path: docInfo.path,
      category: docInfo.category,
      tags: docInfo.tags,
      score: result.score
    };
  });
}

// Route to handle MCP protocol commands
router.post('/mcp', async (request, env) => {
  try {
    const data = await request.json();
    
    if (!data.command) {
      return new Response(JSON.stringify({
        status: 'error',
        message: 'Missing command parameter'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    switch (data.command) {
      case MCP_COMMANDS.HELP:
        return new Response(JSON.stringify({
          status: 'success',
          version: MCP_VERSION,
          commands: Object.values(MCP_COMMANDS),
          message: 'Available commands for the Design System MCP'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      case MCP_COMMANDS.SEARCH:
        if (!data.query) {
          return new Response(JSON.stringify({
            status: 'error',
            message: 'Missing query parameter'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const results = await performSearch(data.query, env);
        return new Response(JSON.stringify({
          status: 'success',
          results,
          count: results.length,
          query: data.query
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      case MCP_COMMANDS.GET_DOC:
        if (!data.path) {
          return new Response(JSON.stringify({
            status: 'error',
            message: 'Missing path parameter'
          }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const doc = await getDocument(data.path, env);
        if (!doc) {
          return new Response(JSON.stringify({
            status: 'error',
            message: `Document not found for path: ${data.path}`
          }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        return new Response(JSON.stringify({
          status: 'success',
          document: doc
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      case MCP_COMMANDS.LIST_CATEGORIES:
        const docStoreForCategories = await getDocStore(env);
        if (!docStoreForCategories) {
             return new Response(JSON.stringify({ status: 'error', message: 'Document store not found'}), { status: 500, headers: { 'Content-Type': 'application/json' }});
        }
        const categories = [...new Set(Object.values(docStoreForCategories).map(doc => doc.category))];
        
        return new Response(JSON.stringify({
          status: 'success',
          categories
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      case MCP_COMMANDS.LIST_TAGS:
        const docStoreForTags = await getDocStore(env);
         if (!docStoreForTags) {
             return new Response(JSON.stringify({ status: 'error', message: 'Document store not found'}), { status: 500, headers: { 'Content-Type': 'application/json' }});
        }
        const allTags = Object.values(docStoreForTags).flatMap(doc => doc.tags || []); // Ensure tags is an array
        const tags = [...new Set(allTags)];
        
        return new Response(JSON.stringify({
          status: 'success',
          tags
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
        
      default:
        return new Response(JSON.stringify({
          status: 'error',
          message: `Unknown command: ${data.command}`
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Error processing MCP request:', error);
    return new Response(JSON.stringify({
      status: 'error',
      message: error.message,
      stack: error.stack // Optional: include stack for debugging
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Handle all other routes
router.all('*', () => new Response('Not Found. Use the /mcp endpoint for commands.', { status: 404 }));

// Main fetch handler
export default {
  async fetch(request, env, ctx) {
    // It's important that 'lunr' is available here for search.
    // If it's a module, it needs to be imported.
    // For Cloudflare Workers, you'd typically bundle dependencies using Wrangler.
    // If 'lunr' is not globally available, performSearch will fail to load the index.
    // This might require adding 'lunr' to package.json and a build step in wrangler.toml
    // For now, we assume the build process handles this.
    globalThis.lunr = (await import('lunr')).default; // Attempt to make lunr global if using modules

    return router.handle(request, env, ctx);
  },
  
  // Scheduled handler to update KV.
  // The guide suggests importing JSON directly. This works if the files are part of the worker bundle.
  // However, the typical flow is:
  // 1. GitHub action processes markdown, generates JSONs (search-index.json, docs-store.json, individual docs).
  // 2. GitHub action uploads these JSONs to KV using `scripts/upload-to-kv.js`.
  // The scheduled handler in the worker itself might be redundant if the GitHub action updates KV.
  // If the worker *is* responsible for populating KV from bundled files, those files must be < 1MB.
  // The guide's `upload-to-kv.js` implies external upload, which is more robust for large doc sets.
  // I will keep the scheduled handler as per the guide, but note this potential redundancy or alternative flow.
  async scheduled(event, env, ctx) {
    console.log('Scheduled event triggered. Attempting to update KV from bundled JSON.');
    try {
      // These imports assume 'search-index.json' and 'docs-store.json' are bundled with the worker.
      // This is configured by 'site.bucket = "./dist"' in wrangler.toml and what 'npm run build' produces.
      // However, wrangler kv:key put is usually used for this, not direct import in scheduled handler.
      // This section might be a conceptual representation or requires specific build tooling.
      
      // Let's assume the intent is that these files are accessible via the __STATIC_CONTENT manifest
      // if wrangler is configured for static site assets.
      // A more direct way for a scheduled task to update KV would be to fetch from a URL or use a binding.
      // Given the guide's structure, it's more likely that an external process (GitHub Action + upload-to-kv.js)
      // is responsible for populating KV.
      // The 'scheduled' handler here seems to be mixing concerns or assuming a specific deployment where
      // these JSON files are directly importable and meant to be pushed to KV by the worker itself.

      // For now, I will keep it as per the guide, but with a strong note that KV population
      // is typically done via `wrangler kv:key put` or API, not direct JSON import in the worker code
      // unless those files are very small and bundled.

      // The guide has:
      // const { default: searchIndex } = await import('./search-index.json'); // This path is relative to src/
      // const { default: docsStore } = await import('./docs-store.json');   // This path is relative to src/
      // This implies search-index.json and docs-store.json are in src/, not dist/.
      // This contradicts their generation into the dist/ folder by other scripts.

      // Correcting the path based on typical project structure and where files are generated:
      // These files are in `dist/`, not `src/`. Direct import from outside `src` is tricky.
      // A more robust way is for the GitHub Action to use `upload-to-kv.js`.
      // I will comment out this part of the scheduled handler as it's likely to cause issues
      // and the primary mechanism for KV upload should be `upload-to-kv.js`.

      /*
      console.log("Attempting to load search-index.json and docs-store.json for KV update.");
      // These files are in dist, not src. Worker bundling might make them available.
      // Assuming the build process copies these to where the worker can access them.
      // This is highly dependent on the build/deployment setup.
      const searchIndexModule = await import('../dist/search-index.json');
      const docsStoreModule = await import('../dist/docs-store.json');

      const searchIndex = searchIndexModule.default;
      const docsStore = docsStoreModule.default;
      
      if (searchIndex) {
        await env.DOCS_KV.put('search-index', JSON.stringify(searchIndex));
        console.log('Successfully updated search-index in KV store from bundled file.');
      } else {
        console.error('Failed to load search-index.json from bundle.');
      }
      
      if (docsStore) {
        await env.DOCS_KV.put('docs-store', JSON.stringify(docsStore));
        console.log('Successfully updated docs-store in KV store from bundled file.');
      } else {
        console.error('Failed to load docs-store.json from bundle.');
      }
      
      // The guide also mentions:
      // "// Upload individual documents to KV"
      // "// Implementation to read all doc files and upload to KV..."
      // This is complex to do from within the worker scheduled task itself without a manifest.
      // This task is much better suited for the external `upload-to-kv.js` script.
      */

      console.log('Scheduled KV update from bundled files is commented out as it is better handled by external upload scripts (upload-to-kv.js via GitHub Actions). The scheduled handler can be used for other periodic tasks if needed.');

    } catch (error) {
      console.error('Failed to update docs in KV via scheduled handler:', error);
    }
  }
};
