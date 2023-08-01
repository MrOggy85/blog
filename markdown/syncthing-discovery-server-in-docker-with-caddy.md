---
title: Syncthing Discovery Server in Docker with Caddy
description: On a journey to discover your own infrastructure
slug: syncthing-discovery-server-in-docker-with-caddy
date: 28/07/2023
img: syncthing-discovery-server-in-docker-with-caddy/discover.jpg
alt: 'big 1700s victorian sailing ship with a captain using binocular, other victorian ships in background, in the style of FAMOUS 19TH-CENTURY painter, impressionist oil painting'
width: 1013
height: 1014
---

## Why run your own Discovery Server?

Short answer: Well, why not? Self hosting! Slightly longer answer: In theory it
could speed up client discovery since you don't need to query the same
instance(s) as everyone else on the planet. And it can also be more secure to
opt out of the global discovery server and only rely on your own server to make
your digital footprint slightly smaller. The official guide can be found
[here](https://docs.syncthing.net/users/stdiscosrv.html). Here is further
reading on the
[security behind the Syncthing infrastructure](https://docs.syncthing.net/users/security.html).

## 1. Run Discovery Server as Docker Container

The docker container can be found in Docker Hub under the
name[syncthing/discosrv](https://hub.docker.com/r/syncthing/discosrv). I am
running it using the following bash script:

```sh
NAME=syncthing-discovery-server
VERSION=1.23.6

docker run \
  --name $NAME \
  -d \
  -p 127.0.0.1:8443:8443 \
  --restart=unless-stopped \
  --network shared_docker-network \
  syncthing/discosrv:$VERSION -http \
```

Note that I am adding this container to a specific network and I am only
exposing the port to localhost. In this network I am also running a caddy server
which will be running a reverse proxy and handling the TLS/HTTPS requests. The
discovery server needs TLS in order to operate securely. Since I am lazy I will
use Caddy to solve this issue for me. All I need to do is to setup an A or CNAME
record which points to my server and Caddy handles the certificates.

## 2. Setup Caddy as Reverse Proxy

As mentioned above, Caddy will handle TLS. The following Caddyfile will reverse
proxy all request with _your.server.com_ to the Syncthing Discover Server
running as a Docker Container in the same Docker network as the
[Caddy Docker Container](../caddy-in-docker-with-common-log). This Caddyfile is
inspired by this old
[Github comment](https://github.com/syncthing/docs/issues/631#issuecomment-814730466).
But, one of the header is outdated now. The new `header_up` line to be used is:
`header_up X-Tls-Client-Cert-Der-Base64 {http.request.tls.client.certificate_der_base64}`.
This is pointed out in a
[newer comment on a PR](https://github.com/caddyserver/caddy/pull/4241#issuecomment-1328171418).
Please see the whole file below

```yaml
your.server.com {
  reverse_proxy syncthing-discovery-server:8443 {
    header_up X-Forwarded-For {http.request.remote.host}
    header_up X-Client-Port {http.request.remote.port}
    header_up X-Tls-Client-Cert-Der-Base64 {http.request.tls.client.certificate_der_base64}
  }

  tls {
    client_auth {
      mode request
    }
  }
}
```

## 3. Point your Syncthing Client to your Discovery Server

Go to `Settings > Connections > Global Discovery Servers` and make a comma and
add the full URL (e.g. https://your.server.com) to your Discovery Server. DONE!

## Notable mention - t4skforce

Before we start, I did not try the docker image
[t4skforce/syncthing-discovery](https://hub.docker.com/r/t4skforce/syncthing-discovery)
([Github(https://github.com/t4skforce/syncthing-discovery)]). This image also
runs the Discovery Server with a reverse proxy, but you still need to provide
the SSL certificate yourself.

## Versions

This writeup was using the following versions for the included software

- Syncthing `1.23.6`
- Caddy `2.6.2`

## Resources

- [Manual](https://docs.syncthing.net/users/stdiscosrv.html)
