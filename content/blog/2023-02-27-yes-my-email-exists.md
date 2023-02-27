---
title: Yes, my email exists
description: There are still websites that don't believe that my email address is real. Let's find a way to fix this.

extra:
  mastodon_id: 109936507315701902
---

Ah yes, another day, another outdated website that still doesn't know about .dev domains. At least it doesn't deny me signing up for their services, but it still nags me with ‘Hey, did you mean **me[at]kytta.de**?’

No, I didn't.

I find it hard to understand why the companies care so much about what the emails look like. [Some do not allow me to use plus addressing](https://fosstodon.org/@kytta/109008567103203126), others fail on domain names with more than two components. I understand that one doesn't want to lose a customer just because they made a typo, but I, as a power user, don't make typos!

## So, what's the alternative?

Dear site owners, there is a very simple solution to this problem that is easy to implement and easy to maintain. It consists of two main rules.

### Rule 1. Redefine ‘wrong’.
The issue with most of these websites is that they try to save themselves from spam and/or user errors by forbidding things that are actually legal. To solve this, do the following:

1. Carefully read all the [email falsehoods programmers believe in](https://github.com/kdeldycke/awesome-falsehood#emails).
2. Remove everything that validates the local-part (everything that precedes the last `@` sign).
3. Do the following to validate the domain part:
	1. Ignore comments (such as `foo@(comment)bar.com`) and IP addresses (such as `baz@[192.168.1.1]`)
	2. **Try** resolving the `MX` record of the domain part. Using DNS-over-HTTPS is easier than ever; just make a request to `https://cloudflare-dns.com/dns-query?name=<DOMAIN>&type=MX`
	3. If the `Status` field is `0`, and `Answer` is not empty, **shut up and accept the email**.
	4. Otherwise, display a warning about not being able to resolve the domain name. Place the ‘I am sure it's correct, continue anyway’ button right under it.

That's it! That's the only validation that is reasonable for this task. DNS queries are fast, and you can cache them to minimize request rate. But what should you do if a user makes a typo? What if their e-mail address is on a different server? Well, there comes the second rule…

### Rule 2. It's their responsibility, not ours.
If the user typed the email wrong, it's their concern, not ours. Yes, it's *that* simple. Whatever the user types in the email input field, save it in your database as-is and don't nag about it.

---

Perhaps I am overreacting. Perhaps my solution is not the one that generates the most conversion. But sometimes I wish that the companies would just stop reinventing the wheel and trying to help where their help is not asked for.

*This is post 002 of [#100DaysToOffload](https://100daystooffload.com/).*
