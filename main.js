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
		/*if(enemy.x == cannon.x && enemy.y == cannon.y) {
			resetEnemy();
			fireAgain();
			dead = 1;
		}*/
		if(pixelHitTest(cannon, enemy)) {
			console.log("Yep, he's dead!");
			dead = 1;
		}
		if(dead == 0) {
			this.layer.clear("#cc3300");
			this.layer.drawImage(this.images.guy, xposenemy, yposenemy);
			this.layer.drawImage(this.images.cannon, 0, 0);
			this.layer.drawImage(this.images.cannonball, xposcannonball, yposcannonball);
			console.log(this.enemyinfo);
			console.log(this.cannoninfo);
			this.layer.fillText("Enemy: " + enemy.x + ", " + enemy.y, 100, 0);
			this.layer.fillText("Cannon: " + cannon.x + ", " + cannon.y, 200, 40);
			ready();
		} else {
			resetEnemy();
		}
	}
});
function resetEnemy() {
	xposenemy = 20;
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
/* Box model detection, return true on collision */
/*function hitBox( source, target ) {
	Source and target objects contain x, y and width, height
	return !(
		( ( source.y + source.height ) < ( target.y ) ) ||
		( source.y > ( target.y + target.height ) ) ||
		( ( source.x + source.width ) < target.x ) ||
		( source.x > ( target.x + target.width ) )
	);
}*/
/* Pixel collision detection pseudo code */
function pixelHitTest( source, target ) {
	// Loop through all the pixels in the source image
	for( var s = 0; s < source.pixelMap.length; s++ ) {
		var sourcePixel = source.pixelMap[s];
		// Add positioning offset
		var sourceArea = {
			x: sourcePixel.x + source.x,
			y: sourcePixel.y + source.y,
			width: 1,
			height: 1
		};
 
		// Loop through all the pixels in the target image
		for( var t = 0; t < target.pixelMap.length; t++ ) {
			var targetPixel = target.pixelMap[t];
			// Add positioning offset
			var targetArea = {
				x: targetPixel.x + target.x,
				y: targetPixel.y + target.y,
				width: 1,
				height: 1
			};
 
			/* Use the earlier aforementioned hitbox function */
			if( hitBox( sourceArea, targetArea ) ) {
				return true;
			}
		}
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
