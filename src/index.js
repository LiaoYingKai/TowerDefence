import Phaser from 'phaser'
import Map from './Map.js'
import Enemy from './Enemy'
import Turret from './Turret'
import Bullet from './Bullet'
import Money from './Money'

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
var bullets

function preload() {
  this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json')
  this.load.image('bullet', 'assets/bullet.png')
}

function create() {
  var path = this.add.path(96, -32)
  var graphics = this.add.graphics();
  var myMap = new Map(path, graphics)
  var enemySpeed = 1 / 10000
  //線、速度(越大越快)、血量
  var myEnemy = new Phaser.Class(Enemy(path, 1 / 10000, 200))
  enemies = this.physics.add.group({
    classType: myEnemy,
    runChildUpdate: true,
  });
  //子彈速度、飛行時間
  var myBullet = new Phaser.Class(Bullet(600, 500))
  bullets = this.physics.add.group({
    classType: myBullet,
    runChildUpdate: true
  })
  //敵人、攻擊半徑、子彈、發射間距、攻擊力
  var myTurret = new Phaser.Class(Turret(enemies, 400, bullets, 1000, 50))
  turrets = this.add.group({
    classType: myTurret,
    runChildUpdate: true,
  });
  var gameThis = this
  this.nextEnemy = 0
  this.input.on('pointerdown', pointer => {
    myMap.placeTurret(pointer, turrets)
  })
  this.physics.add.overlap(enemies, bullets, damageEnemy)
}

function damageEnemy(enemy, bullet) {
  // console.log('fuck')
  if (enemy.active === true && bullet.active === true) {
    bullet.setActive(false)
    bullet.setVisible(false)
    enemy.receiveDamage(50)
  }
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