var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var yelloC, yelloImg, yelloImg2;
var pinkC, pinkImg, pinkImg2;
var redC, redImg, redImg2;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var distance = 0;
var bell;

function preload() {
  pathImg = loadImage("images/Road.png");

  mainRacerImg1 = loadAnimation(
    "images/mainPlayer1.png",
    "images/mainPlayer2.png"
  );
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");

  pinkImg = loadAnimation("opponent1.png", "opponent2.png");
  pinkImg2 = loadAnimation("opponent3.png");

  yelloImg = loadAnimation("opponent4.png", "opponent5.png");
  yelloImg2 = loadAnimation("opponent6.png");

  redImg = loadAnimation("opponent7.png", "opponent8.png");
  redImg2 = loadAnimation("opponent9.png");

  bell = loadSound("sound/bell.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  // Moving background
  path = createSprite(width/2, height/2);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(displayWidth / 10, camera.y, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;
}

function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  mainCyclist.x = camera.x

  if (gameState === PLAY) {
    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }

    distance += Math.round(getFrameRate() / 50);

    var rand = Math.round(random(1, 3));

    if (rand === 1) {
      yello();
    } else if (rand === 2) {
      pink();
    } else {
      redF();
    }

    if (keyDown("space")) {
      bell.play();
    }

    if(mainCyclist.isTouching(yelloC) || mainCyclist.isTouching(redC) || 
    mainCyclist.isTouching(pinkC)){
      gameState = END
    }
  }
}

function yello() {
  if (frameCount % 80 === 0) {
    yelloC = createSprite(width, Math.round(random(100, height-100)), 20, 20);
    yelloC.addAnimation("yello", yelloImg);
    yelloC.scale = 0.07;
    yelloC.velocityX = -(6 + distance / 150);
    yelloC.lifetime = width/yelloC.velocityX;
  }
}

function pink() {
  if (frameCount % 80 === 0) {
    pinkC = createSprite(width, Math.round(random(100, height-100), 20, 20));
    pinkC.addAnimation("pink", pinkImg);
    pinkC.scale = 0.07;
    pinkC.velocityX = -(6 + distance / 150);
    pinkC.lifetime = width/pinkC.velocityX;
  }
}

function redF() {
  if (frameCount % 80 === 0) {
    redC = createSprite(width, Math.round(random(100, height-100), 20, 20));
    redC.addAnimation("red", redImg);
    redC.scale = 0.07;
    redC.velocityX = -(6 + distance / 150);
    redC.lifetime = width/redC.velocityX;
  }
}
