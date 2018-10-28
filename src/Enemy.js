export default function Enemy(path, enemySpeed, enemyHp) {
  return {
    Extends: Phaser.GameObjects.Image,
    initialize: function Enemy(scene) {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy')
      this.follower = {
        t: 0,
        vec: new Phaser.Math.Vector2()
      }
    },
    startOnPath: function() {
      this.follower.t = 0
      this.hp = enemyHp

      path.getPoint(this.follower.t, this.follower.vec)
      this.setPosition(this.follower.vec.x, this.follower.vec.y)
    },
    receiveDamage: function(damage) {
      this.hp -= damage
      if (this.hp <= 0) {
        this.setActive(false)
        this.setVisible(false)
      }
    },
    update: function(time, delta) {
      this.follower.t += enemySpeed * delta;
      path.getPoint(this.follower.t, this.follower.vec);
      this.setPosition(this.follower.vec.x, this.follower.vec.y);
      if (this.follower.t >= 1) {
        this.setActive(false);
        this.setVisible(false);
      }
    }
  }
}