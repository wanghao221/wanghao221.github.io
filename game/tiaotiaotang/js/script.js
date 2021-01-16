window.addEventListener("load",game);

function game() {
	var root = document.querySelector(":root"),
		main = document.querySelector("main"),
		streakCounter = document.querySelector(".streak"),
		jelloHitbox = document.querySelector(".jello-hitbox"),
		jello = document.querySelector(".jello-hitbox > .jello"),
		boxes = document.querySelectorAll(".boxes > .box"),
		colors = ["red","yellow","green","blue"],
		streak = 0,
		compDur = window.getComputedStyle(root),
		compDurVal = compDur.getPropertyValue("--dur"),
		dur = (compDurVal.substr(0,compDurVal.length - 1) * 1000),
		minDur = dur/2,
		chooseColor = function() {
			return Math.floor(Math.random() / 0.25);
		},
		curColor = chooseColor(),
		prevMatchColor = curColor,
		nextMatchColor = chooseColor(),
		rerun = function() {
			main.classList.remove("run");
			void main.offsetWidth;
			main.classList.add("run");
			root.style.setProperty("--dur",(dur/1000) + "s");
		},
		cycleColor = function() {
			++curColor;
			if (curColor == colors.length) {
				curColor = 0;
			}
			jello.className = "jello " + colors[curColor];
		},
		checkColorMatch = function() {
			if (curColor == nextMatchColor) {
				++streak;
				dur -= 10;
				if (dur < minDur) {
					dur = minDur;
				}
				streakCounter.innerHTML = streak;
			} else {
				streak = 0;
				dur = 2000;
				streakCounter.innerHTML = "";
			}

			prevMatchColor = nextMatchColor;
			nextMatchColor = chooseColor();

			boxes[0].className = "box " + colors[prevMatchColor];
			boxes[1].className = "box " + colors[nextMatchColor];
			
			rerun();
			setTimeout(checkColorMatch,dur);
		};
	
	main.classList.add("run");
	jello.classList.add(colors[curColor]);
	boxes[0].classList.add(colors[prevMatchColor]);
	boxes[1].classList.add(colors[nextMatchColor]);
	
	for (b in boxes) {
		if (b < boxes.length) {
			boxes[b].classList.add(colors[chooseColor()]);
		}	
	}
	
	setTimeout(checkColorMatch,dur);
	
	document.querySelector(".click-area").addEventListener("click",cycleColor);
	document.addEventListener("keydown",function(e) {
		if (e.keyCode == 32) {
			cycleColor();
		}
	});
}