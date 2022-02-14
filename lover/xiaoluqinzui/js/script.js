(function () {

  const green = '#62D2A2';
  const pink = '#DD5B82';
  const size = 30;
  const speed = 0.07;

  const shape = [
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]];


  const heartShape = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0]];


  var haveKissed = false;
  var sceneWidth = 800;
  var sceneHeight = 800;



  /*////////////////////////////////////////*/



  var World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composites = Matter.Composites,
  Composite = Matter.Composite,
  Common = Matter.Common,
  Constraint = Matter.Constraint,
  Bounds = Matter.Bounds,
  Engine = Matter.Engine,
  Render = Matter.Render,
  Events = Matter.Events,
  World = Matter.World;


  // create an engine
  var engine = Engine.create();
  engine.enableSleeping = true;

  var world = engine.world;
  Engine.run(engine);

  /*////////////////////////////////////////*/

  var canvas = document.createElement('canvas');
  canvas.width = sceneWidth;
  canvas.height = sceneHeight;

  /*////////////////////////////////////////*/

  var MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse;

  var mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(canvas) });


  var ground = Bodies.rectangle(sceneWidth / 2, sceneHeight + sceneHeight / 2, Math.max(sceneWidth * 4, 2000), sceneHeight, {
    isStatic: true,
    render: {
      opacity: 1,
      fillStyle: '#D7FBE8',
      strokeStyle: '#D7FBE8' } });



  World.add(world, [mouseConstraint, ground]);

  // var walls = [
  //   Bodies.rectangle(-30, 0, 20, sceneHeight * 2, { isStatic: true }),
  //   Bodies.rectangle(sceneWidth * 2 + 30, 0, 20, sceneHeight * 2, { isStatic: true }),
  // ];
  // World.add(world, walls);


  /*////////////////////////////////////////*/

  function connect(c, bodyA, bodyB, constraintOptions) {
    if (bodyA && bodyB) {
      Composite.addConstraint(c, Constraint.create(
      Common.extend({
        bodyA: bodyA,
        bodyB: bodyB },
      constraintOptions)));

    }
  }

  function softSkeleton(xx, yy, matrix, particleRadius, constraintOptions, callback) {

    let c = Composite.create({ label: 'Skeleton' });
    let y = 0;
    let lastRow = null;
    constraintOptions = constraintOptions || { stiffness: 0.95 };

    callback = callback || function (x, y, size) {
      return Bodies.rectangle(x, y, size, size);
    };

    for (let i = 0, len = matrix.length; i < len; i++) {


      //let c = Composite.create({ label: 'Row' + i });
      let row = matrix[i];
      let x = 0;

      for (let j = 0, count = row.length; j < count; j++) {
        if (row[j]) {

          row[j] = callback(
          xx + x * particleRadius,
          yy + y * particleRadius,
          particleRadius,
          i,
          j);


          Composite.addBody(c, row[j]);

          connect(c, row[j - 1], row[j], constraintOptions);

          if (lastRow) {
            connect(c, row[j], lastRow[j], constraintOptions);
            connect(c, row[j], lastRow[j + 1], constraintOptions);
            connect(c, row[j], lastRow[j - 1], constraintOptions);
          }
        }
        x++;
      }

      y++;
      lastRow = row;

    }

    return c;
  };

  /*////////////////////////////////////////*/


  world.gravity.y = 0.25;

  var color = green;

  var width = shape[0].length * size;
  var height = shape.length * size;
  var startY = sceneHeight - shape.length * size - 20;
  var startX = 0; //(sceneWidth/2) - width; //-width/2;

  var boy = softSkeleton(
  startX,
  startY,
  shape,
  size,
  { stiffness: 0.99, render: { visible: false } },
  function (x, y, size, i, j) {

    let s = size * (j < 4 ? 0.8 : 1);
    let c =
    i === 2 && j === 9 ? '#000' : // Eyeball 
    j % 2 !== (i % 2 ? 0 : 1) ? color : '#52C292';


    return Bodies.rectangle(x, y, s, s, {
      render: {
        fillStyle: c,
        strokeStyle: color,
        lineWidth: s * 0.3 } });


  });


  World.add(world, boy);

  /*////////////////////////////////////////*/

  var shape2 = shape.slice(0);
  shape2.map(function (row) {
    return row.reverse();
  });

  color = pink;
  startX = Math.max(width * 2, sceneWidth - width / 2); // - ( arr2[0].length * size );

  var girl = softSkeleton(
  startX,
  startY,
  shape2,
  size,
  { stiffness: 0.9, render: { visible: false } },
  function (x, y, size, i, j) {

    let s = size * (j > 7 ? 0.8 : 1);
    let c = i === 2 && j === 2 ? '#000' : // Eye
    j % 2 !== (i % 2 ? 0 : 1) ? color : '#CD4B72';


    return Bodies.rectangle(x, y, s, s, {
      //mass: 0.6,
      render: {
        fillStyle: c,
        strokeStyle: color,
        lineWidth: s * 0.3 } });


  });


  World.add(world, girl);


  /*////////////////////////////////////////*/
  // Controls

  function onKeyDown(e) {

    //if ( haveKissed ) { return; }

    let key = (e.code || e.key || '').toLowerCase().replace(/^(key|digit|numpad)/, '');
    let target;
    let invert = false;

    let girlTarget = girl.bodies[girl.bodies.length - 4];
    let boy1Target = boy.bodies[boy.bodies.length - 1];

    switch (key) {
      case 'arrowright':
      case 'arrowleft':
        target = girlTarget;
        break;

      case '1':
      case '2':
        target = boy1Target;
        break;}


    switch (key) {
      case 'arrowleft':
      case '1':
        invert = true;
        break;}


    TweenMax.fromTo('[data-key="' + key + '"]', 0.1, {
      backgroundColor: '#eee' },
    {
      backgroundColor: '#ddd',
      repeat: 1,
      yoyo: true });


    if (target) {
      let force = speed * (invert ? -1 : 1);
      if (haveKissed) {force *= 0.2;}
      Body.applyForce(target, target.position, {
        x: force, y: 0 });

    }
  }



  document.body.addEventListener('keydown', onKeyDown);


  function bindKeyButton(el) {

    let key = el.getAttribute('data-key');
    function triggerKey(e) {
      e.preventDefault();
      onKeyDown({ key: key });
    }
    el.addEventListener('mousedown', triggerKey);
    el.addEventListener('touchstart', triggerKey);
  }

  var keys = document.querySelectorAll('[data-key]');
  for (let i = 0; i < keys.length; i++) {
    bindKeyButton(keys[i]);
  }



  /*////////////////////////////////////////*/


  function kiss(x, y) {
    if (!haveKissed) {
      haveKissed = true;

      // Make everyone weightless
      var origGravity = world.gravity.y;

      TweenMax.to(world.gravity, 0.5, {
        y: -0.2,
        ease: Power3.easeIn });



      // Make a heart
      let s = size / 2;
      let width = s * heartShape[0].length;
      let height = heartShape.length * s;
      let c = '#DC3737';
      let heart = softSkeleton(
      x - width * 0.4,
      y - height * 1.75,
      heartShape,
      s,
      { stiffness: 0.7, render: { visible: false } },
      function (x, y, size, i, j) {

        return Bodies.rectangle(x, y, s, s, {
          //frictionAir: -0.2,
          //density: 0.01,
          frictionAir: 0.004,
          //mass: 0.3,
          render: {
            fillStyle: c,
            strokeStyle: c } });


      });

      World.add(world, heart);

      // Check for sleeping heart pieces & remove them
      var bodiesLeft = heart.bodies.length;
      heart.bodies.forEach(body => {
        Events.on(body, 'sleepStart', function (event) {
          var body = this;
          Composite.remove(heart, body);
          bodiesLeft--;
          if (bodiesLeft <= 0) {
            World.remove(world, heart);
            haveKissed = false;
          }
        });
      });

      // Break heart & reset gravity.
      setTimeout(function () {

        var c = Composite.allConstraints(heart);
        c.forEach(constraint => {Composite.remove(heart, c);});

        TweenLite.to(world.gravity, 2, {
          y: origGravity,
          ease: Power3.easeIn,
          onComplete: function () {
            setTimeout(function () {haveKissed = false;}, 4000);
          } });



        setTimeout(function () {

          Body.applyForce(girl.bodies[0], girl.bodies[0].position, {
            x: 0.12, y: 0 });


          Body.applyForce(boy.bodies[0], boy.bodies[0].position, {
            x: -0.09, y: 0 });


        }, 1200);

      }, 3500);

    }
  }

  /*////////////////////////////////////////*/

  // Kiss detection & triggering.

  var kissDetectors = [
  boy.bodies[4],
  girl.bodies[1]];


  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;

    // change object colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];

      if (
      kissDetectors.indexOf(pair.bodyA) > -1 &&
      kissDetectors.indexOf(pair.bodyB) > -1)
      {

        var center = (pair.bodyA.position.x + pair.bodyB.position.x) / 2;

        kiss(center, boy.bodies[0].position.y - size * 2);
      }
    }
  });


  /*////////////////////////////////////////*/

  // Render

  var render = Render.create({
    element: document.body,
    canvas: canvas,
    context: canvas.getContext('2d'),
    engine: engine,
    options: {
      hasBounds: true,
      width: sceneWidth,
      height: sceneHeight,
      //showAngleIndicator: true,
      wireframes: false
      //wireframeBackground: '#ffffff',
    } });

  Render.run(render);

  /*////////////////////////////////////////*/

  // Resizing

  var origBounds = render.bounds;
  var lastScale;
  // world.bounds.min.x = -width/2;
  // world.bounds.min.y = -height;
  // world.bounds.max.x = sceneWidth + width/2;
  // world.bounds.max.y = sceneHeight;


  var mouse = mouseConstraint.mouse;
  var boundsScale = 1;
  var initial = true;

  function ease(current, target, ease) {return current + (target - current) * (ease || 0.2);};

  function resizeRender() {

    requestAnimationFrame(resizeRender);

    var distance = Math.abs(boy.bodies[0].position.x - girl.bodies[0].position.x) + width * 2;
    var boundsScaleTarget = distance / sceneWidth;

    boundsScale = ease(boundsScale, boundsScaleTarget, initial ? 1 : 0.01); //+= scaleFactor;

    // scale the render bounds
    render.bounds.min.x = ease(render.bounds.min.x, Math.min(boy.bodies[0].position.x - width, girl.bodies[0].position.x), initial ? 1 : 0.01);
    render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale;

    render.bounds.min.y = sceneHeight * -0.1 * boundsScale;
    //render.bounds.min.x - (sceneHeight * (1 - boundsScale) * 0.1 );
    render.bounds.max.y = sceneHeight * 0.9 * boundsScale;
    //render.bounds.max.x - (sceneHeight * (1 - boundsScale) * 0.1 );

    // update mouse
    Mouse.setScale(mouse, { x: boundsScale, y: boundsScale }); //boundsScale - boundsScaleTarget);
    Mouse.setOffset(mouse, render.bounds.min);
    initial = false;

  }
  resizeRender();

  document.body.insertBefore(canvas, document.body.firstChild);

  //   Vue.filter('round', function(value){ return Math.round(value * 100) / 100 });
  //   var el = document.createElement('div');
  //   document.body.appendChild(el);

  //   var v = new Vue({
  //     el: el,
  //     template: `
  //       <table>
  //       <tr>
  //         <th>boundsScale</th><td>{{ boundsScale | round }}</td>
  //       </tr>
  //       <template v-for="(bound,key) in bounds">
  // <tr v-for="(val,i) in bound">
  //         <th>{{key}}.{{i}}</th>
  //         <td> {{val | round }}</td>
  //       </tr>
  // </template>
  //       </table>
  //     `,

  //     data: {
  //       bounds: render.bounds,
  //       boundsScale: boundsScale
  //     },

  //     beforeUpdate: function(){
  //       this.boundsScale = boundsScale; 
  //     }
  //   })

})();