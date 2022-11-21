---
title: Caddy in Docker with Local Time
description: When you want to log in your time zone
slug: caddy-in-docker-with-local-time
date: 21/11/2022
img: caddy-in-docker-with-local-time/flying-whale-container-ship.jpeg
alt: 'Flying whale over container ship'
width: 512
height: 512
---

## Caddy does _not_ ship `tzdata`

Apparently Caddy does not read the `TZ` enviornment variable. See:
https://caddy.community/t/set-timezone-for-caddy-2-official-docker-image/8622

In order to get logs in local time you need to
[build your own image](https://github.com/caddyserver/xcaddy). I started
building my own `Dockerfile` in the blog post:
[Caddy in Docker with common_log](caddy-in-docker-with-common-log). This is what
we need to add in order for `TZ` env var to work:

```dockerfile
RUN apk add --no-cache tzdata
```

Which makes the full `Dockerfile`:

```dockerfile
ARG VERSION=2.6.2

FROM caddy:${VERSION}-builder AS builder

RUN xcaddy build \
  --with github.com/caddyserver/transform-encoder

FROM caddy:${VERSION}

RUN apk add --no-cache tzdata # <-- ADD THIS

COPY --from=builder /usr/bin/caddy /usr/bin/caddy
```

## Forking and modifying `transform-encoder`

_Section spoiler: This was a dead end :)_

I [forked](https://github.com/MrOggy85/transform-encoder) the
`transform-encoder` repo and hardcoded `TimeLocal = True`. I think it was a fun
exercise to write some [Go](https://go.dev/learn/) which I don't do so often. I
could successfully make the change and then tried to build a new caddy image.
However, I ran into an error:

```sh
module declares its path as: github.com/caddyserver/transform-encoder
        but was required as: github.com/MrOggy85/transform-encoder
```

In order to replace the module with your fork you need to write your Dockerfile
using `=` like this:

```dockerfile
RUN xcaddy build \
  --with github.com/caddyserver/transform-encoder=github.com/MrOggy85/transform-encoder@master
```

I was finally able to build a new caddy image, ran it, but no change... Back to
Whoogle and I finally found out what I statated in the beginning of this post,
that you just need to add/install `tzdata`.

## tl;dr

Here is the image if you want to use it right away:

```
docker pull mroggy85/caddy:2.6.2
```

See my Docker Hub Page: https://hub.docker.com/r/mroggy85/caddy
