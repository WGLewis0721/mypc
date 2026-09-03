// One-time: fetch the seeded form schemas with an anonymous visitor token (a schema read
// needs no secret — Wix grants implicit visitor access so a site can render its own forms).
// Writes the RAW Form objects to src/data/forms.raw.json; the runtime flattens them with the
// existing toForm() logic, so @wix/auto_sdk_forms_forms (15 MB) never ships.
import { createClient, OAuthStrategy } from "@wix/sdk";
import { forms } from "@wix/forms";
import { writeFileSync } from "node:fs";

const CLIENT_ID = "0063f994-29e1-4532-8c62-e0b8e993d65d"; // appId / public OAuth client id
const FORM_IDS = {
  application: "d3055129-4337-4ba7-bd92-63c68e06fe94",
  contact: "d525a803-41f4-418a-9c8f-02121a65336f",
};

const client = createClient({ modules: { forms }, auth: OAuthStrategy({ clientId: CLIENT_ID }) });

const out = {};
for (const [name, id] of Object.entries(FORM_IDS)) {
  try {
    const raw = await client.forms.getForm(id);
    const form = raw?.form ?? raw;
    out[id] = form;
    console.log(`${name} (${id}): "${form?.name ?? "?"}" — ${form?.fields?.length ?? form?.formFields?.length ?? "?"} fields`);
  } catch (e) {
    console.error(`${name} (${id}): FAILED — ${e?.message || e}`);
    process.exitCode = 1;
  }
}

if (Object.keys(out).length) {
  writeFileSync("src/data/forms.raw.json", JSON.stringify(out, null, 2));
  console.log(`\nwrote src/data/forms.raw.json (${Object.keys(out).length} forms)`);
}
