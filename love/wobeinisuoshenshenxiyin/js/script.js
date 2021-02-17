var heart = document.getElementById("heart");
var magnesium = document.getElementById("magnesium");
var clip = document.getElementById("clip");
var transitionFinished = false;
var tl = new TimelineMax({});

onStarted();

function onStarted() {
  transitionFinished = false;
  tl.set([heart], {
    scaleX: 1,
    scaleY: 1
  }).to(
    [heart],
    0.5,
    {
      scaleX: 0.95,
      scaleY: 0.95,
      ease: Linear.easeNone,
      repeat: -1,
      yoyo: true
    },
    "-=1.9"
  );
  heart.addEventListener("click", bothConnect);
}

function bothConnect() {
  heart.removeEventListener("click", bothConnect);

  if (transitionFinished === true) {
    TweenLite.to("#heart", 0, {
      scale: 1
    });
    tl.set([heart], {
      scaleX: 1.1,
      scaleY: 1.1
    })
      .to([heart], 0.5, {
        scaleX: 1,
        scaleY: 1,
        ease: Elastic.easeOut.config(1, 0.5)
      })
      .to([clip], 0.75, {
        rotation: 20,
        x: 170,
        ease: Elastic.easeOut.config(3, 0.3)
      })
      .to([clip], 0.5, {
        rotation: 0,
        rotation: 0,
        x: 0,
        ease: Elastic.easeOut.config(0.1, 0.3)
      })
      .to([magnesium], 0.5, {
        rotation: 0,
        y: 0,
        onComplete: onStarted
      });
  } else {
    TweenLite.to("#heart", 0, {
      scale: 1
    });
    tl.set([heart], {
      scale: 1.1
    })
      .to([heart], 0.5, {
        scaleX: 1,
        scaleY: 1,
        ease: Elastic.easeOut.config(1, 0.5)
      })
      .to([magnesium], 0.5, {
        rotation: -90,
        y: 80
      })
      .to([clip], 0.75, {
        rotation: -20,
        ease: Elastic.easeOut.config(3, 0.3)
      })
      .to([clip], 0.25, {
        rotation: 0,
        rotation: 0,
        x: 165,
        ease: Elastic.easeOut.config(0.1, 0.3),
        onComplete: onFinished
      });
  }
}

function onFinished() {
  mayItBeat();
  transitionFinished = true;
  heart.addEventListener("click", bothConnect);
}

function mayItBeat() {
  tl.set([heart], {
    scale: 0.95
  }).to(
    [heart],
    0.5,
    {
      scaleX: 1,
      scaleY: 1,
      ease: Elastic.easeOut.config(1, 0.3),
      repeat: -1,
      yoyo: true
    },
    "-=1.9"
  );
}
