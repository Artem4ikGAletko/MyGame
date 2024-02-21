var config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var score = 0;
var scoreText;
var game = new Phaser.Game(config);

function preload() {
    // завантажимо асети
    this.load.image('sky', 'assets/sky.png');
    this.load.image('fon', 'assets/fon.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('sk', 'assets/sk.png');
    this.load.image('BigP', 'assets/BigP.png');
    



    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('bad',
        'assets/bad.png',
        { frameWidth: 32, frameHeight: 48 }
    );


}
var platforms;
var Bigplatforms;

function create() {
    //додамо ігровий світ
    this.add.image(900, 350, 'sky');

    // додамо платформи
    platforms = this.physics.add.staticGroup();

    platforms.create(150, 568, 'ground').setScale(1).refreshBody();
    platforms.create(1000, 725, 'ground')
    

//Великі Платформи
    Bigplatforms= this.physics.add.staticGroup();
    Bigplatforms.create(400, 568, 'BigP').setScale(2).refreshBody();
//Гравець
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, Bigplatforms);
    //Анімації
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
// ворог
bad = this.physics.add.sprite(150, 450, 'bad');

bad.setBounce(0.2);
bad.setCollideWorldBounds(true);
this.physics.add.collider(bad, platforms);
this.physics.add.collider(bad, Bigplatforms);
//Анімації
this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('bad', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'bad', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('bad', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
cursors = this.input.keyboard.createCursorKeys();



    
}
 function update(){
    //керування
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
// djhju
{
    player.setVelocityY(-330);
}

if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}
