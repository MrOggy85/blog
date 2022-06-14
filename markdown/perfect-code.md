---
title: Perfect Code
description: 'The futile persuit of perfect code in a business application.'
slug: perfect-code
date: 14/06/2022
img: perfect-code/alexander-sinn-KgLtFCgfC28-unsplash.jpeg
alt: 'Code in terminal forming a red heart'
width: 1920
height: 1283
tags:
  - dry
  - wet
---

Code that doesn't need change. Code that stand the test of time. Code that is
generic enough that it will serve _all_ future use cases.

- Why strive for this type of code?

We devs are usually both lazy and perfectionists. If we could only write these
perfect pieces of
<a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself">DRY (Do not Repeat
Yourself)</a> business logic and helper function then we can use them as Lego
blocks going forward. Then we could handle any business requirements, new or
changed, _in theory_.

Having a file with frequent changes is considered a bad thing by a lot of
validation tools. And why is that bad? Because we want to our code to reach a
_stable state_. **Write and forget**. If we need to go back to the same place
and make a change we missed an opportunity the first time to make it right.

- We have now wasted time. _Right_?

However, I think this mindset is not very helpful when writing a business
application. _Why_? Because the **business requirments change all the time**.
The very reason for our code changes. This is nothing new, this is the basis of
the <a href="https://agilemanifesto.org/principles.html">agile methology</a>.
However, the agile mindset is in conflict with the dev mentality and the persuit
of perfect code.

> The reason we code is because we want to achieve something. If we want to
> achieve something different we need to change the code.

We have to embrace the fact that **our code will never be finished**, since the
reason, (business, competition, economy, etc), _is ever-changing_. This is the
essence of
<a href="https://www.agilealliance.org/agile101/12-principles-behind-the-agile-manifesto/">"embrace
change" (2.) from the agile manifesto</a>. Just follow the logic; The reason we
code is because we want to achieve something. If we want to achieve something
different we need to change the code.

> in order to write good code we need to have good communication with business

It all comes down to human communication, something that we devs are naturally
bad at. A lot of us devs came to the field because we like to talk to computers
rather than flimsy meat bags. But, in order to write good code we need to have
good communication with business. The quality of code cannot be soly determined
by looking at the code, you have to also look at the purpose it serves. That's
why code analytics tools can easily lead us astray. They don't take business
requirments into consideration. Good code may smell, but if the reason for the
code frequently change, what do u achieve by "fixing" it?

> Generic code only works if we anticipate business changes.

Writing _specific_ code rather than _generic_ code will help you to quickly
fulfill business requirments. Generic code only works if we anticipate business
changes. While there are many best practices to make generic code it all boils
down to guess-work. To be able to figure out what business wants in the future
is similar to betting. You can take calculated risks with better communications
with business to get a better understanding of upcoming changes.

We are better of if we **concede the notion of perfect code** and instead focus
on easily refactorable, extensible code or even code that can be thrown away.
This goes against programmer culture which glorifies e.g. old Unix programs that
have been around for centuries and doesn't need patches since the are
_considered done_. _Perfect_. The author got it right.

While the persuit for perfect code is admirable and true in some sense, it
doesn't serve us as a guiding light. Instead, focusing on the reason will better
guide our coding decision making. And since the reason is ever changing, your
code needs to change with it.
