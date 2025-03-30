---
title: Why it’s important to not have repeating passwords
description: I know, I'm guilty — I have been using the same password on various different websites. And this has taught me a lesson. Please, just use Bitwarden or something.
date: 2018-12-18T21:10:28Z
---

Alright, alright, I’m guilty. I have been using the same password on various different websites. It all started in 2012, when I was young and careless and couldn’t wrap my head around the concepts of password generators and 2FA and so on. Almost seven years worth of websites, apps, services I have signed up for — and nearly all of them had the same password.

The password wasn’t strong by any means. It consisted of four letters, that can be derived from my name, and four digits, that can be derived from my date of birth. It was short, memorable, and easy to type, and I never thought about the possibility of breaking it in only two hours.

Only in 2014, after the _Heartbleed_ happened, I started caring, and since then I have been slowly replacing my passwords with generated ones. That was the time when I started using ~~LastPass~~[^dont-use-lastpass] and [1Password](https://1password.com). But still, I wasn’t doing good enough. I only cared about two types of accounts: ones that contained my personal data or payment information (Google, Apple ID, banks, etc.) and ones whose databases have been leaked (because the badge on the password counter disturbed me). As for the simple accounts on forums, services that I didn’t really use or social networks where I had no friends — I didn’t care. There was no confidential data that I wouldn’t want to be stolen — so what gives?

At this moment, I regret thinking this more than ever.

In 2013 a virtualization company called Parallels introduced _Access_ — an astonishing product that meant to bring PC/Mac remote control to a completely new level. I wanted to try it out — so I signed up for a 30-day trial. As you may have guessed, I used the same old password I used for every account back then.

The trial ended, I didn’t have any money or need to buy the product, so I never logged in to my account ever since. My password manager tried to make me change my password, but I didn’t feel the need to. But then something disastrous happened.

My password was stolen.

“So what?” you may ask. “Recover your account, change the password and be it.” But it’s not as easy as you think. As soon as some hacker got my account email and password, they started attempting to log in into my account. To do that, they changed IP addresses one after another. Since Parallels cares a little bit about my security, they can’t log in without me confirming the action via a link in the email. The problem is, they don’t have a limit for those emails.

As of 20:26 UTC on December 18, 2018, I have received 2173 emails asking me to confirm the login attempt. On average, I get a new email every 30 seconds. Most of the attempts come from Indian, Pakistani, Bangladeshi, and Thai IP addresses. The most disturbing part is that if **I** try to log into my account, I don’t get the email asking to confirm my login attempt. If I try to reset the password — the email doesn’t arrive at all. Fun fact: one can only contact support if they are logged in. Or via Twitter, which I, of course, did and got a very informative response:

> Hi. We have already reported this issue to the engineering team and it will be fixed as soon as possible. Please try to reset your password after few hours and check if it works.

After 12 hours, no progress was made, so I contacted them again and got an even more informative response:

> Our engineering team is working on this issue. We will keep you posted once we get an update. We are sorry for the inconvenience.

Oh yeah, they better be sorry for turning my inbox into a god-damn mess. Well, at least I finally pulled myself together and changed the old password on every single website where it was used (there were about 50 of them). Thanks for that, I guess.

_When I finished writing this post, the problem had been resolved. The amount of emails I got remained at 2137. When I logged in, my home country was set to Thailand, so, I guess, they managed to log in after all._

[^dont-use-lastpass]: I have not been using LastPass for quite some time now, and I discourage you from using it as it had quite a bad reputation when it comes to data security.
