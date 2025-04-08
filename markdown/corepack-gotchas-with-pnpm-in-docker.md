---
title: Corepack Gotchas with pnpm in Docker
description: Security can sometimes blow up in your face
slug: corepack-gotchas-with-pnpm-in-ocker
date: 08/04/2025
img: img/dev-frustrated-nodejs.jpg
alt: 'Frustrated Developer slapping himself in the face'
width: 256
height: 256
---

While working on a Docker setup for a Node.js project, I ran into a couple of subtle Corepack issues that are worth noting.

# Bypassing the “Corepack is about to download” Prompt

When running corepack inside Docker, it pauses with a prompt asking to download the package manager. Not ideal for automated builds. The fix is simple.
Setting `COREPACK_ENABLE_DOWNLOAD_PROMPT=0` skips the download prompt and keeps things smooth in CI or Docker contexts.

```dockerfile
RUN corepack enable && corepack install --global pnpm@9.8.0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
```

[source](https://github.com/nodejs/corepack/issues/550)

# “Cannot find matching keyid” Error

While installing pnpm, Corepack threw a cryptic error:

```sh
throw new Error(`Cannot find matching keyid: ${JSON.stringify({ signatures, keys })}`);
```

tl;dr: use latest corepack

The signing keys in NPM were rotated and newly signed releases from pnpm caused Corepack to fail verification. In order to fix it you need to use Corepack `>0.31.0` to install and run pnpm without it crashing (due to verify signature failure).

[source](https://stackoverflow.com/questions/79411275/after-heroku-restart-pnpm-error-cannot-find-matching-keyid)

Here is the full error for context:

```sh
/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22688
    throw new Error(`Cannot find matching keyid: ${JSON.stringify({ signatures, keys })}`);
          ^

Error: Cannot find matching keyid: {"signatures":[{"sig":"MEUCIQDI3E/8ZodnpZKAfKTeYe/+IF1wyawkKwK+0AkZodyJ9AIgQnQWC/XFtaz7eGusq5QPkYO0Vb412MsQcqxhadZ8IoA=","keyid":"SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U"}],"keys":[{"expires":null,"keyid":"SHA256:jl3bwswu80PjjokCgh0o2w5c2U4LhQAE57gj9cz1kzA","keytype":"ecdsa-sha2-nistp256","scheme":"ecdsa-sha2-nistp256","key":"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE1Olb3zMAFFxXKHiIkQO5cJ3Yhl5i6UPp+IhuteBJbuHcA5UogKo0EWtlWwW6KSaKoTNEYL7JlCQiVnkhBktUgg=="}]}
    at verifySignature (/usr/local/lib/node_modules/corepack/dist/lib/corepack.cjs:22688:11)
```
