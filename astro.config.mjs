// @ts-check
import { defineConfig } from 'astro/config';
import wix from "@wix/astro";
import wixPages from "@wix/astro-pages";

import react from "@astrojs/react";
import wixHostingAdapter from "@wix/astro-wix-hosting-adapter";
import tailwindcss from "@tailwindcss/vite";

/**
 * Split node_modules per package. Without this, rollup hoists the whole @wix SDK surface
 * (forms + events + blog + members + sdk + the generated auto_sdk_* clients) into ONE shared
 * island chunk ~11–15 MB. Wix's `app-deployments/.../complete` inlines each built file as
 * base64 in one JSON body and rejects that oversized file with HTTP 413. Per-package chunks
 * keep every file small and the deploy goes through.
 */
function manualChunks(id) {
  if (!id.includes("node_modules")) return;
  const n = id.replace(/\\/g, "/");
  if (n.includes("/@wix/ricos") || n.includes("/wix-rich-content") || n.includes("/prosemirror-") || n.includes("/draft-js/"))
    return "vendor.ricos";
  let m = n.match(/node_modules\/@wix\/auto_sdk_([^/]+)\//);
  if (m) return "wixsdk." + m[1].replace(/[^a-z0-9]+/gi, "-");
  m = n.match(/node_modules\/@wix\/([^/]+)\//);
  if (m) return "wix." + m[1];
  m = n.match(/node_modules\/(react-aria-components|@react-aria|@react-stately|@internationalized|@react-types)\//);
  if (m) return "vendor.react-aria";
  if (n.includes("/node_modules/react-dom/")) return "vendor.react-dom";
  if (n.match(/\/node_modules\/(react|react\/jsx-runtime|scheduler)\//)) return "vendor.react";
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 3000,
      rollupOptions: { output: { manualChunks } },
    },
  },
  integrations: [wix(), wixPages(), react()],
  security: { checkOrigin: false },
  adapter: wixHostingAdapter(),

  image: {
    domains: ["static.wixstatic.com"],
  },

  output: "server",
});
