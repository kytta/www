---
title: The thing I don’t like about Ruff (and others)
description: How Ruff and uv impact Python’s calm community with the hype culture à la Rust.
date: 2024-03-14T17:28:00+01:00
---

If you're a Python developer, you've probably heard about [Ruff](https://github.com/astral-sh/ruff). A linter for Python written from the ground up in Rust beats all competitors in benchmarks (even with all rules enabled) and amazes everyone with its release cadence. At least one release per month and over 300 releases since its inception in 2022; a new version every two days, on average. "Move fast and fix things", as Charlie Marsh, the lead developer, would say. Not a long time ago, another project by Astral (the owning company) was announced: [uv](https://github.com/astral-sh/uv) is a "cargo for Python", a tool that would replace pip, virtualenv, Hatch, and everything in-between. As with Ruff, uv got very popular very quickly, and now sits at over 8k GitHub stars.

Ruff has its fans and Ruff has its critics. And in this post, I'm not talking about the commonly mentioned issues others have with Ruff, be it [the VC funding](https://mastodon.social/@hynek/111911185144425691), [the unconventional AST parser](https://github.com/astral-sh/ruff/issues/286#issuecomment-1410922635), or [Astral "not giving back to the community"](https://www.youtube.com/watch?v=XzW4-KEB664&pp=ygUMYW50aG9ueSBydWZm). My complaint is less practical and more emotional.

Before 2023, Python community was pretty calm and relaxed. One could even consider it boring: No huge Twitter bubble, no crazy startups, no huge corporations, but just regular people writing good apps and libraries. Despite this "boringness", it was very innovative. You would see the packages people published and be amazed by the ways these developers twist and bend Python to achieve the result they want; things, that are not even imaginable in other languages and runtimes. I am talking Rich and Textualize, Django and FastAPI, Click and Typer, coverage, pre-commit, pytest, structlog — all packages with extremely smart approaches, made by extremely creative developers.

See, I wanted to start this article with "Ruff and uv are all the rage now", but I figured it would be a spoiler, since this phrase alone describes my gripe with stuff that Astral does. Ruff has brought this hype culture that was mostly prevalent amongst JavaScript and/or Rust developers. Why depending on a package, the API of which will barely change through the years, when you can deliver breaking changes every week. Why polish your library to be stable, when everyone incorporates your v0.0.x code into their giant enterprise codebases? And why even stop to think about Python and its performance, when we can rewrite everything in Rust?

The latter is the thing that bothers me even more. Sure, Python and JavaScript are slower than Go and Rust, but when this becomes a problem, it's mostly the fault of the unoptimized code and huge codebases. Take Hatch, for example. The reason it feels faster than other dependency managers is not because it's written in a lower-level language (it isn't!), but because [it uses lazy imports and caching](https://hatch.pypa.io/latest/meta/faq/#fast-cli). And Flake8 or Pylint are not that slow, unless you throw your 1M <abbr title="source lines of code">sloc</abbr> codebase at it.

It's nothing new in the JS world, though. On 9th of November 2023, a co-creator of Prettier put up a US$10,000 bounty for basically re-implementing the notoriously slow Prettier in Rust<!--[^why-rust]-->. Other programming languages were not allowed because Prettier folks think no one would contribute to a tool not written in Rust. To match the theme, [this has been done on Twitter](https://twitter.com/Vjeux/status/1722733472522142022). It was eventually matched and topped up to reach US$22,500. Before the prize pot could be grabbed by Biome, it turned out, that [Prettier can be made 100x faster with parallelism and caching](https://twitter.com/fabiospampinato/status/1724164039624835073). The oldest trick in the book.

Don't get me wrong: I actually like and use built-in-Rust tooling for other languages and runtimes. And I definitely enjoy the performance and the "fresh perspective" of those programs. I just feel like it's "an easy way out", that also brings way too much unnecessary hype with it.

---

While collecting links for this article, I stumbled upon [this post](https://fosstodon.org/@jamescooke/111946315968994054) by James Cooke. He says:

> Regarding Python tooling and Python itself, I can’t stop thinking about how Astral’s business model relies on keeping Python and tools slow, so that their tools stand out. And it’s really stuck in my head.

Now it's stuck in my head, too

<!-- [^why-rust]: Other programming languages were not allowed because Prettier folks think no one would contribute to a tool not written in Rust. -->
