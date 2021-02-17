const App = () => {
  let count = 0;

  const handleClick = e => {
    modelClick(e.currentTarget);
  };

  const modelClick = button => {
    count++;
    document.querySelector(".Count").textContent = count;

    if (count === 3) {
      viewBreakPhase1();
    } else if (count === 6) {
      viewBreakPhase2();
    } else if (count === 12) {
      viewBreakPhase3();
    } else if (count === 18) {
      viewBreakPhase4();
    } else if (count === 24) {
      viewBreakPhase5();
    }

    let clicks = 1;

    button.addEventListener("click", () => {
      clicks++;
    });

    viewClickButton();
    viewClickCount();

    setTimeout(() => {
      if (clicks === 1) {
        viewClickHeart();
      }
    }, 300);
  };

  const viewBreakPhase1 = () => {
    const tl = gsap.timeline();

    tl.to("#button #bottom", {
      duration: 1,
      ease: "back.out(4)",
      y: 12 });

  };

  const viewBreakPhase2 = () => {
    const tl = gsap.timeline();

    tl.to("#button #top", {
      duration: 1,
      ease: "back.out(4)",
      y: -12 });

  };

  const viewBreakPhase3 = () => {
    const tl1 = gsap.timeline();

    tl1.to("#button #bottom-1", {
      duration: 1,
      ease: "back.out(4)",
      x: -12,
      y: 4 });


    tl1.to("#button #top-3", {
      duration: 1,
      delay: -0.6,
      ease: "back.out(4)",
      x: 12,
      y: -4 });


    tl1.to("#tail", {
      duration: 1,
      delay: -1,
      ease: "back.out",
      rotate: 180,
      y: 200,
      opacity: 0 });

  };

  const viewBreakPhase4 = () => {
    const tl1 = gsap.timeline();

    tl1.to(".Count", {
      duration: 1,
      opacity: 0 });


    tl1.to(".Heart", {
      duration: 1,
      delay: -0.6,
      x: 58 });


    tl1.to("#button #top-1", {
      duration: 1,
      ease: "back.out",
      x: -12,
      y: -4 });


    tl1.to("#button #bottom-3", {
      duration: 1,
      delay: -0.6,
      ease: "back.out",
      x: 12,
      y: 4 });


    tl1.to("#button #bottom-5", {
      duration: 1,
      delay: -0.6,
      ease: "back.out",
      x: 12,
      y: 4 });


    const tl2 = gsap.timeline({ repeat: -1 });

    tl2.to(".shake1", {
      duration: 0.05,
      rotate: 3,
      transformOrigin: "center" });


    tl2.to(".shake1", {
      duration: 0.05,
      rotate: -3,
      transformOrigin: "center" });


    tl2.to(".shake2", {
      duration: 0.05,
      delay: -0.1,
      rotate: -3,
      transformOrigin: "center" });


    tl2.to(".shake2", {
      duration: 0.05,
      rotate: 3,
      transformOrigin: "center" });

  };

  const viewBreakPhase5 = () => {
    gsap.set("#button", {
      pointerEvents: "none" });


    gsap.to("#heart-base", {
      fill: "#ed4956" });


    gsap.to(".Heart", {
      filter: "none" });


    gsap.to("#heart-shadow-1, #heart-shadow-2", {
      opacity: 0 });


    gsap.to("#button #top-1", {
      duration: 0.6,
      ease: "back.in",
      x: -740,
      y: -720,
      opacity: 0 });


    gsap.to("#button #top-2", {
      duration: 0.6,
      ease: "back.in",
      y: -720,
      opacity: 0 });


    gsap.to("#button #top-3", {
      duration: 0.6,
      ease: "back.in",
      x: -740,
      y: -420,
      opacity: 0 });


    gsap.to("#button #mid-1,  #mid-2, #mid-3", {
      duration: 0.6,
      ease: "back.in",
      x: 740,
      y: 720,
      opacity: 0 });


    gsap.to("#button #bottom-1", {
      duration: 0.6,
      ease: "back.in",
      x: -740,
      y: 720,
      opacity: 0 });


    gsap.to("#button #bottom-2", {
      duration: 0.6,
      ease: "back.in",
      y: 720,
      opacity: 0 });


    gsap.to("#button #bottom-3", {
      duration: 0.6,
      ease: "back.in",
      y: 720,
      opacity: 0 });


    gsap.to("#button #bottom-4", {
      duration: 0.6,
      ease: "back.in",
      x: 440,
      y: 720,
      opacity: 0 });


    gsap.to("#button #bottom-5", {
      duration: 0.6,
      ease: "back.in",
      x: 740,
      y: 720,
      opacity: 0 });


    setInterval(() => {
      viewClickHeart();
    }, 1000);
  };

  const viewClickButton = () => {
    const tl = gsap.timeline();

    tl.to(".Button, .Heart", {
      duration: 0.1,
      ease: "back.out",
      transformOrigin: "center",
      scale: 0.9 });


    tl.to(".Button, .Heart", {
      duration: 0.2,
      ease: "back.out(4)",
      transformOrigin: "center",
      scale: 1 });

  };

  const viewClickHeart = () => {
    const tl = gsap.timeline();

    tl.to(".Heart", {
      duration: 0.2,
      scale: 1.2 });


    tl.to(".Heart", {
      duration: 0.2,
      ease: "back.out",
      scale: 1 });


    tl.to(".Heart", {
      duration: 0.2,
      scale: 1.2 });


    tl.to(".Heart", {
      duration: 0.2,
      ease: "back.out",
      scale: 1 });

  };

  const viewClickCount = () => {
    const tl = gsap.timeline();

    tl.to(".Count", {
      duration: 0.2,
      ease: "back.out",
      scale: 1.2 });


    tl.to(".Count", {
      duration: 0.2,
      ease: "back.out(4)",
      scale: 1 });

  };

  const viewFloat = () => {
    const tl1 = gsap.timeline({ repeat: -1 });

    tl1.to("#button, #tail", {
      duration: 1,
      ease: "power1.inOut",
      y: -18 });


    tl1.to("#button, #tail", {
      duration: 1,
      ease: "power1.inOut",
      y: 0 });


    const tl2 = gsap.timeline({ repeat: -1 });

    tl2.to(".Heart, .Count", {
      duration: 1,
      ease: "power1.inOut",
      y: -6 });


    tl2.to(".Heart, .Count", {
      duration: 1,
      ease: "power1.inOut",
      y: 0 });

  };

  setTimeout(() => {
    viewFloat();
  }, 100);

  return /*#__PURE__*/(
    React.createElement("main", null, /*#__PURE__*/
    React.createElement("div", { className: "Button" }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 1084 728.4" }, /*#__PURE__*/
    React.createElement("g", { id: "tail" }, /*#__PURE__*/
    React.createElement("path", {
      id: "tail-base",
      className: "st0",
      d: "M495.8,483.1h118.5l-38.1,58.7c-10.6,16.3-34.6,16-44.8-0.6L495.8,483.1z" }), /*#__PURE__*/

    React.createElement("path", {
      id: "tail-shadow",
      className: "st1",
      d: "M495.8,483.1l13.2,0l21.8,45.9c1.4,2.8,2.6,5.5,3.8,8.1c3.4,7.1,9.1,13,16.1,16.6h0 c0,0-13.2-0.7-20.4-14.3L495.8,483.1z" })), /*#__PURE__*/



    React.createElement("g", { id: "button", onClick: handleClick }, /*#__PURE__*/
    React.createElement("g", { id: "bottom" }, /*#__PURE__*/
    React.createElement("polygon", {
      id: "bottom-2",
      className: "st0 shake2",
      points: "400.7,275.3 404.8,304.2 373.8,324.1 376.6,359.9 373.8,374.9 393.3,397.9  374.6,416.2 386.3,429.2 376.6,439.9 397.5,470.7 398,483.7 489.1,483.7 505.4,471.6 503.8,441.9 513.4,425.9 500.4,404.9  508.8,362 529.2,344.7 544,298.4 525.9,242.4 477.1,269.2 455.6,258.4 437.3,271.9 422.6,262 \t\t" }), /*#__PURE__*/



    React.createElement("polygon", {
      id: "bottom-3",
      className: "st0 shake1",
      points: "565,356.2 586.7,343.2 587.1,367.9 571.5,396.2 589.3,429.9 575.3,468.2 582.2,475.5  574.4,483.7 486.1,483.7 502.4,471.6 500.8,441.9 510.4,425.9 497.4,404.9 505.8,362 526.2,344.7 \t\t" }), /*#__PURE__*/


    React.createElement("polygon", {
      id: "bottom-4",
      className: "st0 shake2",
      points: "698.1,418 680.1,412.3 675.7,397.5 661.6,393.8 653.6,379.6 634.8,378 630.6,359  613.7,348.4 612.7,327.1 585.7,343.2 586.1,367.9 570.5,396.2 588.3,429.9 574.3,468.2 581.2,475.5 573.4,483.7 676.9,483.7  693.1,477.8 698.3,463.5 708.9,440.6 \t\t" }), /*#__PURE__*/



    React.createElement("path", {
      id: "bottom-5",
      className: "st0 shake1",
      d: "M672.9,483.7l16.2-5.9l5.2-14.3l10.6-22.9L694.1,418l-18-5.7l-4.4-14.8l-14.1-3.6l5.6-23.2 l15,5.2l10-8.5l10,4.7l7.7-8l7.3,3.4l18.1,22.6l19.3-4.3l10.4,13.6l13.3-5.3l9.6,8.7l12.5-7.4l28.8,5.8v22.9 c0,33.1-26.8,59.9-59.9,59.9L672.9,483.7z" }), /*#__PURE__*/



    React.createElement("g", { id: "bottom-1", className: "shake1" }, /*#__PURE__*/
    React.createElement("path", {
      id: "bottom-1-base",
      className: "st0",
      d: "M375,374.9l19.5,23l-18.8,18.3l11.8,13l-9.7,10.8l20.9,30.8l0.5,13h-60 c-34.8,0-63-28.2-63-63v-24.5l19.1-7l8-19.5l26.3,8.2l24-25.3l24.2,7.3L375,374.9z" }), /*#__PURE__*/


    React.createElement("path", {
      id: "bottom-1-shadow",
      className: "st1",
      d: "M294.4,390.6v33.2c0,0-1.4,49.4,55.6,59.8l-10.9,0c-34.8,0-63-28.2-63-63v-24.5 L294.4,390.6z" }))), /*#__PURE__*/




    React.createElement("g", { id: "mid" }, /*#__PURE__*/
    React.createElement("polygon", {
      id: "mid-3",
      className: "st0 shake1",
      points: "796.2,400.2 825.1,405.9 825.1,292 795.1,304.6 776.1,294.1 757.6,304.6 698.7,272.5  714.6,309 707.2,324.7 715.9,341.2 710.6,351.3 715.9,356 711.6,361.3 715.9,369 713.2,372.3 731.3,394.9 750.6,390.6 761,404.2  774.2,398.8 783.8,407.5 \t\t" }), /*#__PURE__*/



    React.createElement("polyline", {
      id: "mid-1",
      className: "st0 shake1",
      points: "577.7,259.2 523.1,246.4 541,302.4 525.9,348.9 564.2,360.7 613.7,331.1 606.5,314.7  620,290.2 601.6,274.8 608.2,254.4 577.7,259.2 \t\t" }), /*#__PURE__*/


    React.createElement("polygon", {
      id: "mid-2",
      className: "st0 shake2",
      points: "659.6,397.8 651.6,383.6 632.8,382 628.6,363 611.7,352.4 610.7,331.1 603.5,314.7  617,290.2 598.6,274.8 605.2,254.4 621.6,223.8 656.7,216.5 660.7,227 707.9,242 700.7,271.5 716.6,308 709.2,323.7 717.9,340.2  712.6,350.3 717.9,355 713.6,360.3 717.9,368 715.2,371.3 707.9,368 700.2,376 690.2,371.3 680.3,379.9 665.2,374.7 \t\t" })), /*#__PURE__*/




    React.createElement("g", { id: "top" }, /*#__PURE__*/
    React.createElement("g", { id: "top-1", className: "shake1" }, /*#__PURE__*/
    React.createElement("path", {
      id: "top-1-base",
      className: "st0",
      d: "M400,269l24.9-24.2l-5-15.5l26.7-6.5l-9.1-12.6l41.9-23.9H340.4c-10.8,0-21.6,2.3-31.2,7.3 c-32.9,16.8-33.1,50.7-33.1,50.7v158.8l19.1-7l8-19.5l26.3,8.2l24-25.3l24.2,7.3l-2.9-35.8l31.1-19.9L400,269z" }), /*#__PURE__*/


    React.createElement("path", {
      id: "top-1-shadow",
      className: "st1",
      d: "M276.1,403.3l0.1-161.1c0,0,4.7-59.4,73.7-55.7c0,0-54.5,12.9-55.5,55.4l-0.1,154.7 L276.1,403.3z" })), /*#__PURE__*/



    React.createElement("path", {
      id: "top-3",
      className: "st0 shake2",
      d: "M624.2,186.4l143.3,0c31.7,0,57.5,25.7,57.5,57.5V294l-30,12.6l-19-10.5l-18.5,10.5l-31.2-17 l-27.6-15.1l7.2-29.5l-47.2-15l-4-10.5l-35.2,7.3l-3.7-10.7l8.3-15.1V186.4" }), /*#__PURE__*/


    React.createElement("polyline", {
      id: "top-2",
      className: "st0 shake1",
      points: "397,269 398.9,282.3 420.7,269 435.5,278.9 453.6,265.4 475.1,276.2 524.1,249.4  578.7,262.2 609.2,257.4 625.6,226.8 621.9,216.1 630.2,201 630.2,186.4 476.3,186.4 434.5,210.3 443.6,222.9 416.9,229.4  421.9,244.9 397,269 \t\t" }))))), /*#__PURE__*/








    React.createElement("div", { className: "Heart" }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 179.8 153.5" }, /*#__PURE__*/
    React.createElement("g", { id: "heart" }, /*#__PURE__*/
    React.createElement("path", {
      id: "heart-base",
      className: "st0",
      d: "M90.2,19.7c0,0,10.7-19.7,40.7-19.7s49,20.7,49,44.7c0,22.5-24,72.2-78.4,105.8 c-6.8,4.2-15.5,4-22.1-0.6C55.7,133.7,1.6,91.4,0.2,44.9c0-1.6,0.1-3.2,0.3-4.9C2,30.3,9.7,0,47.2,0C47.2,0,77.5-1.6,90.2,19.7z" }), /*#__PURE__*/


    React.createElement("path", {
      id: "heart-shadow-1",
      className: "st1",
      d: "M90.2,19.7c0,0,1.2,4.5,1.2,6.3c0,0,3.3-16.6,26.3-24.6C117.7,1.4,100,4.2,90.2,19.7z" }), /*#__PURE__*/

    React.createElement("path", {
      id: "heart-shadow-2",
      className: "st1",
      d: "M65.6,140C63.2,137.9-8.5,85.7,0.8,37.9C2.4,30,9.6,6.3,34.9,1.3c0,0-72.4,41.9,25,130.6 c0.9,0.9,2,1.6,3,2.3L90,153.5c0,0-5.7,0-10.7-3.6L65.6,140z" })))), /*#__PURE__*/






    React.createElement("h1", { className: "Count" }, count)));


};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));