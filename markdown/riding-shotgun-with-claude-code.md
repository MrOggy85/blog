---
title: Riding Shotgun with Claude Code
description: Let the agent own the running app, and take the navigator seat
slug: riding-shotgun-with-claude-code
date: 29/07/2026
img: img/riding-shotgun-with-claude.png
alt: 'Riding shotgun with claude bot'
width: 1670
height: 942
---

This is a workflow post. I doubt any of it is novel. But it changed how I work day to day.

tl;dr: **let the agent own the running application, not just the code.**

# The Setup

I run [Claude Code](https://claude.com/product/claude-code) inside a container, using [claude-in-docker](https://github.com/MrOggy85/claude-in-docker). The work itself is usually some kind of webapp: Next.js, TanStack, a plain React SPA, sometimes a GraphQL server on the side.

The habit that changed everything is small: I don't start the dev server in another terminal tab anymore. Claude starts it, in a subshell, and owns the process from then on.

# Every Project Gets a Startup Skill

The first thing I do in a new project is ask Claude to figure out how to start the app, and then to write that down as a skill. After that, starting the app is one slash command.

A `.claude/skills/dev/SKILL.md` with a name, a description, and the actual steps:

```md
- Install dependencies if `node_modules` is missing
- Make sure `.env.local` exists, copy from `.env.example` if not
- Start the dev server in the background and tail the logs
- Report the local URL when it's serving
```

This sounds trivial until you switch between three projects in a week. Every project quietly accumulates startup trivia:

```
Need Node 22.
Run Postgres first, then wait for it.
Copy .env.local.
Run migrations.
Use npm here, pnpm over there.
There's a new env var someone added on Tuesday and didn't document.
```

I tend to forget. That's why every repo has a stale "Getting Started" section. Claude figures it out once, writes it down, and when it breaks it updates the skill instead of updating me. I stop keeping any of it in my head.

# Why the Agent Should Own the Process

Because Claude started the process, it has direct access to the running app and its output. No guessing.

It knows where the logs are, what the port is, what warnings scrolled by during boot, and whether the last change hot-reloaded or silently crashed. When something breaks, it doesn't ask me to paste an error. It reads it. Diagnosing gets cheap.

A concrete loop. I run the start skill:

```
/dev
```

Claude spins up Postgres, notices `.env.local` is missing and copies it from the example, runs migrations, starts the dev server, and reports the URL once it's serving. Then I hand it a ticket:

> The login page throws a 500 when signing in with Google OAuth.

Instead of asking me for logs, it already has them. It traces the failing request, finds the misconfigured redirect URI, fixes it, and I watch the next attempt succeed in the logs it's already tailing. Both of us are looking at behaviour, not just a diff.

# Code Review, Same Trick

![han solo shrug gun](gifs/han_solo_shrug_gun.gif)

Reviewing works the same way, and I get to pick my level of ambition. Sometimes I just have Claude inspect the remote branch and talk me through it. When it matters more, I check the branch out and run it locally so I can poke around myself.

I'm a practical person. I'd rather see what a change implies than reason about it in theory. Running the thing is the shortest path to that.

# You Are the One Without the Keyboard

![Tron Bike Tunnel](gifs/tron_bike_tunnel.gif)

What makes this fun is that it feels less like autocomplete and more like a permanent pair programming session. I'm the one sitting *next* to the person with the keyboard.

That seat is underrated. I stay on architecture, trade-offs, product decisions, and review. The connections between changes, the tradeoff that becomes a problem in three months. The typing is done by a partner who never gets tired.

And unlike real pair programming, there's no cost to switching drivers. Normally handing over the keyboard is friction; here there's no seat to switch. Better still, every instruction I give is also shared context. Telling Claude what to do *is* the handoff. That's the part I underrated at first.

I still write code myself now and then, but it isn't the norm anymore. Sometimes it genuinely would be faster for me to type it, except then I also have to bring Claude up to speed on what I did, which usually takes longer than just telling it what to do in the first place. Killing 2 stones with 1 bird.

# What Doesn't Work

![Bladerunner sit stairs snow](gifs/bladerunner_sit_stairs_snow.gif)

To be fair about it:

- Tests come for free, but Claude still writes ones that subtly assert the wrong thing.
- Documentation comes for free too, and it's usually too verbose.
- I review ~every~ some changes. Sometimes I throw out an implementation entirely and ask for another approach.

None of that is a knock on the workflow. It's just what pair programming is: you review your partner's work. That's the job.

The upside is real, though: I ship better test coverage and better docs than I did alone, because asking for them is no longer the boring tax at the end.

# Keep Sharpening It

![inception spinner](gifs/inception_spinner.gif)

The last piece is that this workflow is never finished. Every time I catch myself repeating an instruction, it goes into a `CLAUDE.md`. The user-level one if it's about how I like to work, the project-level one if it's about this codebase.

The `CLAUDE.md`, the skills are the real product of all this. Not any single feature I shipped, but the slowly accumulating description of the developer experience I personally want.

> No revolutionary insight here. Just a setup that made development fun again.
