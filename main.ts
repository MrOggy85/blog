import initServer from "./server.ts";

const app = initServer();
const PORT = Number(Deno.env.get("PORT")) || 3000;
console.log(`Server is listening on port ${PORT}`);
await app.listen({ port: PORT });
