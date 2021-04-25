---
title: Where does "hardcore_einstein" come from?
description: 'Did you ever wonder about how those weird names for docker containers were generated? Probability not, but the more you know!'
slug: /blog/where-does-docker-names-come-from
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 04/10/2019
img: docker_funny.jpg
tags:
  - code
  - nuxt
  - markdown
---

The random name generation comes from this package in the moby repo. There is a list of adjectives and a list of famous scientists and hackers that gets randomly combined to form the names of the docker containers we all have come to love. The combinations are random with one exception of `boring_wozniak` since [*"Steve Wozniak is not boring"*](https://github.com/moby/moby/blob/master/pkg/namesgenerator/names-generator.go#L844) according to the comment.

The list is actively maintained and new scientists are added and also removed. After being accused of sexually abusing trafficking victims, Marvin Minsky was removed along with Richard Stallman that publicly defended his actions.

* related article: https://frightanic.com/computers/docker-default-container-names/
* Image credit: https://www.praqma.com/stories/Deploying-to-kubernetes-as-part-of-a-pipeline/
