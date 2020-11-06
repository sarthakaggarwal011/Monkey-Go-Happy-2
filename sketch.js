var monkey, monkey_running;
var jungle, invisibleGround, jungleImage;
var stoneGroup, bananaGroup, bananaImage, stoneImage
var count, hit, eat

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","  Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  jungleImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  
  hit = loadSound("score.mp3");
  eat = loadSound("hit.mp3");
}

function setup() {
  createCanvas(400, 400);
  
    
  
  ground = createSprite(200,200,400,400)
  ground.addImage("jungle",jungleImage);
  ground.scale = 0.98;
  ground.x = ground.width/2;
  ground.velocityX = -6
  
  monkey = createSprite(50,360,20,50);  
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
monkey.setCollider("circle",0,0,30);
  
  
  invisibleGround = createSprite(200,360,400,10);
  invisibleGround.visible = false;
  
  stoneGroup=new Group();
  bananaGroup=new Group();
  
  count=0;
}

function draw() {
  background(220);
  
  
   if(keyDown("space")&&monkey.y>=300){
    monkey.velocityY = -13;
  }
  
 if(bananaGroup.isTouching(monkey)){
    count = count+2
   eat.play();
   bananaGroup.destroyEach();
   switch(count){
     case 10: monkey.scale=0.10;
       break;
       case 20: monkey.scale=0.15;
       break;
       case 30: monkey.scale=0.20;
       break;
       case 40: monkey.scale=0.25;
       break;
       case 50: monkey.scale=0.30;
       break;
      case 60: monkey.scale=0.35;
       break;
        case 70: monkey.scale=0.40;
       break;
       case 80: monkey.scale=0.45;
       break;
       case 90: monkey.scale=0.50;
       break;
       case 100:monkey.scale=0.60;
       break;
   }
    }
  
  if (stoneGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    count=0;
    hit.play();
  }
  
  if (frameRate % 10===0){
    ground.velocityX= -(6+3)
  }
  
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(invisibleGround);
  
  spawnFood();
  spawnObstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ count, 250,50);

  
}

function spawnObstacles(){
  if (frameCount % 100 ===0){
      var obstacle = createSprite(400,365,10,40)
      obstacle.velocityX= -4;
      obstacle.addImage(stoneImage);
      obstacle.scale = 0.15;
    obstacle.lifetime = 140;
    
 obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    stoneGroup.add(obstacle);
      }
}

function spawnFood(){
  if (frameCount % 100 ===0){
     var food = createSprite(400,320,10,40)
     food.y = Math.round(random(200,250));
     food.addImage(bananaImage);
    food.scale=0.05;
    food.velocityX= -3;
    food.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    
    bananaGroup.add(food);
     }
}