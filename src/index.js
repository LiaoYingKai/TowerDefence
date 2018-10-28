import Phaser from 'phaser'
import Map from './Map.js'
import Enemy from './Enemy'
import Turret from './Turret'
import Bullet from './Bullet'

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
var nextEmeny = 2000
var turrets
var bullets

function preload() {
  this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json')
  this.load.image('bullet', 'assets/bullet.png')
  this.load.image('fuckTurret', 'assets/fuckTurret.png')
}

function create() {
  let path = this.add.path(96, -32)
  let graphics = this.add.graphics();
  let myMap = new Map(path, graphics)
  let enemySpeed = 1 / 10000
  let enemyHp = 200
  //線、速度(越大越快)、血量
  let myEnemy = new Phaser.Class(Enemy(path, enemySpeed, enemyHp))
  enemies = this.physics.add.group({
    classType: myEnemy,
    runChildUpdate: true,
  });
  let bulletSpeed = 600
  let bulletSurviveTime = 500
  let bulletInjury = 50
  let turretAttackDistance = 400
  let turretShootingSpeed = 1000
  //敵人、攻擊半徑、子彈、發射間距、子彈速度、飛行時間、子彈攻擊力、物理引擎
  let myTurret = new Phaser.Class(Turret(enemies, turretAttackDistance, turretShootingSpeed, bulletSpeed, bulletSurviveTime, bulletInjury, this.physics))
  turrets = this.add.group({
    classType: myTurret,
    runChildUpdate: true,
  });
  this.nextEnemy = 0
  this.input.on('pointerdown', pointer => {
    myMap.placeTurret(pointer, turrets)
  })
}

function update(time, delta) {
  if (time > this.nextEnemy) {
    //取得敵人的物件
    let enemy = enemies.get();
    if (enemy) {
      enemy.setActive(true);
      enemy.setVisible(true);
      enemy.startOnPath();
      //每一個敵人間隔的時間
      this.nextEnemy = time + nextEmeny;
    }
  }
}