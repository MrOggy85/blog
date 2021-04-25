---
title: Setup a Private NPM Registry with Verdaccio and Docker
description: "When collaborating on frontend application writing component libraries our companies doesn't always want to share that code with the community (boo!). Using package managers like npm and yarn is really powerful to handle our third party code. When working locally it's easy to use npm link or yarn link for ease of development. Then when we want to use our library with our application we need to provide a repo link with a tag and auth token (ugly and unsafe!). Let's do it proper by publishing our library to our own NPM registry instead! And also get an additional cache layer in case NPM is down..."
slug: /blog/private-npm-registry-with-verdaccio-2-2
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 14/01/2019
img: mi_scusi.png
alt: 'Italian from Euro Trip'
width: 500
height: 274
tags:
  - code
  - nuxt
  - markdown
---

Before moving on. If you don't want to host your own NPM Registry you can just use NPM's own solution for 7$ per user: https://www.npm-enterprise.com/

Still interested? Let's start!

Note: This setup is written for:
```
Ubuntu 18.04
Docker version 18.09.0, build 4d60db4
docker-compose version 1.21.2, build a133471
```
It will probably be compatible with Mac and other Linux distros though.

We will use docker and docker-compose. If you haven't installed them already please download and install them here: https://www.docker.com/get-started

## What is a NPM Registry?
It actually turns out that NPM has a pretty simple structure. You can just roll your own with a Node.js server and a CouchDB instance and follow the instructions from NPM: https://docs.npmjs.com/misc/registry

## A better alternative: Verdaccio
But, who wants to reinvent the wheel if we already have a Ferrari available with minimal setup? Let me introduce you to Verdaccio; "a lightweight private npm proxy registry" which is a pretty damn good description. It's a node.js server with a simple file based db, but you can also configure it to store your packages in a Amazon S3 bucket or Google Cloud Storage.

## Verdaccio with Docker-Compose
We want to run Verdaccio as a docker container for ease of deployment. You can find the latest Dockerfile here. We will use Verdaccio version 3, which is the latest as of writing this blog post. First of, let's create a docker-compose.yml file and fill it with this content:

```docker
version: '3.1'

services:
  verdaccio:
    container_name: 'verdaccio'
    image: verdaccio/verdaccio:3.0.0
    restart: always
    ports:
      - "4873:4873"
    volumes:
      - ./data:/verdaccio/
    networks:
      - docker-network

networks:
  docker-network:
driver: bridge
```

Note that we are mounting a volume called "data". This is where Verdaccio stores packages and users. We want to store this on the host to be able to persist all data when restarting our docker container. Let's create the data folder.

```sh
~$ mkdir data
```

Verdaccio is running inside the Docker Container with it's own user `verdaccio` and usergroup `verdaccio`. You need to give permission to your System's **Network Management** service to make changes in the folder. Let's create the data folder and set the correct permissions.

```sh
~$ sudo chown -R systemd-network data/
```

That's it! Let's fire up this bad boy!

```sh
~$ docker-compose up -d
```

You can now access it on `http://localhost:4873`

## Configuring Verdaccio
The config file `data/conf/config.yaml` holds the configuration.

Docs: https://verdaccio.org/docs/en/configuration

## Basic Usage
Point your npm cli to Verdaccio

```sh
~$ npm set registry http://localhost:4873
```

Add yourself as a user

```sh
~$ npm adduser --registry http://localhost:4873
```
Now you can use npm as usual but everything will be proxied through Verdaccio. Have fun coding!

Full source at Github: https://github.com/MrOggy85/verdaccio-docker
