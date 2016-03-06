// Put John's template engine code here...

// A hash to store our routes:
var routes = {};
//
// function route (path, templateId) {
//   routes[path] = {templateId: templateId, content: HTMLs[templateId]};
// }

var el = null;
function router () {
  // Lazy load view element:
  el = el || $('#main');
  // Current route url (getting rid of '#' in hash as well):
  var url = "/";
  // The regular expression below matches <stuff> in strings
  // that look like #<stuff> or #!<stuff>
  var urlRegex = /#!?(.*)/;
  var urlMatches = urlRegex.exec(location.hash);
  if (urlMatches && urlMatches.length > 1) {
    url = urlMatches[1];
  }
  // Get route by url:
  // var route = routes[url];
  // Do we have a route?
  if (url != '/') {
    // Render route template with John Resig's template engine:
    el.html(HTMLs[url]);
    initCarousel();
    dropy.init();
    // showDrawing();
    // background();
  }
  else {
    el.html(HTMLs['backdrop']);
    initCarousel();
    showDrawing();
    if (history && history.replaceState){
      history.replaceState({}, "", "/");
    }
  }
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);
