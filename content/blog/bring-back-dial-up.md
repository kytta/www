---
title: I want the dial-up back
description: TFW you run out of your mobile data for the month.
date: 2022-08-19T18:30:52Z
updated: 2023-02-27T13:04:00+02:00
---

An idea just struck me. What would the world be like, if the computing power kept increasing, but not the Internet speed? Imagine computers that are as quick as ours today, but without dumb usage of resources.

You know, why your desktop apps are slow? Because they each ship a Chromium-based browser AND a server environment with them. For example, the app for Signal is 370 MB. This is a messenger! A good half of its functions are present in any IRC client. Like [ii](https://tools.suckless.org/ii/), which is 12 KB. Or [irssi](https://irssi.org/), which is 1.2 MB. Yes, I understand, you need voice and video chat and message attachments, blah blah blah. Apple Messages and FaceTime together take 20 MB space, and they aren't the lightest apps possible.

Open CNN.com. It transfers almost 2 MB. For a webpage with news. Most of it aren't the pictures, it's the scripts. The websites supply tons of them, because the developers use the first NPM library they stumble upon and push it to your browsers. This is why your browser eats so much RAM: it has to execute all that crap.

Just think about it. Your computers can do so much, but they all feel slow. And the reason to that, I think, is developers writing bad code that takes a lot of space.

And now, imagine a 56 kbit/s connection. Imagine waiting four and a half minutes for CNN to load. This wouldn't be usable! And it wasn't; that's why CNN was way smaller twenty years ago. And it did its job done, which, may I add, _is the same job as it is today_.

Imagine how slow everything would be, had we the dial-up speeds now, and how much more optimized and polished the Internet would be, including the installation files for the apps on your computer. It'd be fun to look at that.

---

Lastly, a **tip for amateur web developers**: Open the Network tab in your DevTools and set up throttling. Set it to ‘Regular/slow 2G’. Turn off the cache. Keep it at that while you develop your website. The whole world will thank you later.
