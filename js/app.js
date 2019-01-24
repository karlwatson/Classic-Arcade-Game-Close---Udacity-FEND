let lives = 5;
let score = 0;
// Random number generator, increments of 0.5 speed
//i.e. passing min, max as 1,6 gives one of 1, 1.5, 2, ..., 6.0

function generateRandomValue(min, max) {
  doubleMin = 2*(Math.ceil(min));
  doubleMax = 2*(Math.floor(max));
  return 0.5*(Math.floor(Math.random() * (doubleMax - doubleMin)) + doubleMin);
}

// Enemies our player must avoid
var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 65;
  this.height = 80;
  this.speed = generateRandomValue(2, 6);
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // if bug is off the screen, bug moves to levt of canvas with:
  // random start point from x=-250 to x=-50, &
  // updated speed parameter
  if (this.x >= 606)  {
    this.x = 200*(Math.random()) - 250;
    this.speed = generateRandomValue(2, 6);
  } else {
    {
      this.x = this.x + (65 * dt * this.speed);
    }
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 101; //amend where needed 50?
  this.height = 83;
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(202, 322);
// 202, 322 values etc - all y values are multiple of 83, thes minus 10

let enemyRow1E1 = new Enemy(-70, 73);
let enemyRow2E1 = new Enemy(-600, 156);
let enemyRow2E2 = new Enemy(-50, 156);
let enemyRow3E1 = new Enemy(-180, 239);
let allEnemies = [enemyRow1E1, enemyRow2E1, enemyRow2E2, enemyRow3E1];



// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


Player.prototype.handleInput = function(code) {
  // Left keypress
  if (code === 'left') {
    if (this.x > 0) {
      this.x -= 101;
    }
  // Right keypress
} else if (code === 'right') {
    if (this.x <= 400)  {
      this.x += 101;
    }
  // Up keypress
} else if (code === 'up') {
    if (this.y > 0) {
      this.y -= 83
    }
  // Down keypress
} else if (code === 'down') {
    if (this.y < 380) {
      this.y += 83
    }
}};


// Lose a life / heart
function decrementLives() {
  let visibleHearts = $('.fa-heart');
  let lastVisibleHeart = visibleHearts[($('.fa-heart').length)-1];
  lastVisibleHeart.remove();
  let livesDisplay = $('.lives');
  livesDisplay.append('<li><i class="fa fa-heart-o"></i></li>');
}

// Refills Lives counter with 5 hearts
function renewLives() {
  $('.fa-heart').remove();
  $('.fa-heart-o').remove();
  let lives = $('.lives');
  for (let i = 0; i < 5; i++){
    lives.append('<li><i class="fa fa-heart"></i></li>');
  }
}

// Runs on Page load / refresh
document.addEventListener('DOMContentLoaded', function () {
  renewLives();
});

// Checks for Collisions
function playerReset()  {
  player.x = 202;
  player.y = 322;
}

function checkCollisions()  {
  allEnemies.forEach(function(enemy) {
    // conditions:
    if ( ((player.y >= enemy.y) && (player.y <= enemy.y + enemy.height)) || ((player.y + player.height >= enemy.y) && (player.y + player.height <= enemy.y + enemy.height)) ) {
      if ( ((player.x >= enemy.x) && (player.x <= enemy.x + enemy.width)) || ((player.x + player.width >= enemy.x) && (player.x + player.width <= enemy.x + enemy.width)) ) {
        // execute code if overlapping y variables (same row), AND overlapping x variable (character overlap)
        console.log('collision!');
        playerReset();
        decrementLives();
        lives--;
        if (lives === 0)  {
          endOutput();
          openModal();
        }
      }
    }
  });
}

function checkWin() {
  if (player.y < 65)  {
    score += 10;
    playerReset();
  }
}


// End game logic:

function endOutput()  {
  return ("You're out of lives :( You scored " + score + " points! \n Reload page to restart game.");
}

function openModal()  {
  $('.modal-text').append(endOutput());
  $('.modal').css('display', 'block');
}

  $('.close').on('click', function(evt)  {
  $('.modal').css('display', 'none');
  // playerReset();
  // lives = 5;
  // score = 0;
  // renewLives();
  $('.modal-text').empty(); ////NEW
});
