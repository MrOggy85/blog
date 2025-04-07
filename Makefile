
ENV_ALLOW=NODE_DEBUG,PORT,BASE_URL,NO_COLOR,FORCE_COLOR,TERM

run:
	deno run \
  --watch \
  --allow-net \
  --allow-read \
  --allow-env=$(ENV_ALLOW) \
  	./src/main.ts

check-all:
	$(MAKE) cache-deps
	$(MAKE) format
	$(MAKE) lint
	$(MAKE) typecheck

cache-deps:
	deno cache -r ./src/deps.ts

format:
	deno fmt --check ./src
format-fix:
	deno fmt ./src

lint:
	deno lint ./src

typecheck:
	deno check ./src/main.ts

# When changing deps,
# you need to update the lock file
lockfile-update:
	rm -rf ./deno.lock && \
	deno cache -r src/deps.ts
