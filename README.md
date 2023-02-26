# [www.kytta.dev][site]

This is the source code for [www.kytta.dev][site] as well as all its content.

## Build

**Prerequisites:**

- [Zola], a static site generator
- (optional) [Skyr], a task runner

To build the website, run:

```sh
skyr  # or 'skyr build'
```

This will put the built site in the `public` directory.

To serve the website with livereload, run:

```sh
skyr serve
```

<details>
<summary>How to run scripts without Skyr</summary>

[Skyr] is just a runner for the scripts inside the `script` directory. Instead
of running `skyr`, you can run:

```sh
script/build
```

</details>

## Credits

This blog wouldn't have been possible without the work of these people:

- [Vincent Prouillet](https://www.vincentprouillet.com/) and other [Zola]
  contributors
- [Rasmus Andersson](https://rsms.me/) for creating the [Inter](https://rsms.me/inter/)
  typeface that I use
	- I also took a lot of design inspiration from hiw personal website
- [Kev Quirk](https://kevquirk.com/) for [inspiring me to start a blog](https://startafuckingblog.com/)
- [FrontAid CMS](https://frontaid.io/) for their [Natural Selection](https://github.com/frontaid/natural-selection)
  CSS framework
- [Linus](https://github.com/linuskmr) for teaching me how to use browser's
  dark theme with one line of code

## Licence

© 2023 [Nikita Karamov][site]\
Code licensed under the [ISC License].\
Content licensed under the [CC-BY-SA 4.0].

---

This project is hosted on GitHub:
<https://github.com/kytta/www.git>

[cc-by-sa 4.0]: https://spdx.org/licenses/CC-BY-SA-4.0.html
[isc license]: https://spdx.org/licenses/ISC.html
[site]: https://www.kytta.dev/
[skyr]: https://os.kytta.dev/skyr/
[zola]: https://www.getzola.org/
