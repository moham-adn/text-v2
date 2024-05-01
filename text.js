const easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

const COLORS = ["#FF7F50", "#6495ED", "#FF69B4", "#ADFF2F"];
const END_DURATION = 60;

let graphic;
let font;
let colorIndex = 0;
let transitionProgress = 0;

function preload() {
  font = loadFont("https://cdn.jsdelivr.net/gh/moham-adn/text-v2@v1/MangoGrotesque-ExtraBold.otf");
}

function setup() {
  const p5Container = document.getElementById("p5-container");
  const cnv = createCanvas(p5Container.clientWidth, p5Container.clientHeight);
  cnv.parent(p5Container);
  cnv.style('width', '100%');
  cnv.style('height', '100%');
  graphic = createGraphics(width, height);
  graphic.textFont(font);
  updateText();
}

function draw() {
  background("#0c0c0c");

  const tileSize = min(width, height) * 0.1;
  const overlap = tileSize * 0.6;

  for (let y = 0; y < (height - tileSize) / (tileSize - overlap); y++) {
    let position = frameCount % 300;

    if (position > 120 && position <= 120 + END_DURATION) {
      position = 120;
    } else if (position > 120 + END_DURATION) {
      position = 300 - position;
    }

    position = easeInOutCubic(position / 120);

    const sy = y * (tileSize - overlap) * position;
    const sh = tileSize * position + (height - tileSize) * (1 - position);
    const dy = y * (tileSize - overlap);

    image(graphic, 0, dy, width, tileSize, 0, sy, width, sh);
  }

  transitionProgress = (frameCount % 300 < 240) ? (frameCount % 300) / 240 : 1;
  updateText();
}

function updateText() {
  graphic.clear();
  let textSize = min(width, height) * 0.7;
  graphic.textSize(textSize);

  while (graphic.textWidth("PORTSHOWLIO '24") > width * 0.95) {
    textSize *= 0.95;
    graphic.textSize(textSize);
  }

  graphic.textAlign(CENTER, CENTER);
  
  const currentColor = color(COLORS[colorIndex]);
  const nextColor = color(COLORS[(colorIndex + 1) % COLORS.length]);
  const interpolatedColor = lerpColor(currentColor, nextColor, transitionProgress);
  
  graphic.fill(interpolatedColor);
  graphic.text("PORTSHOWLIO '24", width / 2, height / 2);
  
  if (frameCount % 300 === 299) {
    colorIndex = (colorIndex + 1) % COLORS.length;
  }
}

function windowResized() {
  const p5Container = document.getElementById("p5-container");
  resizeCanvas(p5Container.clientWidth, p5Container.clientHeight);
  graphic.resizeCanvas(width, height);
  updateText();
}