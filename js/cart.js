var FC = FC || {};
FC.onLoad = function () {
  FC.client.on("ready.done", function () {
    initCartButton();
  });
};

var cartEl;

function initCartButton() {
  cartEl = $("#shopping-cart");

  setTimeout(function() {
    if (FC.json.item_count > 0) {
      revealCart();
    }
  }, 2000);
}

function revealCart() {
  cartEl.removeClass("hidden ready");
  cartEl.addClass("animated swing");
  cartEl.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    cartEl.removeClass("animated swing");
    cartEl.addClass("ready");
  });

  createShrinkingCircleAtEl(cartEl);
}

// TODO: make this not a global variable
var saturnGlassColor = "RED";

function setSaturnGlassColor(e) {
  var color = e.target.value;
  // should be "RED" or "WHITE"
  saturnGlassColor = color;
}

function addRedSaturnGlassToCart() {
  // unencrypted version https://superduperstudio.foxycart.com/cart?name=Red+Saturn+Glass&price=52&code=redsat&image=http://superduperstudio.net/Pics/Saturn/Red1_v2.jpg
  return FC.client.request("https://"+FC.settings.storedomain+"/cart?name=Red+Saturn+Glass||b87cb4a278d7aebcce94ffcb35c1d19b037390005ecbc7543dee70c999c41f44&price=52||c5a0b89ea23bfc4e2aef0c496c96b0942a4160def9b3c2965cbdffb47ff2faf9&code=redsat||f568cc850340b85fe9ffaba17d23519a1b65d97ce1e0dfebb8b4b42ce9ec3d4c&image=http%3A%2F%2Fsuperduperstudio.net%2FPics%2FSaturn%2FRed1_v2.jpg||593f01bb09a8f9e0352184a56760f38b4c4d17f76fdec35de4bcbe452e3f07c4");
}

function addWhiteSaturnGlassToCart() {
  // unencrypted version https://superduperstudio.foxycart.com/cart?name=White+Saturn+Glass&price=52&code=whitesat&image=http://superduperstudio.net/Pics/Saturn/White1_v2.jpg
  return FC.client.request("https://superduperstudio.foxycart.com/cart?name=White+Saturn+Glass||25181b49f504797e2e3be5d35da195eb28c6dad35a588360871bb72f0c0b0f1b&price=52||d711f6c412cf731ac8f502c212d92afe9507c8b232e47c9ea180eaa783d6e8e7&code=whitesat||f330dd935ee905af986c2fff12caf6a7b7a215ef2609d4245bc14cbec9179d54&image=http%3A%2F%2Fsuperduperstudio.net%2FPics%2FSaturn%2FWhite1_v2.jpg||2f71818d63a71acf457c9f6e7fd4b31c1289a7653d0f65995d1f21c77621d3de");
}

function addSaturnGlassToCart() {
  var purchaseFn;
  if (saturnGlassColor === "RED") {
    purchaseFn = addRedSaturnGlassToCart;
  }
  else {
    purchaseFn = addWhiteSaturnGlassToCart;
  }

  purchaseFn().done(function(dataJSON) {
    revealCart();
  });
}