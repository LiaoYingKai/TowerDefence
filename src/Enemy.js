var ENEMY_SPEED = 1 / 10000
class Enemy extends Phaser.GameObjects.Image {
  constructor(scene, path) {
    super(scene, path)
  }
}

// var Enemy = new Phaser.Class({
//   Extends: Phaser.GameObjects.Image,
//   initialize: function Enemy(scene, path) {
//     Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy')
//     this.follower = {
//       t: 0,
//       vec: new Phaser.Math.Vector2()
//     }
//     this.path = path
//   },
//   startOnPath: function() {
//     this.follower.t = 0
//     this.hp = 100
//
//     path.getPoint(this.follower.t, this.follower.vec)
//     this.setPosition(this.follower.vec.x, this.follower.vec.y)
//   },
//   receiveDamage: function(damage) {
//     this.hp -= damage
//     if (this.hp <= 0) {
//       this.setActive(false)
//       this.setVisible(false)
//     }
//   },
//   update: function(time, delta) {
//     this.follower.t += ENEMY_SPEED * delta;
//     path.getPoint(this.follower.t, this.follower.vec);
//     this.setPosition(this.follower.vec.x, this.follower.vec.y);
//     if (this.follower.t >= 1) {
//       this.setActive(false);
//       this.setVisible(false);
//     }
//   }
// })

export default Enemy