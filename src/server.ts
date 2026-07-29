import { CWD } from './constants.ts';
import { serveDir } from './deps.ts';
import { getAll, getAtom, getJson, getPost, getRss } from './route.ts';

const BASE_URL = Deno.env.get('BASE_URL') || '/';
const STATIC_ROOT = `${CWD}/../static`;

function log(request: Request, status: number) {
	const url = new URL(request.url);
	console.log(`${request.method} ${url.pathname} - ${status}`);
}

function stripBase(pathname: string) {
	if (BASE_URL !== '/' && pathname.startsWith(BASE_URL)) {
		return '/' + pathname.slice(BASE_URL.length).replace(/^\/+/, '');
	}
	return pathname;
}

function initServer() {
	return async function handler(request: Request): Promise<Response> {
		let response: Response;
		try {
			// Static assets first; serveDir returns 404 when nothing matches,
			// in which case we fall through to the routes below.
			const staticRes = await serveDir(request, {
				fsRoot: STATIC_ROOT,
				urlRoot: BASE_URL === '/'
					? ''
					: BASE_URL.replace(/^\/+/, '').replace(/\/+$/, ''),
				quiet: true,
			});
			if (staticRes.status !== 404) {
				const pathname = new URL(request.url).pathname;
				if (!pathname.endsWith('/')) {
					staticRes.headers.set('Cache-Control', 'max-age=604800');
				}
				response = staticRes;
			} else {
				const path = stripBase(new URL(request.url).pathname);
				switch (path) {
					case '/':
						response = await getAll();
						break;
					case '/rss':
						response = await getRss();
						break;
					case '/atom':
						response = await getAtom();
						break;
					case '/json':
						response = await getJson();
						break;
					default:
						response = await getPost(
							decodeURIComponent(path.replace(/^\/+/, '')),
						);
				}
			}
		} catch (err) {
			console.error(err);
			response = new Response('Internal Server Error', { status: 500 });
		}

		log(request, response.status);
		return response;
	};
}

export default initServer;
