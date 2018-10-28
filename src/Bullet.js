export default function Bullet(bulletSpeed, bulletSurviveTime) {
  return {
    Extends: Phaser.GameObjects.Image,
    initialize: function bullet(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet')
      this.dx = 0
      this.dy = 0
      this.lifespan = 0
      //子彈速度
      this.speed = Phaser.Math.GetSpeed(bulletSpeed, 1)
    },
    fire: function(x, y, angle) {
      this.setActive(true)
      this.setVisible(true)
      this.setPosition(x, y)

      this.dx = Math.cos(angle)
      this.dy = Math.sin(angle)

      //子彈存活的秒數(毫秒)
      this.lifespan = bulletSurviveTime
    },
    update: function(time, delta) {
      this.lifespan -= delta

      this.x += this.dx * (this.speed * delta)
      this.y += this.dy * (this.speed * delta)

      if (this.lifespan <= 0) {
        this.setActive(false)
        this.setVisible(false)
      }
    },
  }
}