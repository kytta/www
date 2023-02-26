if (matchMedia("screen and (min-width: 992px)").matches) {
	const MIN_SCROLL_Y = 100;
	const MAX_SCROLL_Y = 500;
	const MAX_OPACITY = 0.6;
	const $goUp = document.getElementById("lift-go-up");

	$goUp.addEventListener("click", (_) => {
		window.scrollTo(0, 0);
	});

	const updateScroll = (_) => {
		if (window.scrollY < MIN_SCROLL_Y) {
			$goUp.style.display = "none";
			return;
		} else {
			$goUp.style.display = "initial";
		}

		if (window.scrollY <= MAX_SCROLL_Y) {
			$goUp.style.opacity =
				(MAX_OPACITY * (window.scrollY - MIN_SCROLL_Y)) /
				(MAX_SCROLL_Y - MIN_SCROLL_Y);
			return;
		}

		$goUp.style.opacity = MAX_OPACITY;
	};

	document.addEventListener("scroll", updateScroll);
	updateScroll();
}
