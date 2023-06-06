---
title: The UX fail of PWAs in Safari 17
description: I am excited to see PWAs coming to macOS, yet one UX peculiarity of it really bugs me as a macOS user.
date: 2023-06-06T21:07:00+02:00
---

After a hiatus caused by me writing my bachelor's thesis, I have finally got time to blog again. And, would you look at that, WWDC just kicked off! Naturally, I've got thoughts to share.

Let's discuss the boring stuff out of the way first: Vision Pro is gimmicky and creepy, and I didn't even believe the rumours that it would be announced. With that out of the way, let's talk about what got me excited the most: PWAs in Safari on macOS!

Yup, that's how boring I am.

## 'Web apps suck!'

Contrary to what many of the people I know say, I really like the idea. Don't get me wrong: I hate browser-based apps. I want my applications to be native and quick, without tons of JavaScript, and I want them to interact with the system in the most native way possible. But if there is something I hate more than web apps, it's Electron-based web apps. I hate having to run a Chromium instance _and_ a Node.js runtime for _every_ app that uses it. It's a waste of resources and it doesn't make sense. Sandboxing is cool, but various versions of Chromium taking gigabytes on my disk aren't.

Tauri makes the situation better, but it will take a while before major applications will adopt it instead of Electron. Meanwhile, large portions of these apps are available in-browser: Figma, Notion, Slack, etc. So, why not just use the browser versions of the apps? Let's be real: we've lost this war. There is no way web-based 'native' apps will ever die out. But, the introduction of PWAs and lots of new Browser APIs can make the installing and deleting of web apps easier and without requiring lots of space.

## Bad UX of the 'New Apple'

Now, back to Apple. If you're old enough (disclaimer: I'm not), you remember the Apple of the past—when Steve Jobs was still CEO—, and the legends of him personally trying out every product of the company and rebuking the developers and designers for every small inconsistency. These times are long gone; I mean, just _look_ at the System Preferences app from Ventura. The introduction of Catalyst was a big mistake, up to the point where Flutter apps feel more natural than the ones from iPadOS. As Marques Brownlee summed it up very nicely on Hot Ones: Steve Jobs was a product guy, Tim Cook is a supply chain guy.

And yet, even with lowered expectations I have for Apple's new software products, I still can't wrap my head around the simplest usability improvement of PWAs in Safari 17 that was left out. Let's revisit the WWDC keynote:

<figure>
    <blockquote cite="https://developers.apple.com/videos/play/wwdc2023/101/">
        <p>When I click Add, the icon instantly appears in the dock. Now I can close this window in Safari. When I launch my web app, [...]</p>
    </blockquote>
    <figcaption>—Beth Dakin, <cite>WWDC23 Keynote</cite></figcaption>
</figure>

Did you catch it? Now, maybe I'm wrong about this, but if I add a web app to dock, that means that I have made a decision to use it as a standalone app. So, why do I have to then close the tab and re-open the app separately? For me, it makes no sense and breaks my workflow, too.

Chrome (if you enable PWAs) does it correctly: upon installing a web app, it moves the currently open tab to a new window instance of the standalone app, and I can continue working there without losing my data.

Something tells me that the 'good old Apple' and Steve Jobs would not let it slip through, let alone be explicitly shown in a keynote. And this is not that much to ask, either. Think about Quick Look: Have you ever noticed that, when you open a Quick Look preview of a PDF document and then click 'Open in Preview', the Preview window will open _exactly_ at the same spot where the Quick Look one was? Don't rush to check this for yourselves, as they've somehow broken it in the last macOS releases. But this is exactly the continuity and seamlessness that I would expect from Apple and their software. I guess, this has become too much to ask for.

_This is post 006 of [#100DaysToOffload](https://100daystooffload.com/)._
