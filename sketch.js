
var monkey , monkey_running, monkeyEND;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, stoneGroup
var score;
var bCount;
var bg, gameover;

var PLAY=1;
var END=2;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyEND = loadImage("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
  bgi = loadImage("a.png");
  monkee = loadAnimation("go.png");
  monkeee = loadAnimation("r.png");
    
  bananaGroup=createGroup();
  stoneGroup=createGroup();
  
  score=0
  bCount=0
}



function setup() {
  createCanvas(500, 500);
  
  bg = createSprite(250, 250, 20, 20);
  bg.addImage("bg1", bgi);
  bg.scale=2
  
  monkey = createSprite(100, 400, 20, 20);
  monkey.addAnimation("monkeypic", monkey_running);
  monkey.scale=0.2;
  monkey.setCollider("rectangle", 0, 0, 500, 570)

  ground = createSprite(250, 460, 500, 5);
  ground.velocityX=-2;
  ground.shapeColor="lightGreen"
  
  gameover = createSprite(260, 180, 20, 20);
  gameover.addAnimation("monke", monkee);
  gameover1 = createSprite(260, 250, 20, 20);
  gameover1.addAnimation("monk", monkeee)
  
}


function draw() {
  background("lightgrey");
  monkey.velocityY=monkey.velocityY + 1
    monkey.collide(ground);
  
  if(gameState===PLAY){
    if(keyDown("space")&&monkey.y>=396){
    monkey.velocityY=-23;
    }  
    
    if(bg.x>200){
    ground.x=ground.width/2
  }
    
    score=score+Math.round(getFrameRate()/62.5);
    
    gameover.visible=false;
    gameover1.visible=false;
    
    if(frameCount%100===0){
    banana1();
  }
    
    if (monkey.isTouching(bananaGroup)){
     bananaGroup.destroyEach();
   bCount=bCount+1
  }
  
  if(frameCount%300===0){
    stone1();
  }
      
    if(monkey.isTouching(stoneGroup)){
      gameState=END;
  }
  }
  
  if(gameState===END){
    reload();
    
  }
  
 
  drawSprites();
  fill("white")
  textSize(20);
  text("banana: "+bCount, 5, 20);
  text("score: "+score, 400, 20);
  
}

function reload(){
  monkey.visible=false;  
  gameover1.visible=true;
    gameover.visible=true;
    stoneGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX=0;
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    if(keyDown("r")){
      score=0;
      bCount=0;
      gameState=PLAY;
      monkey.visible=true;
    }
}

function banana1(){
  banana = createSprite(500, 250, 20, 20);
  banana.addImage("banana", bananaImage);
  banana.scale=0.2;
  banana.setCollider("rectangle", 0, 0, 500, 250);
  banana.velocityX=-5;
  banana.lifetime=100;
  banana.y=Math.round(random(120, 250));
  bananaGroup.add(banana);
}

function stone1(){
  stone = createSprite(500, 399, 20, 20);
  stone.addImage("stone", stoneImage);
  stone.scale=0.3;
  stone.velocityX=-7;
  stone.lifetime=72;
  stone.setCollider("rectangle", -25, 0, 450, 400);
  stoneGroup.add(stone);
}

