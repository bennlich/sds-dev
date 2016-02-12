var carousel, globalSlick;

// var colorSwitch = true;
var HTMLs = {
};

function initCarousel() {
  carousel = $('.carousel');

  carousel.on("init", function(event, slick) {
    $("#current-image").html(1+slick.currentSlide);
    $("#total-images").html(slick.slideCount);
  });

  carousel.slick({
    slidesToShow: 1,
    infinite: true,
    arrows: false
  });

  // Update the current image counter when the carousel scrolls
  carousel.on("afterChange", function(event, slick, currentSlide) {
    $("#current-image").html(1+currentSlide);
  });

  // If there are vimeo players, pause them when the carousel scrolls
  var vimeoPlayers = document.querySelectorAll('iframe');
  if (vimeoPlayers.length > 0) {
    carousel.on("afterChange", function(event, slick, currentSlide) {
      for (var i = 0; i < vimeoPlayers.length; i++) {
        var player = vimeoPlayers[i];
        $f(player).api("pause");
      }
    });
  }
}

function prev() {
  carousel.slick('slickPrev');
}

function next() {
  carousel.slick('slickNext');
}

function loadHTMLs() {
  $.when(
    $.get('partials/backdrop.html'),
    $.get('pages/current.html'),
    $.get('pages/archive.html'),
    $.get('pages/about.html'),
    $.get('pages/cv.html'),
    $.get('projects/bridge.yaml'),
    $.get('projects/frog.yaml'),
    $.get('projects/instructions.yaml'),
    $.get('projects/MFAExhibition.yaml'),
    $.get('projects/orbitconditions.yaml'),
    $.get('projects/pfsc.yaml'),
    $.get('projects/pips.yaml'),
    $.get('projects/pluto.yaml'),
    $.get('projects/satellites.yaml'),
    $.get('projects/saturn.yaml'),
    $.get('projects/wassiliscope.yaml'),
    $.get('projects/expandingdimensions.yaml'),
    $.get('projects/FullerMoon.yaml'),
    $.get('templates/project.tmpl.html'))
    .done(function(backdrop, current, archive, about, cv, bridge,
                   frog, instructions, MFAExhibition, orbitconditions,
                   pfsc, pips, pluto, satellites, saturn, wassiliscope, expandingdimensions, 
                   FullerMoon, projectTemplate) {
      HTMLs.backdrop = backdrop[0];
      HTMLs.current = current[0];
      HTMLs.archive = archive[0];
      HTMLs.about = about[0];
      HTMLs.cv = cv[0];

      var projectTemplate = $.templates(projectTemplate[0]),
          render = createRenderFunction(projectTemplate);
      
      HTMLs.bridge = render(bridge[0]);
      HTMLs.frog = render(frog[0]);
      HTMLs.instructions = render(instructions[0]);
      HTMLs.MFAExhibition = render(MFAExhibition[0]);
      HTMLs.orbitconditions = render(orbitconditions[0]);
      HTMLs.pfsc = render(pfsc[0]);
      HTMLs.pips = render(pips[0]);
      HTMLs.pluto = render(pluto[0]);
      HTMLs.satellites = render(satellites[0]);
      HTMLs.saturn = render(saturn[0]);
      HTMLs.wassiliscope = render(wassiliscope[0]);
      HTMLs.expandingdimensions = render(expandingdimensions[0]);
      HTMLs.FullerMoon = render(FullerMoon[0]);
      router();
    });
}

function createRenderFunction(tmpl) {
  return function(yaml) {
    var content = jsyaml.load(yaml);
    return tmpl.render(content);
  }
}

function nav() {
  $.get('partials/nav.html', function(data) {
    navHTML = data;
    $('#nav').html(navHTML);
    glyphRandomizer();
    showDrawing();
    if ($(window).width() > 1200) {
      // only do hover events on non-touch devices
      bindNavMouseOverEvents();
    }
  });
}

function bindNavMouseOverEvents() {
  var navLinks = $(".navText a");
  for (var i = 0; i < navLinks.length; i++) {
    var curLink = $(navLinks[i]);
    var idx = i;
    curLink.hover(function() {
      show(this.idx);
    }.bind({ idx: idx }), function() {
      hide(this.idx);
    }.bind({ idx: idx }));
  }
}

