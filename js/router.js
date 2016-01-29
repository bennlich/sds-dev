
var routes = {};


var el = null;
function router () {
  el = el || $('#main');
  var url = location.hash.slice(1) || '/';
  if (url != '/') {
    el.html(HTMLs[url]);
  }
  else {
    el.html(HTMLs['backdrop']);
    if (history && history.replaceState){
      history.replaceState({}, "", "/");
    }
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
