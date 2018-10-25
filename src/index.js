import Phaser from 'phaser'
import Map from './Map.js'
import Enemy from './Enemy'
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
var enemies

function preload() {
  this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json')
  this.load.image('bullet', 'assets/bullet.png')
}

function create() {
  var path = this.add.path(96, -32)
  var graphics = this.add.graphics();
  var myMap = new Map(path, graphics)
  var myEnemy = new Phaser.Class(Enemy(path))
  enemies = this.physics.add.group({
    classType: myEnemy,
    runChildUpdate: true,
  });
  console.log(enemies)
  this.nextEnemy = 0
}

function update(time, delta) {
  if (time > this.nextEnemy) {
    //取得敵人的物件
    var enemy = enemies.get();
    if (enemy) {
      enemy.setActive(true);
      enemy.setVisible(true);
      enemy.startOnPath();
      //每一個球間隔的時間
      this.nextEnemy = time + 2000;
    }
  }
}