import { CWD } from './constants.ts';
import { Application, Context, Router } from './deps.ts';
import initPostsRoutes from './route.ts';

const BASE_URL = Deno.env.get('BASE_URL') || '/';

function logger(ctx: Context) {
	console.log(
		`[${ctx.request.ip}] ${ctx.request.method} ${ctx.request.url} - ${ctx.response.status}`,
	);
}

function initServer() {
	const app = new Application();

	app.use(async (ctx, next) => {
		const root = `${CWD}/../static`;
		const path = ctx.request.url.pathname.replace(BASE_URL, '');

		try {
			if (!path.endsWith('/')) {
				ctx.response.headers.append('Cache-Control', 'max-age=604800');
			}
			const _result = await ctx.send({
				path,
				root,
				index: BASE_URL,
			});
		} catch {
			await next();
		}
	});

	app.addEventListener('error', (evt) => {
		console.error(evt.error);
	});

	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			console.error(err);
			ctx.response.status = 500;
			ctx.response.body = 'Internal Server Error';
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
