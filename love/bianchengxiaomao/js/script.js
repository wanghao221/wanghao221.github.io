const titleSpans = document.querySelectorAll(".title span");
const restartBtn = document.getElementById("restart-btn");

const titleAnimation = () => {
	const tl = gsap.timeline();
	tl
		.set(restartBtn, { opacity: 0, visibility: "hidden" })
		.staggerFromTo(
			titleSpans,
			0.5,
			{ opacity: 0, bottom: -80, ease: "back.easeOut" },
			{ opacity: 1, visibility: "visible", bottom: 0, ease: "back.easeOut" },
			0.25
		)
		.to(restartBtn, 0.5, { opacity: 1, visibility: "visible" });
};

titleAnimation();

restartBtn.addEventListener("click", titleAnimation);
