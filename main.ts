// import initServer from "./server.ts";

// const app = initServer();
const PORT = Number(Deno.env.get("PORT")) || 8080;
// console.log(`Server is listening on port ${PORT}`);
// await app.listen({ port: PORT });

import { serve } from "https://deno.land/std@0.143.0/http/server.ts";

// https://otaku.deno.dev/

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  url.protocol = "https:";
  url.hostname = "otaku.deno.dev";
  url.port = "443";
  return await fetch(url.href, {
    headers: req.headers,
    method: req.method,
    body: req.body,
  });
}

await serve(handler, { port: PORT });
