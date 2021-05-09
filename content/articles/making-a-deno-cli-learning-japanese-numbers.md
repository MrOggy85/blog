---
title: Making a Deno CLI - Learning Japanese Numbers
description: 'I have been following the evolution of Deno since I first heard about it. I really like node.js and I was playing around with it when it since it was released. '
slug: making-a-deno-cli-learning-japanese-numbers
short: How to build a SEO optimized, static file blog with nuxtjs and markdown files. Including a sitemap.xml and catagory or tag pages.
date: 27/07/2020
img: japanese_numbers_deno.jpg
alt: 'screenshot of running program'
width: 1388
height: 724
tags:
  - code
  - nuxt
  - markdown
---
I have been a heavy node user and advocate it for several years now. It's a really empowering tool for frontend devs like me. Node is still really good and there is no immediate reason for switching to Deno if you don't see the problems as presented by the creator, Ryan Dahl:

<div class="fluid-width-video-container">
<div class="fluid-width-video-wrapper">
<iframe src="https://www.youtube-nocookie.com/embed/M3BM9TB-8yA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" name="fitvid0"
style="height: 300px; width: 100%;"
>
</iframe>
</div>
</div>

> *“With Deno you get TypeScript as a first class citizen”*

Since around 1,5 years ago I have been mainly writing code using TypeScript. I was hesitant at first since I didn't think types was needed in Javascript until I started using TypeScript. It really makes writing Javascript Apps a bliss. With Deno you get TypeScript as a first class citizen. No need for any babel or typescript compiler setup. Deno will natively support your code. If you also like typescript and don't like extra setup boilerplate code Deno is for you.

> *“Deno allows you to get your dependencies from anywhere on the web”*

Another reason for using Deno is more of a political one. NPM has grown and are now part of Microsoft. It is a centralized resource which is a part of the centralization of the web we have seen in the recent years. Sure, you can still host your own NPM repository, but by design Node needs to be compatible with NPM. Deno allows you to get your dependencies from anywhere on the web. If that is from Github or somewhere else it's totally up to the you and the community. To be fair, currently most of the libraries are hosted in Github or NPM.

> *“Talk is cheap. Show me the code.” - Linus Torvalds*

That's all about the background of why I like Deno. Let's move on to the code. I wanted to make a simple app where a number was spoken in Japanese and the user would guess the number by typing it directly. Writing a simple script executed in the terminal makes the app very light with no need to create a Web interface or Desktop application. But, I still wanted the TUI to be nice and snappy so that the user can go through a lot of numbers fast.

I chose to go with a REPL approach to make the program continue executing until the user chooses to exit (by ctrl-c). The core of the program is this while loop:

```ts
const buffer = new Uint8Array(1024);

while(true) {
  const input = await Deno.stdin.read(buffer);
  const textRaw = new TextDecoder().decode(buffer.subarray(0, input!));
  const text = textRaw.trim();
  console.log(`you wrote: ${text}`);
}
```

Btw, did I mention that Deno supports top-level async/await?

As you can see in the code above. We are simply (a)waiting for the user to input some text. Then we can decode it and do something with that text. For this app we want to check if the users guess was the expected number. Let's add some more code!

```ts
const nextNumber = Math.round(Math.random() * maxNumber);

const input = await Deno.stdin.read(buffer);
const textRaw = new TextDecoder().decode(buffer.subarray(0, input!));
const text = textRaw.trim();

const numberGuess = Number(text);
const result = numberGuess === nextNumber;

if (result) {
  console.log('You are correct!');
} else {
  console.log(`Incorrect! The correct number is: ${nextNumber}`)
}
```

This will let the user input a guess and then we check against `nextNumber`. However as you can see there is an undeclared variable here: `maxNumber`. This is an input that the user has to give when starting the program to determine what range you want to practice on. Deno makes it easy to read the parameters of a program:

```ts
const maxNumberRaw = Deno.args[0];
const maxNumber = Number(maxNumberRaw);
if (Number.isNaN(maxNumber)) {
  console.log('Please start program like this:');
  console.log('./start.sh MAX_NUMBER');
  Deno.exit(0);
}
```

But, the user is still not hearing any number! Ok, let's add one of the main pieces of the program; Let the machine speak! So, this next part assumes that the user is running a Mac. This can easily be modified to be adapted to Linux and Windows. I am using the program say to do text-to-speech. This comes preinstalled on any Mac. Then we can use the Japanese voice to let the number be spoken in Japanese. To run a command from Deno it's as easy as this:

```ts
function sayNumber(number: string) {
  Deno.run({
    cmd: ['say', '-v', 'Kyoko', number],
  });
}
```

Each string in the array maps to a word written in the terminal. Just be careful since it's async. If you want to make sure that the command you are executing is finished before moving on you need to await it.

Now we can add use this function to let the computer speak the number and the user can guess it. I also added a clear command after each guess to clean up for the next number. And of course some cute bunnies to emote the result to the user.

```ts
//   /) /)     (\\_/)   (\\-/)
//  ( ^.^ )    (>.<)    (='.'=)
// C(") (")   (")_(")   (")-(")o
```

See the full source here.

Happy coding!
