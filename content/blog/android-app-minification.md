---
title: Four tips to make your Android app smaller
description: Google HATES ME! I made my app 14 times smaller with this ONE WEIRD TRICK!
date: 2024-04-04T17:18:00+02:00
draft: true
---

Unless you are not an experienced Android developer with years of experience (I sure am not), your Android app is probably based on whatever Android Studio has generated for you when you clicked 'New Project'. And while it's a fine starting point, it makes your app unnecessarily large. And yes, with Big Tech behemoth apps being hundreds of mebibytes big, 5 MiB might not seem like a big deal. But what if I tell you that you can reduce this size more than 10-fold?

Back in 2018, me and a few classmates of mine have made [a small Android game](https://play.google.com/store/apps/details?id=ru.karamoff.kawan_kawan.arithmaster). This year, I had to re-target it to API Level 34 for it to remain on the Play Store. I have also applied some suggested fixes before I noticed that the app size went up. What was 1.17 MiB has become 2.24 MiB, almost double the size!

After having published that version, I began to wonder if it was possible to strip out unused stuff from the app. And, to my pleasure, yes, and by a lot! I have reduced my app's APK size all the way down to 206 KiB, which is over 11 times smaller, without compromising any of the functionality. Lo and behold: Tricks to reducing your APK size that Google does not want you to know:

## Remove AppCompat and AndroidX.legacy

If your app's minimum SDK version is 21 (Lollipop) or higher, you don't need AppCompat or Jetpack Legacy (`androidx.legacy`). Instead of `AppCompatActivity`, use `Activity`, and so on. All conversions are pretty straightforward, but it will save you a lot of space.

In my game, I have only had to replace the `Activity` and `Resources` classes. This has shaved off around 200 KiB off the APK size.

<!-- 2.200.107 -> 2.011.820 -->

**Reduction:** 2.10 MiB → 1.92 MiB

This might not seem like a lot, until…

## Remove Material Design

This sounds counter-intuitive, but you might _not_ need `com.google.android.material` in your app. A lot of controls and elements your app uses are already built into Android itself, and since my game uses custom UI elements, I didn't use anything from the Material library. Based on that, I thought my app did not use any classes from it and removing the line from `build.gradle` would not have any effect…

<!-- 2.011.820 ->  937.184-->

**Reduction:** 2.10 MiB → 915 KiB

Holy smokes! Over 50% savings come from removing a library I was not importing? Now that's interesting. I wonder if we can squeeze more out of it.

## Replace ConstraintLayout with built-in alternatives

`ConstraintLayout` is a pretty nice invention, but it weighs a lot and offers little benefits over using that what's been in Android for ages: `RelativeLayout` and `LinearLayout`. I could rewrite my layouts without much hassle, and for modern apps that mostly consist of lists of elements, there really is no need to rely on something third-party.

<!-- 937.184 -> 246.139-->

**Reduction:** 915 KiB → 240 KiB

Our APK is now almost ten times smaller than what we started with. But we can go even further!

## Use vector (or WebP) app icons

Every time you want to create or update an icon for your app, Android Studio is always giving you PNG files for them. The following optimization has three substeps:

1. **Compress PNGs.** This saves only a handful of bytes.
2. **Use WebP.** WebP is supported in API 14 (lossy) and API 18 (lossless and/or transparent). Using lossless conversion reduced the size to 229 KiB
3. **Use vector drawables.** Starting with API 21, you can completely rely on vector graphics, especially if your icon is relatively simple.

In my case, using just a vector icon resulted in some bugs on older Android versions, so I opted into WebP icons. I have also removed the `round` icon version (which was only used in API 25) and made the default icon the round one.

<!-- 246.139 -> 186.040 -->

**Reduction:** 240 KiB → 182 KiB

And just like that, our app is now just 8% of what it used to be, without having to change much of the code and without sacrificing any functionality.

## Bonus: Use LiteX

Well, my app is quite simple, but what if you need to use other AndroidX libraries, which largely depend on AppCompat? For this, there is Grishka's [LiteX](https://github.com/grishka/litex). It's a fork of some AndroidX libraries without the AppCompat dependency. It's also one of the reasons why the official, feature-complete Mastodon client's APK is barely above 3 MiB.

## Further reading

If you want even more optimization, no matter if it makes sense or not, I recommend you take a look at Jamie Lynch's [ApkGolf](https://github.com/fractalwrench/ApkGolf) project and the accompanying [blog post](https://github.com/fractalwrench/ApkGolf/blob/master/blog/BLOG_POST.md). Their (feature-less) APK currently sits at 678 bytes — can you go lower? :)
