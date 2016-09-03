var xposenemy = 20;
var yposenemy = 700;
var xposcannonball = 20;
var yposcannonball = 0;
var xposmouse = 0;
var yposmouse = 0;
var enemy_speed = 1;
var bullet_speed = 1;
var dead = 0;
var mousepointer = {x: 0, y: 0, width: 128, height: 128};
var enemy = {x: 0, y: 0, width: 99, height: 132};
var cannon = {x: 0, y: 0, width: 99, height: 132};
var app = playground({
	create: function() {
		this.loadImage("guy");
		this.loadImage("cannon");
		this.loadImage("cannonball");
	},
	mousemove: function(event) {
		/*if (cannon.x < enemy.x + enemy.width &&
   		cannon.x + mousepointer.width > enemy.x &&
   		cannon.y < enemy.y + enemy.height &&
   		mousepointer.height + cannon.y > enemy.y) {
   			console.log("Yep, he's dead!");
			dead = 1;
		}*/
	},
	keydown: function(event) {
		if(event.key == "up") {
			fire(0);
		}
  	},
	render: function() {
		enemy.x = xposenemy;
		enemy.y = yposenemy;
		cannon.x = xposcannonball;
		cannon.y = yposcannonball;
		this.enemyinfo = "Enemy: " + enemy.x + ", " + enemy.y;
		this.cannoninfo = "Cannon: " + cannon.x + ", " + cannon.y;
		if(enemy.x == cannon.x && enemy.y == cannon.y) {
			console.log("Yep, he's dead!");
			fireAgain();
			resetEnemy();
			dead = 1;
		}
		/*if(collided(cannon, enemy)) {
			console.log("Yep, he's dead!");
			dead = 1;
		}*/
		if(dead == 0) {
			this.layer.clear("#cc3300");
			this.layer.drawImage(this.images.guy, xposenemy, yposenemy);
			this.layer.drawImage(this.images.cannon, 0, 0);
			this.layer.drawImage(this.images.cannonball, xposcannonball, yposcannonball);
			ready();
		} else {
			console.log("He's gone.");
		}
	}
});
function resetEnemy() {
	xposenemy = 0;
	yposenemy = 700;
	xposmouse = 0;
	yposmouse = 0;
	dead = 0;
}
function fireAgain() {
	xposcannonball = 20;
	yposcannonball = 0;
	fire(0);
}
function ready() {
	for(i = 0; i < enemy_speed; i++) {
		yposenemy--;
	}
	for(i = 0; i < bullet_speed; i++) {
		yposcannonball++;
	}
	sleep(10);
}
function fire(isPart) {
	for(i = 0; i < bullet_speed; i++) {
		yposcannonball++;
	}
	if(isPart == 0) {
		sleep(10);
	}
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
