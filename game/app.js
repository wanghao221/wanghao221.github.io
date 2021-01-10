const snake = {
  length: 1,
  nodes : [1]
};

snake.init = function(){
  snake.nodes = [1];
  mesh.init();
};

snake.keyDownChooser = (e) => {
  var event = window.event ? window.event : e;
  if(event.keyCode === 37){
    snake.move('left');
  }else if(event.keyCode === 38){
    snake.move('up');
  }else if(event.keyCode === 39){
    snake.move('right');
  }else if(event.keyCode === 40){
    snake.move('down');
  }
}
snake.move = (direction) => {
  if(mesh.mesh[snake.nodes[0]][direction]){
    //Self Collision Case
    if(snake.nodes.indexOf(mesh.mesh[snake.nodes[0]][direction])>-1){
      alert("Self Collision!!! Game Over");
      snake.init();
    }else if(mesh.mesh[mesh.mesh[snake.nodes[0]][direction]].element.fill){
        mesh.mesh[snake.nodes[0]].element.innerHTML = '';
        mesh.mesh[mesh.mesh[snake.nodes[0]][direction]].unFillRandomNode();
        mesh.mesh[mesh.mesh[snake.nodes[0]][direction]].fillNode(true);
        snake.nodes.unshift(mesh.mesh[snake.nodes[0]][direction]);
        mesh.generateRandomBlock();
    }else{
      mesh.mesh[mesh.mesh[snake.nodes[0]][direction]].fillNode(true);
      mesh.mesh[snake.nodes[0]].element.innerHTML = '';
      snake.nodes.unshift(mesh.mesh[snake.nodes[0]][direction]);

      //Removing the last node
      mesh.mesh[mesh.mesh[snake.nodes[snake.nodes.length -1]].nodeNumber].unfillNode();
      snake.nodes.pop();
    }
  }else{
    alert("Collision!!! Game Over");
    snake.init();
  }

};

document.addEventListener('keydown',snake.keyDownChooser);

function Node(i,j,nodeNumber,m,n){
  var div = document.createElement("DIV");
  div.classList.add('node');
  //div.innerHTML = nodeNumber;
  this.element = div;
  if(i == 1 && j == 1){
      this.right = nodeNumber + 1;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }else if(i == 1 && j == n){
      this.left = nodeNumber - 1;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }else if(i == m && j == 1){
      this.right = nodeNumber + 1;
      this.up = nodeNumber - n;
      this.nodeNumber = nodeNumber;
  }else if(i == m && j == n){
      this.left = nodeNumber - 1;
      this.up = nodeNumber - n;
      this.nodeNumber = nodeNumber;
  }else if(i == 1){
      this.left = nodeNumber - 1;
      this.right = nodeNumber + 1;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }else if(i == m){
      this.left = nodeNumber - 1;
      this.right = nodeNumber + 1;
      this.up = nodeNumber - n;
      this.nodeNumber = nodeNumber;
  }else if(j == 1){
      this.right = nodeNumber + 1;
      this.up = nodeNumber - n;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }else if(j == n){
      this.left = nodeNumber - 1;
      this.up = nodeNumber - n;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }else{
      this.left = nodeNumber - 1;
      this.right = nodeNumber + 1;
      this.up = nodeNumber - n;
      this.down = nodeNumber + n;
      this.nodeNumber = nodeNumber;
  }
};

Node.prototype.fillNode = function(isHead){
  this.element.classList.add('fill');
  if(isHead) {
    this.element.innerHTML = 'H';
  }
  this.element.fill = true;
};

Node.prototype.fillRandomNode = function(){
  this.element.classList.add('fillRandomNode');
  this.element.fill = true;
};

Node.prototype.unFillRandomNode = function(){
  this.element.classList.remove('fillRandomNode');
  this.element.fill = false;
}

Node.prototype.unfillNode = function(){
  this.element.classList.remove('fill');
  this.element.innerHTML = '';
  this.element.fill = false;
};

var mesh = {};

mesh.init = function(){
  this.mesh = this.createMesh(10,10);
  this.renderMesh();
  this.generateRandomBlock();
};

mesh.createMesh = function (m,n){ //create mesh of m x n size
  const mesh = [];//mesh is collection of nodes
  let i, j;
  let nodeNumber = 1;
  for(i = 1; i <= m; i++){
    for(j = 1; j <= n; j++){
      mesh[nodeNumber] = new Node(i, j, nodeNumber, m, n);
      nodeNumber++;
    }
  }

  return mesh;
};

//console.log(createMesh(10,10));
mesh.renderMesh = function (){
  let mesh = this.mesh;
  let i;
  let divContainer = document.getElementById('divContainer');
  divContainer.innerHTML = '';
  let divs = '';
  console.log(mesh.length);
  for(i = 1; i<= 100; i++){
    divContainer.appendChild(mesh[i].element);
  }
  document.body.appendChild(divContainer);

  mesh[1].fillNode(true); //Head Node
};

mesh.generateRandomBlock = function(){
  let arr1 = [...Array(100).keys()].map(x => x+1);
  let arr2 = snake.nodes;
  let difference = arr1.filter(x => arr2.indexOf(x) == -1);
  let randomFillValue = Math.floor(Math.random() * difference.length);
  this.mesh[difference[randomFillValue]].fillRandomNode();
}

mesh.init();
