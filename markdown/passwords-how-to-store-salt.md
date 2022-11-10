---
title: Passwords - How to store salt?
description: TI(r)L (Today I really Learned) how (and why) to store salt.
slug: passwords-how-to-store-salt
date: 10/11/2022
img: passwords-how-to-store-salt/salt-fingers.jpeg
alt: fingers with fork picking salt from a bowl
width: 512
height: 512
tags:
  - security
---

This is the
[link](https://security.stackexchange.com/questions/17421/how-to-store-salt) for
the full read.

> TL;DR - You can store the salt in plaintext without any form of obfuscation or
> encryption, but don't just give it out to anyone who wants it.
>
> [Polynomial](https://security.stackexchange.com/a/17435/70970)

The reason we want to salt the password is to make it _harder_ for an attacker
to crack the passwords, **once the DB has been comprimised**. When the password
has been encrypted with the salt, an attacker can't use a
[rainbow table](http://en.wikipedia.org/wiki/Rainbow_table). This means that the
attacker needs to spend a lot of time decrypting the passwords. This gives you
time to detect the breach and reset all the passwords.

Read the full answer [here](https://security.stackexchange.com/a/17435/70970)
for a full technical deep dive.
