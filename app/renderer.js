import low from 'lowdb';

const data = low('database.json');
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//teclas
var cursors;
var fireButton;

//naves
var space;
//armas
var normalShoot;


function preload() {
	game.load.image('shoot1','./assets/img/shoot1.png',16,16);
	game.load.spritesheet('space1', './assets/img/spaceSprites.png', 32, 32);
}

function create() {
	//nave
	space = game.add.sprite(300, 200, 'space1');
	space.animations.add('normal',[0, 1, 2, 3, 4, 5, 6, 7]);
	space.animations.add('izquierda',[8, 9, 10, 11, 12, 13, 14]);
	space.animations.add('derecha',[15, 16, 17, 18, 19, 20, 21]);
	game.physics.arcade.enable(space);
	space.animations.play('normal',16,true);
	//armas
	normalShoot = game.add.weapon(30, 'shoot1');
	normalShoot.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	normalShoot.bulletAngleOffset = 90;
	normalShoot.bulletSpeed = 400;
	normalShoot.fireRate = 30;
	//teclas
	cursors = this.input.keyboard.createCursorKeys();
	fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

function update() {
	naveAct();
	naveDraw();
}


//MANEJO NAVE

function naveAct(){
	space.body.velocity.x = 0;
	space.body.velocity.y = 0;
	if (cursors.left.isDown){
    	space.body.velocity.x = -200;
    }
    if (cursors.right.isDown){
    	space.body.velocity.x = 200;
    }
    if (cursors.up.isDown){
    	space.body.velocity.y = -150;
    }
    if (cursors.down.isDown){
    	space.body.velocity.y = 150;
    }
    if (fireButton.isDown){
        normalShoot.fire();
    }
}
function naveDraw(){
	if (space.body.velocity.x > 50){
		space.animations.play('derecha',16,true);
	}
	if (space.body.velocity.x < -50){
		space.animations.play('izquierda',16,true);
	}
	if (space.body.velocity.x > -50 && space.body.velocity.x < 50){
		space.animations.play('normal',16,true);
	}
}