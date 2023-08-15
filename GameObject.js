//Coin
let coin1 = PIXI.Sprite.from("images/map/coin.png");
coin1.width = 32;
coin1.height = 32;
coin1.anchor.set(0.5);
coin1.x = pipeL.x + pipeL.width / 2;
coin1.y = app.view.height - ground.height - pipeL.height - 128;
app.stage.addChild(coin1);

let coin2 = PIXI.Sprite.from("images/map/coin.png");
coin2.width = 32;
coin2.height = 32;
coin2.anchor.set(0.5);
coin2.x = pipeH.x + pipeH.width / 2;
coin2.y = app.view.height - ground.height - pipeH.height - 128;
app.stage.addChild(coin2);

let coin3 = PIXI.Sprite.from("images/map/coin.png");
coin3.width = 32;
coin3.height = 32;
coin3.anchor.set(0.5);
coin3.x = brickBlock.x + brickBlock.width / 2;
coin3.y = brickBlock.y - 128;
app.stage.addChild(coin3);

//Hitting objects detection
function hitTest(obj1, obj2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, dx, dy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  obj1.centerX = obj1.x + obj1.width / 2;
  obj1.centerY = obj1.y + obj1.height / 2;
  obj2.centerX = obj2.x + obj2.width / 2;
  obj2.centerY = obj2.y + obj2.height / 2;

  //Find the half-widths and half-heights of each sprite
  obj1.halfWidth = obj1.width / 2;
  obj1.halfHeight = obj1.height / 2;
  obj2.halfWidth = obj2.width / 2;
  obj2.halfHeight = obj2.height / 2;

  //Calculate the distance vector between the sprites
  dx = obj1.centerX - obj2.centerX;
  dy = obj1.centerY - obj2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = obj1.halfWidth + obj2.halfWidth;
  combinedHalfHeights = obj1.halfHeight + obj2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(dx) < combinedHalfWidths) {
    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(dy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}
