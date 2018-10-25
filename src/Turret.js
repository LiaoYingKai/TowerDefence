export default function Turret() {
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
    // fire: function() {
    //   //偵測敵人是否到半徑的範圍(第三個參數)
    //   var enemy = getEnemy(this.x, this.y, 500)
    //   if (enemy) {
    //     var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
    //     addBullet(this.x, this.y, angle)
    //     this.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
    //   }
    // },
    update: function(time, delta) {
      if (time > this.nextTic) {
        // this.fire()
        this.nextTic = time + 100
      }
    }
  }
}