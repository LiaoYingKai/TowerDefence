export default function Turret(enemies, bullets) {
  return {
    Extends: Phaser.GameObjects.Image,
    initialize: function Turret(scene) {
      console.log('Turret:initialize')
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret')
      this.nextTic = 0
    },
    place: function(i, j) {
      this.y = i * 64 + 64 / 2
      this.x = j * 64 + 64 / 2
    },
    fire: function() {
      //偵測敵人是否到半徑的範圍(第三個參數)
      var enemy = this.getEnemy(this.x, this.y, 500)
      if (enemy) {
        var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
        this.addBullet(this.x, this.y, angle)
        this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
      }
    },
    getEnemy: function(x, y, distance) {
      var enemyUnits = enemies.getChildren()
      for (var i = 0; i < enemyUnits.length; i++) {
        if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance) {
          return enemyUnits[i]
        }
      }
      return false
    },
    addBullet: function(x, y, angle) {
      var bullet = bullets.get()
      if (bullet) {
        bullet.fire(x, y, angle)
      }
    },
    update: function(time, delta) {
      if (time > this.nextTic) {
        this.fire()
        this.nextTic = time + 100
      }
    }
  }
}