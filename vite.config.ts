import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { resolve } from 'node:path';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

const localImages: Record<string, string> = {
  'workbench-eer-diagram_38c179f6.png': 'workbench-eer-diagram.png',
  'workbench-sql-editor_5b15faf0.png': 'workbench-sql-editor.png',
  'mysql-installer-products-windows_81beaa8d.png': 'mysql-installer-products-windows.png',
  'workbench-connection_a11a5504.png': 'workbench-connection.png',
  'workbench-results-grid_bc2bdd03.png': 'workbench-results-grid.png',
};

function vitePluginStorageProxy(): Plugin {
  return {
    name: 'manus-storage-proxy',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/manus-storage', async (request, response) => {
        const key = request.url?.replace(/^\//, '');
        if (!key || !/^[A-Za-z0-9._-]+$/.test(key)) {
          response.writeHead(400, { 'Content-Type': 'text/plain' });
          response.end('Invalid or missing storage key');
          return;
        }
        const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || '').replace(/\/+$/, '');
        const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;
        if (!forgeBaseUrl || !forgeKey) {
          const localFilename = localImages[key];
          if (!localFilename) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Image not found');
            return;
          }
          try {
            const image = await readFile(resolve(process.cwd(), 'public', 'images', localFilename));
            response.writeHead(200, { 'Content-Type': 'image/png', 'Content-Length': image.length, 'Cache-Control': 'public, max-age=3600' });
            response.end(image);
          } catch {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Local image not found');
          }
          return;
        }
        try {
          const forgeUrl = new URL('v1/storage/presign/get', `${forgeBaseUrl}/`);
          forgeUrl.searchParams.set('path', key);
          const forgeResponse = await fetch(forgeUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });
          if (!forgeResponse.ok) {
            response.writeHead(502, { 'Content-Type': 'text/plain' });
            response.end('Storage backend error');
            return;
          }
          const payload = await forgeResponse.json() as { url?: string };
          if (!payload.url) {
            response.writeHead(502, { 'Content-Type': 'text/plain' });
            response.end('Empty signed URL');
            return;
          }
          response.writeHead(307, { Location: payload.url, 'Cache-Control': 'no-store' });
          response.end();
        } catch {
          response.writeHead(502, { 'Content-Type': 'text/plain' });
          response.end('Storage proxy error');
        }
      });
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), vitePluginStorageProxy()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
});
