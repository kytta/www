---
title: I spent one week with Zola
description: I have chosen Zola as my static site generator of choice for this blog, and here, I talk about my experience with it.
date: 2023-03-04T19:59:59+01:00
extra:
  mastodon_id: 109966570964820172
---

You already know this story: I have been tired of not having a proper blog, so [I started one](@/blog/enough.md). I absolutely didn't want to try out anything with a CMS (sorry, WordPress folks!), but rather stick to a minimalistic statically generated site. When it came to choosing a generator, I had a few options I could consider:

- **Jekyll**. I like that it's native to GitHub Pages while also being easy to deploy virtually everywhere. Its Jinja2-like Liquid templates are a very good thing, and there are a bazillion of plugins for it, too. Yet, I dislike Ruby a lot because of the slow speed and my inability to make it run properly on my computer.
- **11ty**, **Gatsby**, **Hexo**, **Next.js**, and other JavaScript-based frameworks are off the table for me. I've never worked in an environment as fragile as Node.js. If one comes back to a project a year later, one discovers that nothing works any more. The build speeds aren't the fastest, the template engines are not to my liking, and I really don't want to ship any JavaScript to my readers. 11ty ticks the most boxes for me, but I couldn't really get a hang of it.
- **Hugo** is a go-to choice for many. I mean, half of the blogs I read are Hugo-based. Being non-extensible (as it often is with compiled languages), it is the most mature and feature-rich SSG out there. I have used Hugo to build the previous incarnation of my website, and I'll talk about it a bit more further down this article
- **Pelican**, **Nikola**, **Cactus**, **Hyde** are all Python-based, which suits me well. However, most of them aren't as feature-complete as the ones I mentioned before. Some do not have any documentation, others don't really have any plugins. I'd be okay with writing some plugins myself, but that would mean I spend less time writing and more time coding.
- **Zola** is a relatively new static site generator. Its idea is similar to Hugo, but it has some differences. It is written with Rust 🦀, which means it's blazing ⚡️ fast 🚀 and memory 🧠 safe 🥽. It also uses its own template engine, Tera, which is pretty much another flavour of Jinja2 / Liquid / Twig / etc.

From this list, I'd go with Hugo, as I like its speed and feature completeness. However, I _really_ dislike Go Templates. I find them quite confusing to use, and I still haven't found an editor with proper support for them. So, I chose Zola.

## A typical Zola workflow

Setting up a Zola project is a very pleasing experience. Run `zola init`, then `zola serve`, and the website is running. Nothing irritating here.

All the pages in Zola live under `content`. Every page should be a Markdown file with a preamble, which needs to have the `title` defined. Pages can be organized into sections, and each section can have its settings for the pages: Their sorting, pagination, RSS feed generation, etc.

Upon creating the first page, Zola will scream at you for not having a `page.html` template. Not very friendly, yet understandable. I wish SSGs generated some default templates to start from, but since most people use themes with their blogs, it doesn't matter that much.

After one has defined their templates and settings, one can start writing posts! Zola includes a very good preview server: It is fast at rebuilding pages and includes livereload for the browser.

## Things I like about Zola

Zola is very minimalistic SSG. Unlike Hugo, it has only a few options and a lot of sane defaults. As mentioned before, I wish there were some example templates for the HTML pages themselves, but they're not too hard to write.

Zola's template engine, [Tera](https://tera.netlify.app/), is basically Jinja2, which I wholeheartedly love. It includes all important Jinja2 features: filters, functions, includes, extends, and macros. Unlike Hugo, Zola doesn't enforce any specific folder structure or naming for basic templates other than `index.html`, `section.html`, and `page.html`, which means I can organize my templates in a very clean manner.

Some Zola's own filters for Tera are also incredibly cool. It took me under 15 minutes to add comments to my blog that are based on the replies I get to the post on Mastodon. Zola makes a request to the Fosstodon API, grabs the replies, and passes each of them to a macro that returns the DOM element. All of this is happening inside templates, which is very cool and somewhat frightening at the same time :D

