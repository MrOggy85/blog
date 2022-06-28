---
title: iTerm2 Triggers
description: 'Supercharge your terminal'
slug: perfect-code
date: 22/06/2022
img: iterm2-triggers/pc-with-rainbow.png
alt: 'Code in terminal'
width: 1920
height: 1283
---

> created using [craiyon.com](https://www.craiyon.com/)

<a href="https://www.urbandictionary.com/define.php?term=TIL" target="_blank">TIL</a>
about
<a href="https://iterm2.com/documentation-triggers.html">iTerm2 **Triggers**</a>
which is a super easy way to super charge your terminal. It's a feature that
let's you highlight text, create links and much more!

You can find it in the settings here:
<img
  src="iterm2-triggers/iterm2-trigger-settings.jpg"
  alt="iTerm2 Settings Screenshot"
  width="1846"
  height="1078"
/>

## Highlight IP Address

One thing that I have added is to highligh IP Addresses, which makes it very
easy to distinguish addresses when glancing over a log.

Regular Expression:
`(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}`

<img
  src="iterm2-triggers/ssh_log.jpg"
  alt="High Level Diagram"
  width="1496"
  height="768"
/>

> Look at all those hacker attempts... Now in gold color!

## Link to Jira

Another nice feature is to add a clickable link to the Jira ticket. For example
when you check the git log you can now directly just shift+click and come
directly to the Jira ticket in the browser.

- Regular Expression: `(?i)wf-\d+` (replace "wf" with your Jira project's key)
- Action: `Make Hyperlink`
- Parameters `https://jira.your-company.jp/browse/\0` (replace "your-company"
  with your company's subdomain)

<img
src="iterm2-triggers/hacker.png"
alt="Terminal Hacker"
width="256"
height="256"
/>

> created using [craiyon.com](https://www.craiyon.com/)
