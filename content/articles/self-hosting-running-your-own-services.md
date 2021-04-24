---
title: Self-hosting - running your own services
description: 'Recently I have been on a journey to get rid of my dependency on service providers like Google, Dropbox, Microsoft and others.'
slug: /self-hosting-running-your-own-services
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 31/12/2020
img: self-hosting-running-your-own-services/pexels-brett-sayles-2881229.jpg
tags:
  - code
  - nuxt
  - markdown
---
What put me on this journey is a couple of factors:

* Ownership/Control - owning the service (together with the community)
* Privacy - owning the data
* Learning - opportunity to learn
* Stability - no unexpected changes
* Reliability - the service will not dissapear (Google graveyard...)
* Cost - server cost but no service costs

To host your own services is a really good learning opportunity for server management and security. And as an added bonus you get personal services which is only used by you and your friends.

## How does my server structure look like?

<img src="self-hosting-running-your-own-services/portainer_digitalocean_docker.png" alt="Docker logo" style="width: 70%" />

I have two small virtual servers (1 CPU, 1GB RAM each) on [Digital Ocean](https://www.digitalocean.com/) which costs me 15$/month. And I run all my services with [Docker](https://www.docker.com/) to make most use of each server. Docker also simplifies maintenance drastically since nothing has to be directly installed on the server. And I use [Caddy](https://caddyserver.com/) as a reverse proxy for easy HTTPS/SSL support and super easy configuration compared to nginx. This is how my Caddyfile looks like:

```yaml
oskarlindgren.se {
	redir https://www.oskarlindgren.se{uri}
}

www.oskarlindgren.se {
	root * /usr/share/caddy

	redir /blog /blog/
	reverse_proxy /blog/* http://tech-blog:2368

	redir /photos /photos/
        reverse_proxy /photos/* http://photo-blog:2368

	file_server
}

MASKED.oskarlindgren.se {
	reverse_proxy http://owncloud-docker-server_owncloud_1:8080
}

MASKED.oskarlindgren.se {
	reverse_proxy http://firefly:8080
}

MASKED.oskarlindgren.se {
	reverse_proxy http://freshrss
}

MASKED.oskarlindgren.se {
	reverse_proxy http://fathom:8080
}
```

I also recently added a 300GB volume for 30$/month for additional storage. Primarily to be able to store photos.

Total monthly cost: 45$

This is my price for privacy and learning :)

## What services do I run?

