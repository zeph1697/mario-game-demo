//Mario

let characterFrames = [];
for (let i = 0; i < 10; i++) {
  characterFrames[i] = new PIXI.Texture(
    PIXI.Texture.from("images/character/mario-frame.png"),
    new PIXI.Rectangle(i * 16, 0, 16, 16)
  );
}

let hero = new PIXI.Sprite(characterFrames[5]);
hero.width = 48;
hero.height = 48;
hero.x = 100;
hero.y = app.view.height / 2;
hero.vx = 0;
hero.vy = 0;

hero.direction = 1;
hero.moving = {
  runLeft: [4, 3, 2, 1],
  runRight: [5, 6, 7, 8],
};

app.stage.addChild(hero);

//Keyboard listener
let keys = {};

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

function keysDown(e) {
  keys[e.key] = true;
  // console.log();
}
function keysUp(e) {
  keys[e.key] = false;
  // console.log();
}

//Physic
let isTouchingGround; //Prevent flying around & double jump
let jumped = false; //Prevent jump continously

//Real-time actions
app.ticker.add(gameLoop);

function gameLoop() {
  hero.x += hero.vx;
  hero.y += hero.vy;

  hero.vy = Math.min(8, hero.vy + 1);

  isTouchingGround =
    hitTest(hero, groundCol) ||
    hitTest(hero, pipeL) ||
    hitTest(hero, pipeH) ||
    hitTest(hero, brickBlock);

  //Handle collisions & walls
  if (hero.x < 0) {
    hero.x = 0;
  }
  if (hero.x > app.view.width - hero.width) {
    hero.x = app.view.width - hero.width;
  }

  if (hero.y > app.view.height - ground.height - hero.height) {
    hero.y = app.view.height - ground.height - hero.height;
  }

  if (
    hitTest(hero, pipeL) ||
    hitTest(hero, pipeH) ||
    hitTest(hero, brickWall)
  ) {
    hero.vy = 0;
  }

  // if (hero.vy > 0) {
  //   for (let i = 0; i < hero.vy; i++) {
  //     if (
  //       hitTest(hero, groundCol) ||
  //       hitTest(hero, pipeL) ||
  //       hitTest(hero, pipeH) ||
  //       hitTest(hero, brickWall)
  //     ) {
  //       hero.vy = 0;
  //       break;
  //     }
  //     hero.y += 1;
  //   }
  // }
  // if (hero.vy < 0) {
  //   for (let i = hero.vy; i < 0; i++) {
  //     if (
  //       hitTest(hero, pipeL) ||
  //       hitTest(hero, pipeH) ||
  //       hitTest(hero, brickWall)
  //     ) {
  //       hero.vy = 0;
  //       break;
  //     }
  //     hero.y -= 1;
  //   }
  // }

  // if (hero.vx > 0) {
  //   for (let i = 0; i < hero.vx; i++) {
  //     if (
  //       hitTest(hero, pipeL) ||
  //       hitTest(hero, pipeH) ||
  //       hitTest(hero, brickWall)
  //     ) {
  //       hero.vx = 0;
  //       break;
  //     }
  //     hero.x += 1;
  //   }
  // }
  // if (hero.vx < 0) {
  //   for (let i = 0; i > hero.vx; i--) {
  //     if (
  //       hitTest(hero, pipeL) ||
  //       hitTest(hero, pipeH) ||
  //       hitTest(hero, brickWall)
  //     ) {
  //       hero.vx = 0;
  //       break;
  //     }
  //     hero.x -= 1;
  //   }
  // }

  //Handle movement
  if (keys["w"] && isTouchingGround && !jumped) {
    hero.vy = -16;
    hero.y += hero.vy;
    jumped = true;
  }
  if (!keys["w"] && isTouchingGround && jumped) {
    jumped = false;
  }
  if (keys["a"]) {
    hero.direction = 0;
    hero.vx = Math.max(-8, hero.vx - 1);
  } else if (keys["d"]) {
    hero.direction = 1;
    hero.vx = Math.min(8, hero.vx + 1);
  } else {
    hero.vx = 0;
  }

  //Animation frames
  let heroFrame = 0;
  if (!isTouchingGround) {
    heroFrame = hero.direction * 9;
  } else {
    if (hero.vx > 0) {
      heroFrame = hero.moving.runRight[Math.floor(Date.now() / 100) % 4];
    } else if (hero.vx < 0) {
      heroFrame = hero.moving.runLeft[Math.floor(Date.now() / 100) % 4];
    } else {
      heroFrame = hero.direction + 4;
    }
  }

  hero.texture = characterFrames[heroFrame];

  //Handle get items
  let coinCount = 0;
  let coin = 0;

  function getCoin(num) {
    coinCount = num;
    document.getElementById("coin").innerHTML = "Coin: " + coinCount;
  }

  if (hitTest(hero, coin1)) {
    app.stage.removeChild(coin1);
    getCoin(coin + 1);
    return;
  }
  if (hitTest(hero, coin2)) {
    app.stage.removeChild(coin2);
    getCoin(coin + 1);
    return;
  }
  if (hitTest(hero, coin3)) {
    app.stage.removeChild(coin3);
    getCoin(coin + 1);
    return;
  }
}