var mainDrawings = ["Pics/logo1.svg", "Pics/logo2.svg", "Pics/logo3.svg"];
var backgroundIMGs = ["Pics/Splash/FullerMoonHomepage.jpg"];
var backgroundIMGsMobile = ["Pics/Splash/FullerMoonHomepagePortrait.jpg"];
var mainDrawing = null;
var bgImage = null;
var random = null;

function thisIsAPhone() {
  // TODO: There might be more reliable ways to determine if this is a phone.
  return ($(window).width() <= 720);
}

function getRandomBackgroundImg() {
  if (thisIsAPhone()) {
    return backgroundIMGsMobile[Math.floor(Math.random()*backgroundIMGsMobile.length)];
    //change text color for dark background images
    // if(backgroundIMGsMobile() == 2){
    //   $("#nav").attr('color', #FFFFFF);
    // };
  }
  return backgroundIMGs[Math.floor(Math.random()*backgroundIMGs.length)];
  // //change text color for dark background images
  // if(backgroundIMGsMobile() == 2){
  //     $("#nav").attr('color', #FFFFFF);
  //   };
}

function selectDrawing() {
  random = 1+Math.floor(Math.random()*3);
  mainDrawing = mainDrawings[random-1];
  bgImage = getRandomBackgroundImg();
  $("#draw").attr('src', mainDrawing);
  // colorSwitch = true;
  console.log(random, mainDrawings[random], "re-rolled");
}

function preloader() {
  // if (colorSwitch == false){
  selectDrawing();
  // }

  //preload glyphs--------------------------------->
  imageDrawObj1 = new Image();
  // set image list
  glyphs = [
    "Pics/d1g1.svg",
    "Pics/d1g2.svg",
    "Pics/d1g3.svg",
    "Pics/d2g1.svg",
    "Pics/d2g2.svg",
    "Pics/d2g3.svg",
    "Pics/d3g1.svg",
    "Pics/d3g2.svg",
    "Pics/d3g3.svg"
  ];

  // start preloading glyphs
  for (var i = 0; i < glyphs.length; i++) {
    imageDrawObj1.src = glyphs[i];
  }
  
  // //preload small glyphs--------------------------------->
  // imageDrawObj2 = new Image();
  // // set image list
  // glyphsSM = [];
  // glyphsSM[0]="Pics/d1sg1.svg";
  // glyphsSM[1]="Pics/d1sg2.svg";
  // glyphsSM[2]="Pics/d1sg3.svg";
  // glyphsSM[3]="Pics/d2sg1.svg";
  // glyphsSM[4]="Pics/d2sg2.svg";
  // glyphsSM[5]="Pics/d2sg3.svg";
  // glyphsSM[6]="Pics/d3sg1.svg";
  // glyphsSM[7]="Pics/d3sg2.svg";
  // glyphsSM[8]="Pics/d3sg3.svg";
  // // start preloading glyphs
  // for (var i = 0; i < glyphsSM.length; i++) {
  //   imageDrawObj2.src = glyphsSM[i];
  // }

  imageDrawObj3 = new Image();
  // set image list
  previews = [
    "Pics/PIPS/preview.jpg",
    "Pics/Instructions/preview_web.jpg",
    "Pics/OrbitConditions/preview_web.jpg",
    "Pics/Satellites/preview.jpg",
    "Pics/PIPS/preview.jpg",
    "Pics/Instructions/preview_web.jpg",
    "Pics/Wassiliscope/preview2.jpg",
    "Pics/MFAExhibition/preview.jpg",
    "Pics/Title.svg",
    "Pics/Frog/preview.jpg",
    "Pics/Pluto/preview.jpg",
    "Pics/Saturn/preview_v4.jpg",
    "Pics/Bridge/preview.jpg",
    "Pics/PFSC/preview.jpg",
    "Pics/blogPreview.svg",
    "Pics/FullerMoon/Preview.jpg"
  ];
  // missing images
  // previews[3]="Pics/ProcessDrawings/preview.jpg";
  // previews[10]="Pics/Flags/preview.jpg";

  // start preloading glyphs
  for (var i = 0; i < previews.length; i++) {
    imageDrawObj3.src = previews[i];
  }
  loadHTMLs();
  nav();
  console.log("loaded");
}

function showDrawing() {
  $("#draw").attr("src", mainDrawing);
  setBackgroundImage(bgImage);
}

function setBackgroundImage(url) {
  $("#background-link").css("background-image", "url('"+url+"')");
}

