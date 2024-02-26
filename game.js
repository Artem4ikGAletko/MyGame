var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
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
    this.load.image('RAm', 'assets/rampage.png');
   
    

    this.load.spritesheet('foon',
    'assets/foon.png',
    { frameWidth: 200, frameHeight: 188 }
);

    this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    this.load.spritesheet('BB',
        'assets/BB.png',
        { frameWidth: 45, frameHeight: 28 }
    );


}
var platforms;
var Bigplatforms;
var BB1;


function create() {
    //додамо ігровий світ
    this.add.image(950, 570, 'sky');
    

    // додамо платформи
    platforms = this.physics.add.staticGroup();

    platforms.create(150, 908, 'ground').setScale(1).refreshBody();
    platforms.create(400, 900, 'ground').setScale(2).refreshBody();
    platforms.create(550, 920, 'ground')
    platforms.create(750, 920, 'ground')


//Великі Платформи
    Bigplatforms= this.physics.add.staticGroup();
    Bigplatforms.create(600, 1000, 'BigP').setScale(2).refreshBody();
    Bigplatforms.create(1400, 1000, 'BigP').setScale(2).refreshBody();
    Bigplatforms.create(700, 523, 'BigP').setScale(0.5).refreshBody();
    Bigplatforms.create(1020, 523, 'BigP').setScale(0.5).refreshBody();
    Bigplatforms.create(1000, 523, 'BigP').setScale(0.5).refreshBody();
    Bigplatforms.create(200, 700, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(200, 300, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(300, 450, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1200, 700, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1400, 300, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1300, 450, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(800, 700, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1400, 370, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(900, 320, 'BigP').setScale(0.5).refreshBody();
    Bigplatforms.create(700, 300, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1300, 1450, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1200, 700, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(600, 900, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1300, 1450, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(800, 1700, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(1400, 1300, 'BigP').setScale(0.25).refreshBody();
    Bigplatforms.create(900, 1300, 'BigP').setScale(0.5).refreshBody();

//Гравець
    player = this.physics.add.sprite(800, 450, 'dude');
    
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

    BB1 = this.physics.add.group();
    this.physics.add.collider(BB1, platforms);

this.physics.add.collider(player, BB1, hitBomb, null, this);
this.anims.create({
    key: 'gog',
    frames: this.anims.generateFrameNumbers('foon', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

foon = this.physics.add.sprite(800, 450, 'foon');
foon.setBounce(0.2);
    foon.setCollideWorldBounds(true);
    this.physics.add.collider(foon, platforms);
    this.physics.add.collider(foon, Bigplatforms);
 

    scoreText = this.add.text(825, 606, 'Натисніть стрілочку в низ!!!!', { fontSize: '32px', fill: '#000' })
    
}




var bomb; // Додайте змінну для зберігання посилання на bomb

function update() {
    // Керування гравцем
    if(cursors.left.isDown){
foon.anims.play('gog', true);
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    
    
    if (cursors.down.isDown && player.body.touching.down) { // Перевірка, чи немає bomb
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        bomb = BB1.create(x, 16, 'BB');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 10);
        this.physics.add.collider(bomb, platforms);
    this.physics.add.collider(bomb, Bigplatforms);
    }
    
    
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}




