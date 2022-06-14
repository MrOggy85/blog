---
title: Photo Blog with NextJS, Deno and Syncthing
description: 'How to create an auto-publishing Photo Blog, powered by Next.js, Deno and Syncthing'
slug: photo-blog-with-nextjs-deno-syncthing
date: 16/05/2021
img: photo-blog-nextjs-deno-syncthing/Photo_Blog.png
alt: 'Homepage Screenshot'
width: 1842
height: 1510
tags:
  - code
  - nuxt
  - markdown
---

## Why build a Photo Blog in 2021?

Nowadays Instagram is the standard for photo blogging. I really don't like
Instagram for a number of reasons including giving my data to the Facebook
algorithm, and the whole idea of sharing with everyone by default. I recently
looked into an open source alternative: [Pixelfed](https://pixelfed.org/) and
tried out running [my own server](https://pixelfed.oskarlindgren.se). It's a
nice service, but to share my photos with my family and friends the barrier of
entry is too high. Another alternative is to run a Ghost blog, which I have
tried. However, posting a new entry with pictures is pretty tedious and I found
myself not posting as much as I wanted.

What I am trying to achieve is pretty simple: Just a website where each page is
an album with pictures of my everyday life that can be viewed by my close family
and friends, _if they want_. And the most important: A very very easy way to
publish new photos and albums.

## Overview

<img
  src="photo-blog-nextjs-deno-syncthing/high-level-diagram.png"
  alt="High Level Diagram"
  width="1320"
  height="796"
/>

Technologies used:

- [Next.js](https://nextjs.org/)
- [Deno](https://deno.land/)
- [Syncthing](https://syncthing.net/)

From an end users perspective there is nothing interesting. Just a website that
connects to an API which serves some images.

From the website admin point of view it gets more interesting. Let's say you
want to upload a new album with some images. Just copy the images on your phone
to the special folder on your phone, wait a couple of seconds and boom! Your new
album has been published! But how does it work?

### Syncthing - Sync Photos

Syncthing is a peer-2-peer file syncing service which doesn't require any
central server like e.g. Dropbox. For this project I have a folder on my server
that is synced with a folder on my smartphone. This can also be synced with
another device if you want to edit/add photos from another device.

### Deno - Serve Photos

Deno is the new kid on the block that will eventually replace Node.js. With deno
I built a simple HTTP server, running in a Docker container, that reads from a
mounted folder called `files`. The endpoint `/list` will return each folder name
that exists in the main folder. The endpoint `/album/:albumName` will list all
the images in the given album folder folder. And finally the endpoint
`/photo/:albumName/:photoName` returns the image.

Look at the [code](https://github.com/MrOggy85/photo-file-server)

### Next.js - Show Photos

Next.js is a JS Framework on top of React and Node.js from Vercel. The website
basically have 2 routes. The index route will list the albums. When clicking on
an album the page will list all the photos in the album.

Look at the [code](https://github.com/MrOggy85/photo-blog)

## Further Automation

To make the deployment easy I am leveraging Vercel to host the frontend and to
auto-deploy on each push to `master`.

I also setup Docker Hub to listen for pushes to `master` and auto-publish a new
Docker image. Currently this flow is semi-automated cause I still need to login
to my server and pull the latest image and restart the container.

## Conclusion

That's it! If you follow these steps you now have a photo blog you can share
with your friends and super easily update with new albumbs and photos.

You can find my photo blog here: https://www2.oskarlindgren.se/photos

Repos

- [Photo File Server repo](https://github.com/MrOggy85/photo-file-server)
- [Photo Blog repo](https://github.com/MrOggy85/photo-blog)
