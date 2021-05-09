---
title: Evolution of Frontend Devs
description: "Today the frontend scene is very broad and consist of a range of skills. That means if your main skills are creating a good design with CSS, it doesn't necessarily mean you also can configure webpack to handle Sass files."
slug: evolution-of-frontend-devs
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 01/04/2019
img: evolution-of-frontend-devs/harvey.jpg
alt: 'Harvey from Suits TV Show'
width: 880
height: 495
tags:
  - code
  - nuxt
  - markdown
---
I recently listened to the podcast Shoptalk episode ["Is there a Great Divide"](https://shoptalkshow.com/episodes/346/) about the divide between frontend developers. I was not aware that there was a divide in the first place. The main symptom they discuss is the difference between what a job listing says and what the actual job is.

This inspired me to think about where frontend development is today. I have lately also recently seen a divide, but on another topic, when it comes to use static types and Object Oriented Programming in the frontend. But, let's go back from the start first to see why we are where we are today.

Disclaimer:<br />
This is a gross simplification of the history of the web and data has been cherry picked to fit my narrative. There is probably some facts not mentioned or wrongly described that effects some of my points and I am open to feedback to adjust my views.

## First Gen - World Wide Web Dev
<img
  src="evolution-of-frontend-devs/9407011_31-A5-at-72-dpi.jpg"
  alt="Sir Timothy Berners-Lee in front of a computer"
  width="561"
  height="360"
  style="width: 70%"
/>
<figcaption>source: [Cern](https://cds.cern.ch/record/39437#31)</figcaption>

The information Highway was born at CERN by Tim Beerners-Lee and [released to the public in 1991](https://en.wikipedia.org/wiki/World_Wide_Web). At this point every website was just static webpages directly served from the web servers. Each URL pointed to a specific directory which had an index.html where you also could point to other sources like css files, images, etc. Updating the website meant changing the html file, uploading a new version by ftp and then the users got the new content. After some time the need for a more dynamic experience led to the introduction of [Javascript in 1995 by Brendan Eich](https://en.wikipedia.org/wiki/JavaScript#History) and during the same year [cookies](https://en.wikipedia.org/wiki/HTTP_cookie#History) were introduced by the same state of the art browser at the time: Netscape.

At this point frontend development was not really a known term. Programmers were able to create html files that could be interpreted by a browser to show a document. It was mainly used in research and websites where very informative and non interactive.

## Second Gen - Web 2.0
<img
  src="evolution-of-frontend-devs/gilfoyle.jpg"
  style="width: 70%"
  alt="Gilfoyle from Silicon Valley TV Show"
  width="770"
  height="434"
/>
<figcaption>source: <a href="https://www.techrepublic.com/pictures/our-21-favorite-fictional-techies-from-tv-and-movies/">techrepublic.com</a></figcaption>

> *"I tried to make it slow. I really did. But I'm not Dinesh. It's very difficult for me to do shitty work." - Gilfoyle*

The need for more an even more dynamic experience led [Rasmus Lerdorf to, in 1995, create PHP](https://en.wikipedia.org/wiki/PHP#History) to be able to serve web pages through a template engine. This led to a remarkable creativity boost for web development since you could access a database to tailor the experience of the user and create an html page on the fly.

But the most important interesting part of this time was that a lot of people could set up their own website easily thanks to services like e.g. Angelfire, Geocities, AOL, etc. I think that, the idea that frontend is easy and unimportant was born during this era. The second half of the 90s can be summarized by these gifs that frequently was shown on peoples websites:

<img
  src="evolution-of-frontend-devs/HoHollywoodPicture3800construction.gif"
  alt="Under Contruction GIF"
  width="467"
  height="30"
/>
<img
  src="evolution-of-frontend-devs/ajaj0077lines_bulletsconstruction.gif"
  alt="Under Contruction GIF"
  width="573"
  height="18"
/>
<img
  src="evolution-of-frontend-devs/AtAthens6321underconstruction_lemmings.gif"
  alt="Under Contruction GIF"
  width="600"
  height="32"
/>
<figcaption>source: http://textfiles.com/underconstruction/</figcaption>

<img
  src="evolution-of-frontend-devs/firebar.gif"
  alt="Firebar GIF"
  width="600"
  height="50"
/>
<figcaption>source: <a href="https://web.archive.org/web/20090807121959/http://geocities.com/curt_sigurdsen/ALBUM01.htm)">Internet Archive of Curt Sigurdsen's Geocities Webpage</a></figcaption>

This technology would however enable the environment where internet based business could start to form. And it also led to a specialization between frontend and backend. The frontend developers was mainly focusing on the design of the page through html and css with a small portion of Javascript to enable some dynamic features. And the backend developers would focus on the business logic of the site.

<img
  src="evolution-of-frontend-devs/bubble_burst.jpg"
  alt="WWW bubble burst"
  width="640"
  height="340"
  style="width:70%;"
/>
<figcaption>source: <a href="https://betanews.com/wp-content/uploads/2014/10/bubble_burst.jpg">betanews.com</a></figcaption>

The web gained a lot of traction during the second half of the 90s and got a crazy hype which led to the dot-com bubble which [bursted in 2000](https://en.wikipedia.org/wiki/Dot-com_bubble#Bursting_of_the_bubble). But, the web was not dead. The technology was still great but the expectations had to be realigned closer to the reality of what promises the technology and developers could offer.

During the first decade of 2000 the web became even more dynamic and the term web 2.0 was coined and got popularized by [O'Rilley Media in 2004](https://en.wikipedia.org/wiki/Web_2.0#Web_2.0). The web became a platform for applications and the clients (browsers) started to become richer. Realtime updates of the website became a big feature.

Now frontend development became more complex. A lot of business logic that was previously handled by the server was moved to client side to enable user interaction without the need of a page reload with the use of Ajax calls. There was also a ton of third party integrations that bloated the global scope and the css files grew into biblical proportions. And there were still a lot of differences between browsers which led to [jQuery being born in 2006 by John Resig](https://en.wikipedia.org/wiki/JQuery#History).

<img
  src="evolution-of-frontend-devs/spaghetti.jpeg"
  alt="man with spaghetti"
  width="800"
  height="1200"
  style="width:70%;"
/>
<figcaption>sauce: <a href="https://medium.com/@orsararecipes/garlic-shrimp-with-linguine-recipe-160a2ab633ac">Pasquale Sciarappa</a></figcaption>

> *Leave the gun – take the cannoli. - Clemenza*

By around 2010 web development was a mess, imho. The server and client code was a perfect spaghetti carbonara served a million times a second around the globe. A lot of great developers and organizations started to generalize the solutions they created and shared them with the community which led to the next generation of frontend developers.

## Third Gen - Javascript Dev

<img
  src="evolution-of-frontend-devs/optimize.jpeg"
  alt="hipster boy with mac"
  width="684"
  height="1024"
  style="width:70%;"
/>
<figcaption>source: <a href="https://www.wwdjapan.com/24925">WWD Japan, Photo by Kuba Dabrowski</a></figcaption>

> *"...which made frontend development into it's own domain."*

In 2010 AngularJS and Backbone was released, followed by Ember the next year. This was the start of Web Apps which introduced concepts like MVC which were never used in frontend before. It was also a step back to the first generation of websites with statically served websites, but a leap forward for dynamic websites and rich clients. The result was a totally decoupled frontend and backend which made frontend development into it's own domain. The server didn't need to serve html and became an Restful API for the frontend to consume (However the need for a good SEO score later reversed this decision and introduced server side rendering of the frontend app).

> *"This would later be known as Javascript fatigue to try to keep up with all the new stuff."*

When the frontend was living in it's own world outside the server a lot of tooling was invented to handle the need for a rapid development which led to Grunt, Gulp and Webpack to be introduced. Furthermore NPM became the place to share libraries, where several new solutions would be published every day. This would later be known as Javascript fatigue to try to keep up with all the new stuff.
Javascript as a language grew with a lot of new features. But, all features where not supported by all browsers or not yet finalized which led to the creation of Babel. As a frontend developer in around 2016 you where expected to master these tools and to at least have the knowledge of one of the javascript frameworks out there.

This new frontend development divided the notion of a frontend developer from the previous era. Being proficient in html and css was not enough to get you hired anymore. Now programming skills and knowledge about certain frameworks was what frontend development was all about.

The shift didn't happen over night though. Most companies continued to use their previous server side template based solutions, but slowly started to convert to the new javascript frameworks as they matured. As more and more businesses shifted their tech stack to heavily rely on a Javascript framework, this meant that more and more of their business logic moved to the frontend.

> *"...the biggest migration wave in programming history."*

This is what I identify as the biggest migration wave in programming history. Not only a shift in tech stack, but especially for backend developers migrating to a brand new world. Backend developers that previously only been working on server side code in statically typed compiled languages now found themselves in the dynamic and browser interpreted domain of Javascript. And they were far from happy to find themselves in this country... As Javascript gained traction and popularity so did the frustration which was popularized by the [wat presentation in 2012 by Gary Bernhardt](https://www.destroyallsoftware.com/talks/wat). It's an understatement to say that Javascript as a language did not fit into the expectations of these developers.

## (predicted) Forth Gen - Typescript Dev

<img
  src="evolution-of-frontend-devs/harvey.jpg"
  alt="Harvey from Suits TV Show"
  width="880"
  height="495"
  style="width:70%;"
/>
<figcaption>source: <a href="https://dave.uktv.co.uk/suits/article/dave-calls-harvey-qa/">UKTV</a></figcaption>

There where several attempts to radically improve Javascript with a superset language such as [CoffeeScript, introduced in 2010 by Jeremy Ashkenas](https://en.wikipedia.org/wiki/CoffeeScript), followed by [Dart in 2011](https://en.wikipedia.org/wiki/Dart_(programming_language)#History) and [Elm in 2012](https://en.wikipedia.org/wiki/Elm_(programming_language)#History). These languages were popular, but never gained any mainstream traction.

Class was introduced in ECMAScript 2015 to the delight of objected oriented developers, but was imho, vastly misinterpreted since it was only a syntactic sugar for using the new operator. This however created a big shift in how a lot of Javascript was written, since the former backend developers were used to declare classes when coding. There was already an awkward naming convention in Javascript to use an underscore to mark a method as "private", when in reality it was accessible publicly. This remained a practice even after class was introduced, since it didn't actually change the underlying language.

There was however still a big annoyance with Javascript: The lack of static types. Enter: TypeScript by Microsoft. The first version of [TypeScript was released 2012](https://en.wikipedia.org/wiki/TypeScript#History), but it wasn't until after ECMAScript 2015 and [Angular 2 which was officially released in 2016](https://en.wikipedia.org/wiki/Angular_(web_framework)#Version_2), until it gained some serious traction of the community. Typescript became the standard way of writing Angular apps. Facebook had their own way of doing static type checking in React with Flow, but it never went mainstream and now a lot of development is now done with Typescript. [Vue added Typescript support from version 2](https://vuejs.org/v2/guide/typescript.html) and in their next version will be [written in Typescript and be a first class citizen](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf). The Javascript community embraced Typescript during 2018 and more and more libraries bundled type definitions and wrote their libraries using Typescript.

## The Future of Frontend Development
The web browser is today a synonym to Chrome. The [Browser Wars](https://en.wikipedia.org/wiki/Browser_wars) are over and Chromium is the victor. Microsoft's decision to shift Edge to be Chromium based is a proof that the game has changed. The only odd sheep left on the battlefield is Firefox and Safari, but they can't currently put up a fight.

Google had plans to introduce Dart as a replacement for Javascript in the browser, but [cancelled those plans in 2015](https://techcrunch.com/2015/03/25/google-will-not-integrate-its-dart-programming-language-into-chrome/). During this time Dart was not by any means a popular language and Chrome was still not the dominant browser as it is today. But, today the environment has changed. All the ingredients that wasn't present before is now in place. I predict that during 2019 there will be a first version of Edge and Chrome that supports Typescript native in the browser.

Being a frontend developer in the 2020s will be indistinguishable from a backend developer. The wild wild west of frontend development has an expiration date which will come sooner than we expect. Be prepared for the change.

Sources:
* https://shoptalkshow.com/episodes/346/
* https://en.wikipedia.org/wiki/World_Wide_Web
* https://en.wikipedia.org/wiki/JavaScript#History
* https://en.wikipedia.org/wiki/HTTP_cookie#History
* https://en.wikipedia.org/wiki/PHP#History
* https://en.wikipedia.org/wiki/Dot-com_bubble#Bursting_of_the_bubble
* https://en.wikipedia.org/wiki/Web_2.0#Web_2.0
* https://en.wikipedia.org/wiki/JQuery#History
* https://en.wikipedia.org/wiki/AngularJS
* https://en.wikipedia.org/wiki/Backbone.js
* https://en.wikipedia.org/wiki/Ember.js#History
* https://www.destroyallsoftware.com/talks/wat
* https://en.wikipedia.org/wiki/CoffeeScript
* https://en.wikipedia.org/wiki/Dart_(programming_language)#History
* https://en.wikipedia.org/wiki/Elm_(programming_language)#History
* https://en.wikipedia.org/wiki/TypeScript#History
* https://en.wikipedia.org/wiki/Angular_(web_framework)#Version_2
* https://techcrunch.com/2015/03/25/google-will-not-integrate-its-dart-programming-language-into-chrome/