// function preloadProj() {
//   // if (colorSwitch == false){
//     random = 1+Math.floor(Math.random()*3);
//     var mainDrawing = mainDrawings[random-1];
//     var bgImage = backgroundIMGs[Math.floor(Math.random()*3)];
//     $("#draw").attr('src', mainDrawing);
//     $("body").attr('background', bgImage);
//     colorSwitch = true;
//     console.log(random, mainDrawings[random], "re-rolled");
//   // }

//   //preload glyphs--------------------------------->
//   // counter
//     // create object
//     imageDrawObj1 = new Image();
//     // set image list
//     glyphs = new Array();
//     glyphs[0]="Pics/d1g1.svg";
//     glyphs[1]="Pics/d1g2.svg";
//     glyphs[2]="Pics/d1g3.svg";
//     glyphs[3]="Pics/d2g1.svg";
//     glyphs[4]="Pics/d2g2.svg";
//     glyphs[5]="Pics/d2g3.svg";
//     glyphs[6]="Pics/d3g1.svg";
//     glyphs[7]="Pics/d3g2.svg";
//     glyphs[8]="Pics/d3g3.svg";
//     // start preloading glyphs
//     for(var i=0; i<glyphs.length; i++) {
//       imageDrawObj1.src=glyphs[i];
//     }
//     glyphRandomizer();
//     loadHTMLs();
//     // $.get('2d_v2.html', function(data) {
//     //  bodyHTML = data;
//     // });
//     nav();
//     console.log("loaded");
// };

// var glyphDrawings = ["Pics/g1.svg", "Pics/g2.svg", "Pics/g3.svg"];
var gD = null;
function glyphRandomizer() {
  if (random == 1) {
    gD = glyphs[Math.floor(Math.random()*3)];
  }
  if (random == 2) {
    gD = glyphs[3+Math.floor(Math.random()*3)];
  }
  if (random == 3) {
    gD = glyphs[6+Math.floor(Math.random()*3)];
  }
  $(".glyphIMG").attr('src', gD);
}

// var gDSM = null;
// function glyphRandomizerSM() {
//   if (random == 1) {
//     gDSM = glyphsSM[Math.floor(Math.random()*3)];
//   }
//   if (random == 2) {
//     gDSM = glyphsSM[3+Math.floor(Math.random()*3)];
//   }
//   if (random == 3) {
//     gDSM = glyphsSM[6+Math.floor(Math.random()*3)];
//   }
//   $(".glyphIMGSM").attr('src', gDSM);
// }

function show(idx){
  $("#nav"+idx).css({ opacity: 1 });
}

function hide(idx) {
  glyphRandomizer();
  $("#nav"+idx).css({ opacity: 0 });
}

// var previewIMGs = [
//   "Pics/Satellites/preview.jpg", 
//   "Pics/PFSC/preview.jpg",
//   "Pics/PIPS/preview.jpg", 
//   "Pics/Instructions/preview_web.jpg", 
//   "Pics/OrbitConditions/preview_web.jpg", 
//   "Pics/Wassiliscope/preview2.jpg",
//   "Pics/MFAExhibition/preview.jpg",
//   "Pics/ProcessDrawings/preview.jpg"
// ];

// function previewStart() {
//   // randPrev = glyphs[Math.floor(Math.random()*preview2DIMGs.length)];
//   $(".preview").attr('src', mainDrawing);
// }

// function preview(p) {
//   $(".preview").attr('src', previewIMGs[p-1]);
//   $(".preview").css({ opacity: 1 });
//   // var gD = glyphsSM[Math.floor(Math.random()*3)];
//   // $(".glyphBoxSM").css({ opacity: 1 });
//   // $(".glyphImgSM").css({ opacity: 1 });
//   $("#"+p).css({ opacity: 1 });
//   $(".drawing").css({ opacity: 0 });
//   console.log(gD);
//   console.log(p);
// }

// var previewArchiveIMGs = ["Pics/blogPreview.svg", "Pics/Flags/preview.jpg", "Pics/Frog/preview.jpg", "Pics/Pluto/preview.jpg", "Pics/Saturn/preview.jpg", "Pics/Bridge/preview.jpg"];

// function previewArchive(p) {
//   $(".preview").attr('src', previewArchiveIMGs[p-1]);
//   $(".preview").css({ opacity: 1 });
//   $("#"+p).css({ opacity: 1 });
//   $(".drawing").css({ opacity: 0 });
//   console.log(gD);
//   console.log(p);
// }