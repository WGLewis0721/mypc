// Push the server secrets @wix/astro requires (WIX_CLIENT_INSTANCE_ID, WIX_CLIENT_PUBLIC_KEY,
// WIX_CLIENT_SECRET) from your local .env.local into the released Wix environment.
// Run it yourself:  node .gen/push-env.mjs
// Values are read straight from .env.local and handed to `wix env set` — nothing is printed.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const KEYS = ["WIX_CLIENT_INSTANCE_ID", "WIX_CLIENT_PUBLIC_KEY", "WIX_CLIENT_SECRET"];

// minimal dotenv parse: KEY=value, value may be "double quoted" and span multiple lines
function parseEnv(text) {
  const out = {};
  const re = /^([A-Z0-9_]+)=("(?:[^"\\]|\\.|\n)*"|.*)$/gm;
  let m;
  while ((m = re.exec(text))) {
    let v = m[2];
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\n/g, "\n");
    out[m[1]] = v;
  }
  return out;
}

const env = parseEnv(readFileSync(".env.local", "utf8"));
for (const k of KEYS) {
  const v = env[k];
  if (!v) {
    console.error(`SKIP ${k} — not found in .env.local`);
    process.exitCode = 1;
    continue;
  }
  execFileSync("npx", ["--no-install", "@wix/cli@latest", "env", "set", "--key", k, "--value", v], {
    stdio: ["ignore", "ignore", "inherit"],
    shell: process.platform === "win32",
  });
  console.log(`set ${k}`);
}
console.log("done — now: npm run release");
