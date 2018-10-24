export default class Map {
  constructor(path, graphics) {
    this.path = path
    this.graphics = graphics
    this.drawGrid()
    this.drawRoute()
  }

  drawRoute() {
    //線的路徑
    this.path.lineTo(96, -32);
    this.path.lineTo(96, 164);
    this.path.lineTo(480, 164);
    this.path.lineTo(480, 544);
    //線的樣式
    this.graphics.lineStyle(3, 0xffffff, 1);
    //畫線
    this.path.draw(this.graphics);
  }
  drawGrid() {
    //畫格子的數量(數量決定可以放的炮塔)
    this.graphics.lineStyle(1, 0x000ff, 0.8)
    for (var i = 0; i < 8; i++) {
      //從座標(0,64)畫到(640,64)，以此類推
      this.graphics.moveTo(0, i * 64)
      this.graphics.lineTo(640, i * 64)
    }
    //從座標(64,0)畫到(64,512)，以此類推
    for (var j = 0; j < 10; j++) {
      this.graphics.moveTo(j * 64, 0)
      this.graphics.lineTo(j * 64, 512)
    }
    this.graphics.strokePath()
  }
}