var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
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
function preload(){
    this.load.image('fon', 'assets/fon.png' );

}
function create(){
    
this.add.image(400, 300, 'fon');
}
function update(){

}