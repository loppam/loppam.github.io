import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import { fileURLToPath, URL } from "node:url";

// Match Vercel's dedicated HTML response for direct /meet visits locally.
function meetHtmlRoute(server) {
  server.middlewares.use((request, _response, next) => {
    const [pathname, query] = (request.url ?? "").split("?");
    if (pathname === "/meet" || pathname === "/meet/") {
      request.url = `/meet/index.html${query ? `?${query}` : ""}`;
    }
    next();
  });
}

export default defineConfig({
  plugins: [react(), {
    name: "meet-html-route",
    configureServer: meetHtmlRoute,
    configurePreviewServer: meetHtmlRoute,
  }],
  base: "/",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        meet: fileURLToPath(new URL("./meet/index.html", import.meta.url)),
      },
    },
  },
});
