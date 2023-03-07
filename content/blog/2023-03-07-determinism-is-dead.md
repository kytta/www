---
title: What happened to determinism?
description: Determinism is one of the best things about computers and software. Sadly, it's dead :(
extra:
  mastodon_id: 109979081101240915
---

Most things that happen in our day-to-day lives are far from deterministic. We can't predict a coin flip, a stranger's response to a 'Hello', heck, we can't even predict weather conditions.

When I think about computers and software, I imagine a different thing. Computers are beautifully deterministic. There isn't really such a thing as unexplainable bugs or glitches; there is always a reason for a computer's behaviour. You tell them what to do, and they do things.

Except for when they don't.

Recently, when working on my bachelor's thesis, I needed to debug an Android application. The app was proprietary, so the process was rather black-box. Since the developer could've tried to stop people like me, I wanted to hide. I faked my location, established a proxy connection over a different country, but most importantly, I used real devices instead of emulators.

I had two devices with two different Android versions. One of them, a rather modern Samsung, worked flawlessly, but the other one, my old OnePlus 3, had issues connecting. ADB would detect it, but I couldn't transfer any files or install any apps.

ADB didn't provide any useful output, so I went online looking for help. And oh boy was that a journey. The problem that I've had (ADB hangs and doesn't do stuff) had a plethora of solutions, from easy to hard, that worked for some, but not for me. Stack Overflow commenters, Redditors, and bloggers have had very different and sometimes very weird experiences. Here's a list of things that helped:

- unplug the phone and plug it back in
- restart the phone
- restart the ADB server
- restart the computer
- reinstall ADB
- downgrade ADB
- upgrade ADB
- reinstall emulator
- turn USB debugging on and off
- enable 'Verify apps over USB' and 'Verify bytecode for debuggable apps'
- disable 'Verify apps over USB' and 'Verify bytecode for debuggable apps' (yup, there were both)
- run the `installDebug` Gradle task
- run the `clean` Gradle task and try again
- in Android Studio, run 'Invalidate caches and restart…'
- use a different cable (it could be dead, damaged, or too slow)
- use a different USB port
- maybe the phone's USB port is broken
- maybe the computer's USB port is broken
- 'The interference from other USB accessories and HDMI displays _\[sic!]_ is the problem; unplug everything, but the phone, and it will work'

After three hours of hopeless trial and failure (and a full reset), I almost accepted that the USB port in the phone died. And then, at the bottom of a huge SO thread, I found an answer with a single upvote, that could be boiled down to a single phrase: 'Instead of "Charge this Device", use the "Transfer Files" USB mode'. I didn't think this would change anything, since my other devices worked with the 'Charge this Device' mode just fine. Being out of solutions, I decided to try it out. Of course, it worked. The answer has two upvotes now.

This situation made me think about the determinism in the modern software. How can it be, that an error can have _that_ many unique solutions? Why is it that half of the suggested solutions resemble more of a tambourine dance? I mean, a computer will do what you tell it to do. A smartphone will do what you tell it to do. So, what is it that you told them to do?

How did we arrive at this point? The point of bugs, that can't be explained, and fixes, that remind one of black magic. Our software has grown so huge and so complex that we don't have an overview of it any more. Hundreds of thousands of lines of code, modules upon modules, gigabytes after gigabytes. It's no wonder that we see security breaches and vulnerabilities in services like LastPass and software like `sudo` (222k SLOC) and systemd (almost a million SLOC).

This isn't normal, and it's time to stop. I'll never get tired of recommending the lightweight alternatives to the bloatware we're so used to tolerate. Use OpenRC, not systemd; use `doas`, not `sudo`; use [Shareon](https://shareon.js.org/), not AddThis; you get the message ;) And, for the love of God, choose those packages to depend on that do the same.

---

It's pretty depressive to see the software quality decay with each year. If you want to get even more depressed, check out [this incredible post by another Nikita](https://tonsky.me/blog/disenchantment/) that makes regular appearances on that orange website™ and the other orange website™.

_This is post 005 of [#100DaysToOffload](https://100daystooffload.com/)._
