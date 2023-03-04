---
title: I spent one week with Zola
description: Isn't Zola basically Hugo, but with Jinja-like templates and written in Rust? Let's find out whether there are any caveats and pitfalls when one tries to use a rather underground static site generator.
draft: true
---

You already know this story: I have been tired of not having a proper blog, so [I started one](2023-02-22-enough.md). I absolutely didn't want to try out anything with a CMS (sorry, WordPress folks!), but rather stick to a minimalistic statically generated site. When it came to choosing a generator, I had a few options I could consider:

- **Jekyll**. I like that it's native to GitHub Pages while also being easy to deploy virtually everywhere. Its Jinja-like Liquid templates are a very good thing, and there are a bajillion of plugins for it, too. Yet, I dislike Ruby a lot because of the slow speed and my inability to make it run properly on my computer.
- **11ty**, **Gatsby**, **Hexo**, **Next.js**, and other JavaScript-based frameworks are off the table for me. I've never worked in an environment as fragile as Node.js. If one comes back to a project a year later, one discovers that nothing works any more. The build speeds aren't the fastest, the template engines are not to my liking, and I really don't want to ship any JavaScript to my readers. 11ty ticks the most boxes for me, but I couldn't really get a hang of it.
- **Hugo** is a go-to choice for many. I mean, half of the blogs I read are Hugo-based. Being non-extensible (as it often is with compiled languages), it is the most mature and feature-rich SSG out there. I have used Hugo to build the previous incarnation of my website and I'll talk about it a bit more further down this article
- **Pelican**
- **Zola**

## Things I like

- Tera
  - similar to Jinja
  - useful filters
- documentation is slightly better than that of Hugo

## Things I miss

- Git integration
- CSS postprocessing
- poor footnote management

## Things I don't miss (but that aren't there)

- date-based navigation

## Verdict

I think I'll migrate back to Hugo
