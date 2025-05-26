---
title: How to find Chromium Snapshot by Version
description: When you want to run an old verson of Chrome
slug: find-which-chromium-version-matches-revision
date: 26/05/2025
img: img/chrome-docker-old.jpg
alt: 'Whale playing with a ball'
width: 512
height: 768
---

NOTE: This article assumes you are using a M-Series MacBook which introduces the issue of running x86/amd software on an ARM based CPU.

When you want to run an old Chromium version on new hardware/OS you may run into some obsticles. First, you need to recreate the environment that this ancient code expects. Then you need to download the source code of Chromium and build it yourself. However, it's a pretty tidus and time consuming process, which is very well documented [here](https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/building_old_revisions.md).

A slightly faster way is to download a snapshot from the official: [chromium-browser-snapshots](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html). This will skip the build step and cut the amount of enviornment setup needed. However, they are sorted by a mysterious number...

## Snapshot = Revision

The "snapshot number" is actually the **revision** number. So the challenge becomes: _How can I find out the revision number of the specific chrome version I am looking for?_ This requires you to go through the source code where the major version corresponds to a tag which can lead you to a commit, which message has the revision number! Let the treasure hunt begin!

## Case Study: Find v36

From the [source code](https://chromium.googlesource.com/chromium/src/) find the [Tag](https://chromium.googlesource.com/chromium/src/+refs) that corresponds to the version you are looking for. There are usually a lot of tags for each MAJOR version. Click on one of the tags to see the source code tree at that point in time.

<img
  src="img/chrome-version-blame.jpg"
  alt="Chrome Version Blame"
  width="561"
  height="360"
  style="width: 70%"
/>

Then you navigate to `src/chrome/VERSION`. This file shows you the version of Chrome at this point in time. Now, click "blame" and find the last commit that changed the major version. For this case it was this commit: [b1f8bdb570beade2a212e69bee1ea7340d80838e](https://chromium.googlesource.com/chromium/src/+/b1f8bdb570beade2a212e69bee1ea7340d80838e)

The commit message is where we will find the revision number:

```
36 is the atomic number of krypton.
36 is both the square of 6 and a triangular number...

[...]

R=dharani@google.com, laforge@chromium.org

Review URL: https://codereview.chromium.org/218183002

git-svn-id: svn://svn.chromium.org/chrome/trunk/src@260368 0039d316-1c4b-4281-b951-d872f2087c98
```

What we are looking for is on the last line after _...trunk/src@_: `260368`. This is the revision number! It seems like there is no strict format when it comes to specifying the revision number in the commit so it may look different for different commits. Now we can go to the snapshot folder of the specific architecture we are looking for (e.g. Linux_x64) and search for the revision number and then download the zip file with the chrome binary.


See source code [here](https://github.com/MrOggy85/old-chrome-mac)

## Resources

- https://stackoverflow.com/questions/61274601/how-to-find-out-in-which-chromium-version-a-commit-was-shipped
- https://medium.com/dot-debug/running-chrome-in-a-docker-container-a55e7f4da4a8
