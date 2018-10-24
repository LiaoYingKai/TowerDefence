import Phaser from 'phaser'
import Map from './Map.js'
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 512,
  parent: 'content',
  physics: {
    default: 'arcade'
  },
  scene: {
    key: 'main',
    preload: preload,
    create: create,
    update: update
  }
}
const game = new Phaser.Game(config)

function preload() {
  this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json')
  this.load.image('bullet', 'assets/bullet.png')
}

function create() {
  var path = this.add.path(0, 0)
  var graphics = this.add.graphics();
  var map = new Map(path, graphics)

}

function update() {

}