---
title: Caddy in Docker with common_log
description: When you just want a simple log
slug: caddy-in-docker-with-common-log
date: 14/07/2022
img: caddy-in-docker-with-common-log/caddy_in_docker.jpeg
alt: 'Caddy in Docker with common_log'
width: 256
height: 256
---

As of Caddy [v2.5.0](https://github.com/caddyserver/caddy/releases/tag/v2.5.0)
they have _"removed the deprecated `common_log` field from HTTP access logs, and
the `single_field` encoder."_. For me as a casual user of Caddy who mostly just
looks at logs this is inconvenient. I don't use any tools to analyse json files
for automation, maybe I should? However, the good folks at Caddy doesn't leave
us high and dry. _"If you relied on this, you may use the
[`transform encoder plugin`](https://github.com/caddyserver/transform-encoder)
to encode logs in Common Log format."_. But, since I am using Docker the version
of Caddy I pull down from Docker Hub does not have this plugin available...
Enter the builder.

According to
[Caddy's official Docker Hub documentation](https://hub.docker.com/_/caddy/), we
need to create our own
[Dockerfile](https://docs.docker.com/engine/reference/builder/) with the builder
image (`caddy:builder`) and then create our **own** Caddy image.

This is how the Dockerfile looks like:

```dockerfile
ARG VERSION=2.5.2

FROM caddy:${VERSION}-builder AS builder

RUN xcaddy build \
  --with github.com/caddyserver/transform-encoder

FROM caddy:${VERSION}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
```

The magic part is the line:

```
RUN xcaddy build \
  --with github.com/caddyserver/transform-encoder
```

Which pulls the `transform-encoder` plugin and installs it. Then we are
switching to a "normal" Caddy image and just replacing the binary with our
custom built one.

Now you just need to build and run this Dockerfile locally!

![docker whales](caddy-in-docker-with-common-log/container.jpeg)

## Caddyfile

This is the syntax to use it in a
[Caddyfile](https://caddyserver.com/docs/caddyfile/concepts#caddyfile-concepts):

```sh
log {
		format transform "{common_log}"
		output file /var/log/homepage.log
	}
```

# tl;dr

```
docker pull mroggy85/caddy:2.5.2
```

See my Docker Hub Page: https://hub.docker.com/r/mroggy85/caddy
