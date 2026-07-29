// Anchor paths to this module's directory (the `src/` folder) rather than
// Deno.cwd(). On Deno Deploy the process runs with cwd at the entrypoint dir
// (/app/src), which breaks cwd-relative reads; import.meta.dirname is stable.
export const CWD = import.meta.dirname ?? './src';
