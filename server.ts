import { Application, Context, Router } from "./deps.ts";
import initPostsRoutes from "./route.ts";

function logger(ctx: Context) {
  console.log(
    `[${ctx.request.ip}] ${ctx.request.method} ${ctx.request.url} - ${ctx.response.status}`,
  );
}

function initServer() {
  const app = new Application();

  app.use(async (context, next) => {
    const root = `${Deno.cwd()}/static`;
    try {
      await context.send({
        root,
        index: "/",
      });
    } catch {
      await next();
    }
  });

  app.addEventListener("error", (evt) => {
    console.error(evt.error);
  });

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      ctx.response.body = "Internal Server Error";
    } finally {
      logger(ctx);
    }
  });

  const router = new Router();
  initPostsRoutes(router);

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

export default initServer;
