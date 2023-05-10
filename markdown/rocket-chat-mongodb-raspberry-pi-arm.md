---
title: Rocket.chat and MongoDB (not) on an RPi4
description: Failing to run a chat program on an ARM processor
slug: rocket-chat-mongodb-raspberry-pi-arm
date: 10/05/2023
img: rocket-chat-mongodb-raspberry-pi-arm/rocket.jpeg
alt: 'Rocket.chat and MongoDB (not) on an RPi4 '
width: 1024
height: 1024
---

I tried to install [Rocket.chat](http://Rocket.chat) today but failed/gave up
due to hardware limitations with RPi4 (Raspberry
Pi 4)<sup><a href="#1">[1]</a></sup>. However
[TIL](https://en.wiktionary.org/wiki/TIL) about ARM instruction set (micro
server architecture) in the process.

## First Boss: MongoDb

The problem began when I was trying to get MongoDb running on the RPi4. Not the
latest version, but recent version would not start. After a while I understood
that MongoDb targets a
[minimum instruction set of (`ARMv8.2-A`)](https://github.com/docker-library/mongo/issues/510#issuecomment-970862957)
which is later instruction set than what
[RPi4 implements (`ARMv8-A`)](https://en.wikipedia.org/wiki/Raspberry_Pi#Specifications).
However I could still run a previous version of the major 4 version (`4.2.18`)
which was before the switch (as of writing `6.0.5` is the latest version)
However this solution is not very future proof and probably means that updating
Rocket.chat is limited.

## Second Boss: Rocket.Chat (spoiler alert: Game Over)

After MongoDB was up and running my focus shifted to
[rocket.chat](http://rocket.chat) itself where I ran into the _same_ issue.
There were no support for ARM when running the latest version Rocket.chat. I
thought it was a bit weird since it’s just a node.js program... However there is
a 3 year old half decent instruction to run an older version,
[but it wasn’t working out of the box](https://github.com/RocketChat/Rocket.Chat.Embedded.arm64).
After some searching on their GitHub issues and their website forum I realized
that ARM support was not a priority nor something the core team was interested
in.

## Side Quest: Mini-PC

As a side quest I started looking into mini-pc since I remember a
[comment on hacker news](https://news.ycombinator.com/item?id=35831087) giving a
tip about
[MeLe Quieter3Q](https://store.mele.cn/products/mele-fanless-mini-pc-quieter3q-n5105-windows-11-pro-micro-computer-8gb-ddr4-256gb-rom-small-desktop-computers-for-office-home-dual-hdmi-4k-60hz-bt5-2-wi-fi-6-usb3-0-ethernet-port-vesa-mount)
(intel N5105 processor). It costs `¥35.000`-`¥40.000` which is more than double
the RPi4 (there are cheaper mini-pc but they have a loud fan) but it’s a x86-64
processor which just makes everything so much easier for server development...
What makes this something interesting is that the wattage is supposed to be very
similar to RPi4 which is one of the main reasons I went for the RPi4 as my home
server solution, while also having a virtual (x86-x64) server at Digital Ocean
as my main server.

RPi4 - 5W (idle 3W) source:
[source1](https://www.pidramble.com/wiki/benchmarks/power-consumption),
[source2](https://www.reddit.com/r/homeassistant/comments/li1f8c/pi4_vs_mini_pc/)

Quieter3Q - 11W (idle 3W) source:
[source1](https://www.cnx-software.com/2022/06/03/mele-quieter3q-review-ultra-thin-fanless-mini-pc-tested-with-windows-11-ubuntu-22-04/)

At this very moment I don’t have the need (nor the time #dad) to tinker with a
mini PC but it’s definitely something to note for future needs.

## Footnotes

### 1.

- [arm64 Docker images](https://github.com/RocketChat/Rocket.Chat/issues/27305)
- [Outdated snap packages for armhf and arm64](https://github.com/RocketChat/Rocket.Chat/issues/23722)
