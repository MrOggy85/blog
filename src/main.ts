import initServer from './server.ts';

const handler = initServer();
const PORT = Number(Deno.env.get('PORT')) || 4444;

Deno.serve({ port: PORT }, handler);