### Email - ~*Mailu*~
Running my own email server may be the most important service I have. The main reason is privacy. The reason you get email for free from Google and others is that they are reading your emails and knows who you are communicating with. I feel that it's a bit creepy. There are some services that offer you privacy, but you have to trust them and you have to rely on their service. The ultimate solution is to run your own email server. It's not super easy but there are multiple projects that give you an easy setup. I use [Mailu](https://mailu.io/) which is a stable email solution.

Update: Even though I ran Mailu without any bigger problems for a while I found it too tedious to tinker with. Especially for sending email. I now switched to [Tutanota](https://tutanota.com/) which is a ery privacy focues email provider based in Germany.

I am still using my own domain, and it was easy to allow wild card aliases which allows me to create email aliases on the fly to have a unique address for each service I signed up for.

### Calendar, Contacts, Documents - *~Owncloud~ Nextcloud*

Update: I recently switched from Owncloud to Nextcloud since Nextcloud comes with batteries included for a personal use.

It's super easy to run [Nextcloud](https://nextcloud.com/) (or [Owncloud](https://owncloud.com/)) and let your phone sync your contacts, calendar and documents from it. And as an extra bonus you can store all your important documents there instead of in Google Drive or Dropbox.

### Blog - ~Ghost~ Nuxt
This blog is running on ~Ghost and hosted on my server~ Vercel powered by Nuxt. The analytics is provided by [Fathom](https://www.fathomhq.com/) which has a Lite version you can use for free.

Update: I decided to use a static site generator instead of Ghost. Ghost is well suited for someone with low technical knowledge, but when you are a developer it becomes a blocker rather than an enabler. I also don't like the fact that it relies on a DB. I want something super fast and simple. I got inspired by [this article from derkizni](https://derkinzi.de/nuxt-jam-stack/) and set up [Nuxt](https://nuxtjs.org/blog/creating-blog-with-nuxt-content) using [@nuxt/content](https://content.nuxtjs.org/).

## ~Homepage~ - *Caddy*

<img src="oskarlindgren_homepage.png" alt="homepage" style="width: 70%;" />
<figcaption>www.oskarlindgren.se</figcaption>

My homepage is just a HTML file and a CSS file. I tried to keep it light, which makes it eligible for the [250kb club](https://250kb.club/). Using Caddy to serve these static files with TLS/SSL support makes it super easy to make changes through sFTP.

Update: I'm still using Caddy as a reverse proxy for all my self hosted services. But, I switched to Vercel for my homepage and other frontend because of the ease of deployment.

### Photos - *PhotoPrism*
I recently started running [PhotoPrism](https://photoprism.app/) to organize and host my photos. It's an alternative to Google Photos and Dropbox which can auto import your photos and organize them based on Tensorflow and analyzing the image metadata.

However, PhotoPrism needs at least 2 CPU cores and is very CPU intensive when ingesting photos so I decided to put it on my local server at home. I tried some lighter services like Piwigo and Lychee, but they where a bit too light when it comes to the features I was looking for.

### RSS Reader - *FreshRSS*
To consume blogs, newsletters, etc I use FreshRSS which is a very simple and light service to keep track of the blogs I like to read. Instead of relying on an external service like Feedly you can just run your own.

### Notes, Files and Passwords - *Syncthing / KeePass*
I have opted out of any central storage of my files by using [Syncthing](https://syncthing.net/). Syncthing let's you sync your files directly to any other device (Note: It doesn't work on iPhone). This is very convenient to:

* backup your mobile photos to your server
* sync documents between phone and laptop
* sync your keepass password file
* sync your ssh keys

For my notes I just have a folder with markdown files (which I view/edit with VSCode). Then I can use [Markor](https://gsantner.net/project/markor.html) on my Android phone to easily view and edit my notes.

Previously I used Lastpass, but I switched to [KeePass](https://keepass.info/) since I don't want to store my passwords with someone else. With KeePass and Syncthing you can achieve the same level of convenience as with Lastpass, but without the risk of your passwords getting leaked in a hack of Lastpass.

## Why do you want to run your own services?
There are a couple of reasons why you want to run your own services.

### Privacy
> *You wouldn't give your front door key to your local store owner, right?*

When you are giving your data to someone else, they will use it for other purposes than yours. It's hard to predict what someone else can find out about you or what they will do to the data once they have it. Normally a service is run to make money for the owner. This means that they will use your data to maximize their profit. If the service chooses to try to improve the service based on your data that could be a net benefit for both of you. However, the service providers purpose is to make you stay, not to help you. They may try to game you into staying or even create a wall garden. If you keep your data to yourself and only share necessary data to specific people you know you will have a safer life.

Real world example: You wouldn't give your front door key to your local store owner, right? Even if it would be convenient if they can go in and leave some groceries in your kitchen, it wouldn't feel safe to let in a stranger in your home unsupervised...

### Ownership
It is very convenient to rely on a service to store and organize your data. But, what happens when the service goes down, or when they decide to shut down completely. When you run your own service you run it for yourself. The purpose is to help yourself to organize your life. You will probably not create any of these solutions from scratch, but rather rely on Open Source and Free Software. These projects are driver by likeminded people that want to solve a problem and to let others use it for free.

Of course you have now traded a dependency of a for-profit to a dependency on an open source service. But, for me I think it's better to be dependent on a free, open source, right to fork service than a paid, proprietary, closed source service.

### Security
> *The probability that you will be a target of a hack is lower than any known service out there.*

When you run a server that is accessible on the internet you will constantly be proned by script kiddies. Just make sure you have [Fail2ban](https://www.fail2ban.org/wiki/index.php/Main_Page) setup and that you don't expose any ports that you don't need to limit attack vectors. The probability that you will be a target of a hack is lower than any known service out there. However the top services out there will probably be way better than you at server security. In the end, as long as you are comfortable with the risk when running your own services and take proper precautions it should be fine.

### Backup
Backup, backup, backup. Even if you rely on a service you should make sure to backup your data regularly. However, when you run your own it's even more important to have backups. Make sure you store the backups in another machine.
