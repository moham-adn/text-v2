let graphic;
let font;

const p5Container = document.querySelector('#p5-container')


function preload() {
  font = loadFont("MangoGrotesque-ExtraBold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  graphic = createGraphics(width, height);

  updateText();
}

function draw() {
  background("#000000");

  const tileSize = min(width, height) * 0.04;

  for (let y = 0; y < height / tileSize; y++) {
    let position = winMouseY / height;
    position = easeInOutQuart(position)

    const sx = 0;
    const sy = y * tileSize * position;
    const sw = width;
    const sh = tileSize * position + (height - tileSize) * (1 - position);

    const dx = 0;
    const dy = y * tileSize;
    const dw = width;
    const dh = tileSize;

    image(graphic, dx, dy, dw, dh, sx, sy, sw, sh);
  }
}

function updateText() {
  graphic.clear();
  graphic.textFont(font);
  graphic.fill("#ffffff");
  
  let textSize = min(width, height) * 0.7; // Adjust the multiplier as needed
  graphic.textSize(textSize);

  while (graphic.textWidth("PORTSHOWLIO '24") > width * 0.95) {
    textSize *= 0.95;
    graphic.textSize(textSize);
  }

  graphic.textAlign(CENTER, CENTER);
  graphic.text("PORTSHOWLIO '24", width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphic.resizeCanvas(width, height);
  updateText();
}