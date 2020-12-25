// declaration of global variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
// creatng the canvas 
createCanvas(600, 350);

//making the monkey
monkey = createSprite(60, 280, 20, 20 );
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1;

  
//create food and obstacles group
FoodGroup = createGroup();
obstacleGroup = createGroup();
  
// making the ground
ground = createSprite(300, 310, 600, 10);
ground.velocityX = -10;
  

}


function draw() {
//clear the screen
background("skyblue");
 
//reset the ground 
if(ground.x<0){
ground.x = ground.width/2;

}
 
//stop monkey from falling down
monkey.collide(ground);
  
//display survival time on the screen
stroke("black");
textSize(20);
fill("black");
  
//destroy the bananas
if(monkey.isTouching(FoodGroup)){
FoodGroup.destroyEach();
}
  
//end the game
if(monkey.isTouching(obstacleGroup)){
gameState = END ;
}
    
// setting different game behaviour into different game states
if(gameState === PLAY){
// spawn the bananas
food();
  
// spawn te obstacles
obstacles();
  
//jump if space key is pressed
if(keyDown("space")){
monkey.velocityY = -13;
}

// give gravity to the monkey
monkey.velocityY = monkey.velocityY + 0.5;
  

  

survivalTime = Math.ceil(frameCount/frameRate())
text("survivalTme : " + survivalTime,150,30);
}
  
else if(gameState === END){
FoodGroup.destroyEach();
obstacleGroup.destroyEach();
ground.velocityX = 0;
text("Game Over" , 250, 150);

}  

  
  
drawSprites(); 
}


function food(){
if( frameCount % 80 === 0){
banana = createSprite(600, 130, 20 ,20);
banana.y = Math.round(random(120, 200));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX = -10;
banana.lifetime = 60;
  
// add each banana to food group 
FoodGroup.add(banana);
}


}

function obstacles(){
if( frameCount % 300 === 0){
obstacle = createSprite(600, 288, 20 ,20);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.1;
obstacle.velocityX = -10;
obstacle.lifetime = 60;
  
// add each obstacle to obstacles group 
obstacleGroup.add(obstacle);
}

}


