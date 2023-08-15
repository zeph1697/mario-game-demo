//Ground
let ground = PIXI.Sprite.from("images/map/ground.png");
ground.width = 960;
ground.height = 64;
ground.x = 0;
ground.y = app.view.height - ground.height;

//Pipe 1
let pipeL = PIXI.Sprite.from("images/map/pipe-low.png");
pipeL.width = 64;
pipeL.height = 64;
pipeL.x = 300;
pipeL.y = app.view.height - pipeL.height - ground.height;

//Pipe 2
let pipeH = PIXI.Sprite.from("images/map/pipe-hight.png");
pipeH.width = 64;
pipeH.height = 128;
pipeH.x = 500;
pipeH.y = app.view.height - pipeH.height - ground.height;

//Block
let brickBlock = PIXI.Sprite.from("images/map/brick-block.png");
brickBlock.width = 64;
brickBlock.height = 32;
brickBlock.x = 720;
brickBlock.y = app.view.height - 280;
brickBlock.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

//Collisions & Walls
const groundCol = new PIXI.Graphics();
groundCol.beginFill(0xffffff, 0.01);
groundCol.drawRect(0, 0, ground.width, ground.height);
groundCol.endFill();
groundCol.x = 0;
groundCol.y = app.view.height - ground.height;

const pipeWall1 = new PIXI.Graphics();
pipeWall1.beginFill(0xffffff, 0.01);
pipeWall1.drawRect(0, 0, pipeL.width, pipeL.height);
pipeWall1.endFill();
pipeWall1.x = pipeL.x;
pipeWall1.y = pipeL.y;

const pipeWall2 = new PIXI.Graphics();
pipeWall2.beginFill(0xffffff, 0.01);
pipeWall2.drawRect(0, 0, pipeH.width, pipeH.height);
pipeWall2.endFill();
pipeWall2.x = pipeH.x;
pipeWall2.y = pipeH.y;

const brickWall = new PIXI.Graphics();
brickWall.beginFill(0xffffff, 0.01);
brickWall.drawRect(0, 0, brickBlock.width, brickBlock.height);
brickWall.endFill();
brickWall.x = brickBlock.x;
brickWall.y = brickBlock.y;

app.stage.addChild(
  ground,
  pipeL,
  pipeH,
  brickBlock,
  groundCol,
  pipeWall1,
  pipeWall2,
  brickWall
);
