	//global variables
	bird = new Bird();
	pipe = new Pipe();
	coin = new Coin();
	cloud = new Cloud();

	var pipeInit = [0, 0];
	var score = 0;
	var myBird = document.getElementById("flappy");
	var myCoin = document.getElementById("coin");
	var coinInit = 0;
	var realCoinCount = 0;
	var coinCount = 0;

	var clouds = document.getElementsByClassName("cloud");

	var flyNoise = new Audio("mp3/fly.mp3");
	var collisionNoise = new Audio("mp3/collision.mp3");
	var coinNoise = new Audio("mp3/coin.mp3")
	coinNoise.volume = 0.1;

	function Bird(){
		this.height = 0;
		this.stepSize = -3; //distance traveled per interval

		function move(obj, att, jump){
			y = obj.getAttribute(att);
			y = Number(y) - jump;
			obj.setAttribute(att, y); //falling
		};

		this.vertical = function(jump){
			move(myBird, "cy", jump);
			this.height = this.height + jump; //jumping
		}
	}

	function Cloud(){
		this.stepSize = -3;

		function move(obj, movex){
			r = obj.getAttribute("r");
			x = obj.getAttribute("cx");
			x = Number(x) + movex;
			obj.setAttribute("cx", x);
			
			if (x <= -75 ){
				obj.setAttribute("cx", 100 + 750);
			}

		}

		this.horizontal = function(movex){
			for (i = 0; i < 7; i++)
				move(clouds[i], movex);
		}

	}

	function Coin(){
		this.stepSize = -7;

		function move(obj, att, movex){

			//var coinCount = 0;

			if (coinInit == 0){
				var randnum = Math.floor((Math.random() * 400) + 200);

				y = obj.getAttribute(att);
				y = Number(y) + randnum;
				obj.setAttribute(att, y);

				coinInit++;
			}

			x = obj.getAttribute("cx");
			x = Number(x) - movex;
			obj.setAttribute("cx", x);

			if (keepCoinCount(myBird, myCoin)){
				myCoin.style.display = "none";
				coinCount = 1;
				coinNoise.play();	
			}

			if (x <= 45){
				realCoinCount += coinCount;
				coinCount = 0;
				document.getElementById("coinNum").innerHTML = "Coins: " + realCoinCount;
			}

			if (x == -50){
				obj.setAttribute("cx", 1000);
				obj.setAttribute(att, 0);
				myCoin.style.display = "inline";
				coinInit = 0;
			}
		}

		this.horizontal = function(movex){ 
			move(myCoin, "cy", 7 )
		}
	}

	
	function keepCoinCount(circleA, circleB) { // Public. Returns true if the SVG circles A and B overlap, false otherwise.
  		var deltaX = circleA.cx.baseVal.value - circleB.cx.baseVal.value;
		var deltaY = circleA.cy.baseVal.value - circleB.cy.baseVal.value;
		var distance = Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) ); // The classic distance-between-two-points formula.
		var radiusA = circleA.r.baseVal.value; // The radius of circle A.
		var radiusB = circleB.r.baseVal.value; // The radius of circle B.
		        
		if (circleA.id == circleB.id) // If true, circleA and circleB are the same circle.
		  return false;
		  
		return distance <= (radiusA + radiusB);
	}; // circlesOverlap()

	function Pipe(){
		var topPipe = document.getElementsByClassName("topPipe");
		var bottomPipe = document.getElementsByClassName("bottomPipe");

		this.height = 0;
		this.stepSize = -5; //x position traveled per interval
		
		function move(topobj, bottomobj, att1, att2, movex, numpipe){
			if (pipeInit[numpipe] == 0){
				var randnum = Math.floor((Math.random() * 300) + 100);
				
				//generates random y pos for top pipe
				y1 = topobj.getAttribute(att1);
				y1 = Number(y1) - randnum;
				topobj.setAttribute(att1, y1); 

				//sets gap from top pipe and sets y pos for bottom pipe
				y2 = bottomobj.getAttribute(att1);
				y2 = Number(y1) + 550;
				bottomobj.setAttribute(att1, y2); 

				//declares top+bottom pipe initialized with random y pos
				pipeInit[numpipe]++;
			}

			//x displacement for top pipe
			x1 = topobj.getAttribute(att2);
			x1 = Number(x1) + movex;
			topobj.setAttribute(att2, x1);

			//x displacement for bottom pipe
			x2 = bottomobj.getAttribute(att2);
			x2 = Number(x2) + movex;
			bottomobj.setAttribute(att2, x2);

			keepScore(x1); //maintains score
			checkCollision(x1, topobj, bottomobj); //checks for collisions between bird + pipe

			 if (x1 == -50){ //pipe position reset when it reaches end of screen
			 	topobj.setAttribute(att1, 100);
			 	topobj.setAttribute(att2, 800);
			 	bottomobj.setAttribute(att1, 100);
			 	bottomobj.setAttribute(att2, 800);

			 	pipeInit[numpipe] = 0; //declares pipe uninitialized
			 }
		}

		this.horizontal = function(movex){ //moves pipes along x
			move(topPipe[0], bottomPipe[0], "y", "x", movex, 0);
			move(topPipe[1], bottomPipe[1], "y", "x", movex, 1);
		}
	}

	function gameover(score){ //displays gameover screen
		collisionNoise.play();	
		document.getElementById("gameOverScreen").style.display="inline";
		document.getElementById("flyScreen").style.display="none";
		document.getElementById("finalscore").innerHTML = "Score: " + score;
		document.getElementById("finalcoins").innerHTML = "Coins: " + realCoinCount;
		var medal = document.getElementById("medal");
		var medalName = document.getElementById("medalType");

		if (score >= 0 && score <= 10){
			medal.style.fill = "#A27A55";
			medalName.innerHTML = "Bronze";
		}
		else if (score >= 11 && score <= 20){
			medal.style.fill = "#CBD3DB";
			medalName.innerHTML = "Silver";		
		}
		clearInterval(animateObj);
	}

	function keepScore(pipePos){ //maintains score
		if (pipePos == 80){
			score++;
			document.getElementById('score').innerHTML = "Score: " + score;
		}
	}

	function checkCollision(pipeXpos, toppipe){ //checks for collisions
		if (pipeXpos < 105 && pipeXpos > 15){
			if (Number(myBird.getAttribute("cy"))-27 < Number(toppipe.getAttribute("y"))+400 || 
				Number(myBird.getAttribute("cy"))+27 > Number(toppipe.getAttribute("y"))+550){
				gameover(score);
			}
		}
	}

	function fly(val){ //moves bird vertically
		flyNoise.play();	
		bird.vertical(val);	
	}

	var singleFrame = function(){
		bird.vertical(bird.stepSize);
		if (bird.height < -300+27){ //checks if bird hits ground
			gameover(score);
		}

		pipe.horizontal(pipe.stepSize);
		coin.horizontal(coin.stepSize);
		cloud.horizontal(cloud.stepSize);
	}
	
	var animateObj = setInterval(singleFrame, 25); //sets intervals

