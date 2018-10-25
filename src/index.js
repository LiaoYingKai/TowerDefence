import Phaser from 'phaser'
import Map from './Map.js'
import Enemy from './Enemy'
import Turret from './Turret'

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
var turrets

function preload() {
  this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json')
  this.load.image('bullet', 'assets/bullet.png')
}

function create() {
  var path = this.add.path(96, -32)
  var graphics = this.add.graphics();
  var myMap = new Map(path, graphics)
  var enemy_speed = 1 / 10000
  var myEnemy = new Phaser.Class(Enemy(path, enemy_speed))
  var myTurret = new Phaser.Class(Turret())
  enemies = this.physics.add.group({
    classType: myEnemy,
    runChildUpdate: true,
  });
  turrets = this.add.group({
    classType: myTurret,
    runChildUpdate: true,
  });

  // console.log(turrets)
  this.nextEnemy = 0
  this.input.on('pointerdown', function(pointer) {
    myMap.placeTurret(pointer, turrets)
  })
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