I like Zola's documentation, but it has its quirks. For example, some concepts that I'd put inside their own documentation pages are hidden away, like [template filters being hidden inside 'Templates/Overview'](https://www.getzola.org/documentation/templates/overview/#built-in-filters). Zola's docs are supposed to have a search function, but [it doesn't work at the moment](https://github.com/getzola/zola/issues/2123). Other than that, it is very clearly written, and I had a better time reading it than I had when reading Hugo documentation.

## Things I'd miss but I don't

I didn't know what to name this section; in it, I talk about things that aren't implemented in Zola (unlike Hugo or Jekyll) but which I don't care about.

One of those things is date-based ordering of pages. For example, a blog post from 3rd of January 2023 would be accessible under `/blog/2023/01/03/hello-world` (or any other combination of pages). Vincent, the core developer of Zola, [doesn't like these 'archive-style' URLs and will not implement those](https://github.com/getzola/zola/issues/635#issuecomment-524564469). I have no problems with either URL style, and I am happy to keep my URLs clean, so I don't really miss this. Yet I understand how critical this may become for someone migrating from Hugo or Jekyll.

Zola also doesn't have any Git integration. In Hugo, one can use Git commit dates to determine the `date` and `updated` properties of a blog post or a sitemap entry. There also isn't a feature request for it, so it may be added in the future, but I don't care about it, so I won't bother asking for it.

## Things I miss

Zola is by no means a finished project (heck, even Hugo isn't), so there are a lot of things that I am missing from it.

The thing that irritates me the most is poor footnote management. [There is an issue](https://github.com/getzola/zola/issues/1285), but it's not Zola's fault, but rather [one of pulldown-cmark](https://github.com/raphlinus/pulldown-cmark/issues/142), the CommonMark parser that Zola uses. Footnotes as they are now look pretty ugly and do not play nicely with RSS readers, which is why I can't post some old posts of mine for the moment.

Another thing I'd really like to have is CSS post-processing. I know, I could run PostCSS over the generated content after running `zola build`, but this would not fix the problem for the preview server, which means I am limited to a very small subset of PostCSS plugins. It would also mean that I would need to regenerate hashes for the SRI, which complicates the process even further. It's not that I write very complicated CSS full of Stage 3 features and Modules and whatnot, but I'd still appreciate being able to use Autoprefixer and CSSO.

Lastly, Zola can't generate both RSS 2.0 and Atom feeds — you have to pick one. I don't think any modern RSS reader would have an issue with Atom feeds, yet I really don't want to give up on compatibility with some clients. [There are workarounds, but there are no plans to implement it officially](https://github.com/getzola/zola/issues/2083).

## An issue with Cloudflare Pages

For a short time, my website was hosted with Cloudflare Pages. I liked it for a few reasons: GitHub integration allowed me to push my code and have it be built automatically, and it supported IPv6 (unlike Vercel). I didn't like having my whole DNS hosted there, but I wasn't ready to switch somewhere else at the moment.

When I migrated to Zola, I tried building the site on Cloudflare, and it kinda worked, but the fun ended there quickly. As it turns out, [Cloudflare's OS images are so old that they do not support new Zola versions](https://community.cloudflare.com/t/cloudflare-pages-zola-build-fails-glibcxx-3-4-26-not-found/316457). Here, 'new' means 'any version released after August 2021'. It's embarrassing beyond belief, and this is why I quickly abandoned Cloudflare for both my DNS (I switched back to deSEC) and my hosting (I migrated to GitHub Pages).

## Verdict

So far, working with Zola has been great. The issue with footnotes is quite annoying, so I might have to learn Rust to fix this myself. At some days, I am thinking of migrating to Hugo or even writing my own SSG, but every time I get those thoughts I just re-read my first post on this blog and this calms me down :)

_This is post 004 of [#100DaysToOffload](https://100daystooffload.com/)._
