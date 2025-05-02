let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#fefae0'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與視訊畫面相同大小的圖形緩衝區
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#fefae0'); // 確保背景顏色一致

  // 更新圖形緩衝區內容
  graphics.background(0); // 設定緩衝區背景顏色為黑色
  for (let x = 0; x < capture.width; x += 20) {
    for (let y = 0; y < capture.height; y += 20) {
      let col = capture.get(x, y); // 取得 capture 對應位置的顏色
       let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
      graphics.fill(gray); // 設定方框的顏色為灰階值
      graphics.noStroke(); // 移除邊框
      graphics.rect(x + 2.5, y + 2.5, 15, 15); // 繪製方框，偏移 2.5 以對齊單位格
      graphics.fill(0); // 設定圓的顏色為黑色
      graphics.ellipse(x + 10, y + 10, 5, 5); // 在方框中心繪製圓
    }
  }

  // 計算圖形緩衝區的水平與垂直居中位置
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 置中顯示圖形緩衝區
  image(graphics, x, y, capture.width, capture.height); // 置中顯示緩衝區
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  graphics = createGraphics(capture.width, capture.height); // 調整緩衝區大小
}
