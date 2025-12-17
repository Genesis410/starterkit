// Example Cloudflare Worker for edge functionality
// This would typically be deployed separately, but we'll create it as an example

export interface Env {
  // Example binding to KV Storage
  MY_KV_NAMESPACE: KVNamespace;
  // Example binding to D1 Database
  MY_DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Example: Cache API requests at the edge
    if (url.pathname.startsWith('/api/')) {
      // Check if response is already in cache
      const cacheKey = new Request(request.url, request);
      const cache = caches.default;
      
      let response = await cache.match(cacheKey);
      
      if (!response) {
        // If not in cache, fetch from origin
        response = await fetch(request);
        // Add to cache for future requests
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
      }
      
      return response;
    }
    
    // Example: Handle other requests
    return new Response('Hello from Cloudflare Workers!', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};