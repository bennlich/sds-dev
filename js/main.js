
var HTMLs = {
};

function loadHTMLs() {
  $.when(
    $.get('pages/about.html'),
    $.get('projects/saturn.yaml'),
    $.get('templates/project.tmpl.html'))
    .done(function(about, saturn, projectTemplate) {

      HTMLs.about = about[0];

      var projectTemplate = $.templates(projectTemplate[0]),
          render = createRenderFunction(projectTemplate);
      HTMLs.saturn = render(saturn[0]);

      router();
    });
}

function createRenderFunction(tmpl) {
  return function(yaml) {
    var content = jsyaml.load(yaml);
    return tmpl.render(content);
  }
}