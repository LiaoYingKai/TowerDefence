export default function drawGrid(graphics) {
  //畫格子的數量(數量決定可以放的炮塔)
  graphics.lineStyle(1, 0x000ff, 0.8)
  for (var i = 0; i < 8; i++) {
    //從座標(0,64)畫到(640,64)，以此類推
    graphics.moveTo(0, i * 64)
    graphics.lineTo(640, i * 64)
  }
  //從座標(64,0)畫到(64,512)，以此類推
  for (var j = 0; j < 10; j++) {
    graphics.moveTo(j * 64, 0)
    graphics.lineTo(j * 64, 512)
  }
  graphics.strokePath()
}