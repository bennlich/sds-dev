var animCanvas, animCtx;

// init canvas
$(window).bind("resize load", function() {
  var w = $(window).width();
  var h = $(window).height();
  
  animCanvas = document.getElementById("animation-layer");
  animCtx = animCanvas.getContext("2d");

  animCanvas.width = w;
  animCanvas.height = h;
});

var shapes = [];

function ShrinkingCircle(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 50;
  this.color = "rgb(0,0,0)";
}

ShrinkingCircle.prototype.draw = function(ctx) {
  ctx.save();
  ctx.strokeColor = this.color;
  ctx.translate(this.x, this.y);
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, Math.PI*2);
  ctx.stroke();
  ctx.restore();
}

ShrinkingCircle.prototype.step = function() {
  this.radius *= 0.8;
  if (this.radius < 1) {
    return { done: true };
  }
  return { done: false };
}

function createShrinkingCircleAtEl(el) {
  var pos = el.offset(),
      width = el.width(),
      height = el.height();
  createShrinkingCircle(pos.left + width/2, pos.top + height/2);
}

function createShrinkingCircle(x, y) {
  var circ = new ShrinkingCircle(x, y);
  shapes.push(circ);
  startDrawLoop();
}

var animId;
function startDrawLoop() {
  animId = requestAnimationFrame(drawLoop);
}

function drawLoop() {
  if (shapes.length === 0) {
    window.cancelAnimationFrame(animId);
    return;
  }

  animCtx.clearRect(0, 0, animCanvas.width, animCanvas.height);

  for (var i = 0; i < shapes.length; i++) {
    var result = shapes[i].step();
    if (result.done) {
      shapes.splice(i, 1);
      i--;
    }
    else {
      shapes[i].draw(animCtx);
    }
  }

  startDrawLoop();
}