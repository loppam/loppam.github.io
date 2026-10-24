import { defineConfig } from "vite";
import { portfolioHtmlPlugin, portfolioPages, pageHtml } from "./scripts/portfolio-html.mjs";
import { readFile } from "node:fs/promises";
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
  plugins: [react(), portfolioHtmlPlugin(), {
    name: "portfolio-development-html",
    async configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = (request.url ?? "").split("?")[0].replace(/\/$/, "");
        if (!pathname.startsWith("/work/") && !["/writings", "/update"].includes(pathname)) return next();
        try {
          const page = (await portfolioPages()).find(page => page.path === pathname);
          if (!page) return next();
          const template = await readFile(new URL("./index.html", import.meta.url), "utf8");
          response.setHeader("Content-Type", "text/html");
          response.end(await server.transformIndexHtml(pathname, pageHtml(template, page)));
        } catch (error) { next(error); }
      });
    },
    async configurePreviewServer(server) {
      const pages = await portfolioPages();
      server.middlewares.use((request, _response, next) => {
        const [path, query] = (request.url ?? "").split("?");
        if (pages.some(page => page.path === path.replace(/\/$/, ""))) request.url = `${path.replace(/\/$/, "")}/index.html${query ? `?${query}` : ""}`;
        next();
      });
    },
  }, {
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
