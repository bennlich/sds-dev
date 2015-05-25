
// var colorSwitch = true;
var HTMLs = {
};

function initCarousel() {
	$('.jcarousel')
    .on('jcarousel:create jcarousel:reload', function() {
      var element = $(this),
          width = element.innerWidth();

      // This shows 1 item at a time.
      // Divide `width` to the number of items you want to display,
      // eg. `width = width / 3` to display 3 items at a time.
      element.jcarousel('items').css('width', width + 'px');
    })
    .jcarousel({
      wrap: 'circular',
      center: true
    })
    .jcarouselAutoscroll({
      interval: 4000,
      target: '+=1',
      autostart: false
    });
}

function loadHTMLs() {
	$.when(
		$.get('partials/backdrop.html'),
		$.get('pages/current.html'),
		$.get('pages/archive.html'),
		$.get('pages/about.html'),
		$.get('projects/bridge.html'),
		$.get('projects/frog.html'),
		$.get('projects/instructions.html'),
		$.get('projects/MFAExhibition.html'),
		$.get('projects/orbitconditions.html'),
		$.get('projects/pfsc.html'),
		$.get('projects/pips.html'),
		$.get('projects/pluto.html'),
		$.get('projects/satellites.html'),
		$.get('projects/saturn.html'),
		$.get('projects/wassiliscope.html'),
		$.get('pages/cv.html'))
		.done(function(backdrop, current, archive, about, bridge, frog, instructions, MFAExhibition, orbitconditions, pfsc, pips, pluto, satellites, saturn, wassiliscope, cv) {
			HTMLs.backdrop = backdrop[0];
			HTMLs.current = current[0];
			HTMLs.archive = archive[0];
			HTMLs.about = about[0];
			HTMLs.bridge = bridge[0];
			HTMLs.frog = frog[0];
			HTMLs.instructions = instructions[0];
			HTMLs.MFAExhibition = MFAExhibition[0];
			HTMLs.orbitconditions = orbitconditions[0];
			HTMLs.pfsc = pfsc[0];
			HTMLs.pips = pips[0];
			HTMLs.pluto = pluto[0];
			HTMLs.satellites = satellites[0];
			HTMLs.saturn = saturn[0];
			HTMLs.wassiliscope = wassiliscope[0];
			HTMLs.cv = cv[0];
			router();
		});
}

function prev() {
 	$('.jcarousel').jcarousel('scroll', '-=1');
}

function next() {
 	$('.jcarousel').jcarousel('scroll', '+=1');
}
var random = null;

function nav() {
  $.get('partials/nav.html', function(data) {
  	navHTML = data;
  	$('#nav').html(navHTML);
  	glyphRandomizer();
  	glyphRandomizerSM();
  	showDrawing()
  });
}
var mainDrawings = ["Pics/logo1.svg", "Pics/logo2.svg", "Pics/logo3.svg"];
var backgroundIMGs = ["Pics/Splash/Saturn_v2.jpg"];
var mainDrawing = null;
var bI = null;
function selectDrawing() {
	random = 1+Math.floor(Math.random()*3);
	mainDrawing = mainDrawings[random-1];
	bI = backgroundIMGs[Math.floor(Math.random()*backgroundIMGs.length)];
	$("#draw").attr('src', mainDrawing);
	// colorSwitch = true;
	console.log(random, mainDrawings[random], "re-rolled");
}

function preloader() {
	// if (colorSwitch == false){
	selectDrawing();
	// }

	//preload glyphs--------------------------------->
	// counter
  // create object
  imageDrawObj1 = new Image();
  // set image list
  glyphs = new Array();
  glyphs[0]="Pics/d1g1.svg";
  glyphs[1]="Pics/d1g2.svg";
  glyphs[2]="Pics/d1g3.svg";
  glyphs[3]="Pics/d2g1.svg";
  glyphs[4]="Pics/d2g2.svg";
  glyphs[5]="Pics/d2g3.svg";
  glyphs[6]="Pics/d3g1.svg";
  glyphs[7]="Pics/d3g2.svg";
  glyphs[8]="Pics/d3g3.svg";
  // start preloading glyphs
  for(var i=0; i<glyphs.length; i++) 
  {
     imageDrawObj1.src=glyphs[i];
  }
  	//preload small glyphs--------------------------------->
// counter
  // create object
  imageDrawObj2 = new Image();
  // set image list
  glyphsSM = new Array();
  glyphsSM[0]="Pics/d1sg1.svg";
  glyphsSM[1]="Pics/d1sg2.svg";
  glyphsSM[2]="Pics/d1sg3.svg";
  glyphsSM[3]="Pics/d2sg1.svg";
  glyphsSM[4]="Pics/d2sg2.svg";
  glyphsSM[5]="Pics/d2sg3.svg";
  glyphsSM[6]="Pics/d3sg1.svg";
  glyphsSM[7]="Pics/d3sg2.svg";
  glyphsSM[8]="Pics/d3sg3.svg";
  // start preloading glyphs
  for(var i=0; i<glyphsSM.length; i++) {
    imageDrawObj2.src=glyphsSM[i];
  }
  imageDrawObj3 = new Image();
  // set image list
  previews = new Array();
  previews[0]="Pics/PIPS/preview.jpg";
  previews[1]="Pics/Instructions/preview_web.jpg";
  previews[2]="Pics/OrbitConditions/preview_web.jpg";
  previews[3]="Pics/ProcessDrawings/preview.jpg";
	previews[4]="Pics/Satellites/preview.jpg";
	previews[5]="Pics/PIPS/preview.jpg";
	previews[6]="Pics/Instructions/preview_web.jpg";
	previews[7]="Pics/Wassiliscope/preview2.jpg";
	previews[8]="Pics/MFAExhibition/preview.jpg";
	previews[9]="Pics/Title.svg";
	previews[10]="Pics/Flags/preview.jpg";
	previews[11]="Pics/Frog/preview.jpg";
	previews[12]="Pics/Pluto/preview.jpg";
	previews[13]="Pics/Saturn/preview_v4.jpg";
	previews[14]="Pics/Bridge/preview.jpg";
	previews[15]="Pics/PFSC/preview.jpg";
	previews[15]="Pics/blogPreview.svg";


  // start preloading glyphs
  for(var i=0; i<previews.length; i++) {
    imageDrawObj3.src=previews[i];
  }
  loadHTMLs();
  // $.get('2d_v2.html', function(data) {
  // 	bodyHTML = data;
  // });
  nav();
  console.log("loaded");
};
function showDrawing() {
	$("#draw").attr('src', mainDrawing);
	$(".drawing").css({ opacity: 1 });
	console.log("mainDrawn");
	$("#backgroundIMG").attr('src', bI);
	console.log("backgrounded");
}
function preloadProj() {
	// if (colorSwitch == false){
		random = 1+Math.floor(Math.random()*3);
		var mainDrawing = mainDrawings[random-1];
		var bI = backgroundIMGs[Math.floor(Math.random()*3)];
		$("#draw").attr('src', mainDrawing);
		$("body").attr('background', bI);
		colorSwitch = true;
		console.log(random, mainDrawings[random], "re-rolled");
	// }

	//preload glyphs--------------------------------->
	// counter
    // create object
    imageDrawObj1 = new Image();
    // set image list
    glyphs = new Array();
    glyphs[0]="Pics/d1g1.svg";
    glyphs[1]="Pics/d1g2.svg";
    glyphs[2]="Pics/d1g3.svg";
    glyphs[3]="Pics/d2g1.svg";
    glyphs[4]="Pics/d2g2.svg";
    glyphs[5]="Pics/d2g3.svg";
    glyphs[6]="Pics/d3g1.svg";
    glyphs[7]="Pics/d3g2.svg";
    glyphs[8]="Pics/d3g3.svg";
    // start preloading glyphs
    for(var i=0; i<glyphs.length; i++) 
    {
       imageDrawObj1.src=glyphs[i];
    }
    glyphRandomizer();
    loadHTMLs();
    // $.get('2d_v2.html', function(data) {
    // 	bodyHTML = data;
    // });
    nav();
    console.log("loaded");
};

// var glyphDrawings = ["Pics/g1.svg", "Pics/g2.svg", "Pics/g3.svg"];
var gD = null;
function glyphRandomizer() {
	if (random == 1){
		gD = glyphs[Math.floor(Math.random()*3)];
	}
	if (random == 2){
		gD = glyphs[3+Math.floor(Math.random()*3)];
	}
	if (random == 3){
		gD = glyphs[6+Math.floor(Math.random()*3)];
	}
	$(".glyphIMG").attr('src', gD);
}
var gDSM = null;
function glyphRandomizerSM() {
	if (random == 1){
		gDSM = glyphsSM[Math.floor(Math.random()*3)];
	}
	if (random == 2){
		gDSM = glyphsSM[3+Math.floor(Math.random()*3)];
	}
	if (random == 3){
		gDSM = glyphsSM[6+Math.floor(Math.random()*3)];
	}
	$(".glyphIMGSM").attr('src', gDSM);

}

function show(p){
	
	var menuNum = "#"+"nav"+p;
	$(menuNum).css({ opacity: 1 });
	console.log(gD, menuNum);
};
var previewIMGs = [
	"Pics/Satellites/preview.jpg", 
	"Pics/PFSC/preview.jpg",
	"Pics/PIPS/preview.jpg", 
	"Pics/Instructions/preview_web.jpg", 
	"Pics/OrbitConditions/preview_web.jpg", 
	"Pics/Wassiliscope/preview2.jpg",
	"Pics/MFAExhibition/preview.jpg",
	"Pics/ProcessDrawings/preview.jpg"
];
var p = null;
function previewStart() {
	// randPrev = glyphs[Math.floor(Math.random()*preview2DIMGs.length)];
	$(".preview").attr('src', mainDrawing);
}
function preview(p) {
	$(".preview").attr('src', previewIMGs[p-1]);
	$(".preview").css({ opacity: 1 });
	// var gD = glyphsSM[Math.floor(Math.random()*3)];
	// $(".glyphBoxSM").css({ opacity: 1 });
	// $(".glyphImgSM").css({ opacity: 1 });
	$("#"+p).css({ opacity: 1 });
	$(".drawing").css({ opacity: 0 });
	console.log(gD);
	console.log(p);
};

var previewArchiveIMGs = ["Pics/blogPreview.svg", "Pics/Flags/preview.jpg", "Pics/Frog/preview.jpg", "Pics/Pluto/preview.jpg", "Pics/Saturn/preview.jpg", "Pics/Bridge/preview.jpg"];
var p = null;

function previewArchive(p) {
	$(".preview").attr('src', previewArchiveIMGs[p-1]);
	$(".preview").css({ opacity: 1 });
	$("#"+p).css({ opacity: 1 });
	$(".drawing").css({ opacity: 0 });
	console.log(gD);
	console.log(p);
};

function hide(p) {
	glyphRandomizer();
	glyphRandomizerSM();
	$(".drawing").css({ opacity: 1 });
	$(".preview").css({ opacity: 0 });
	$("#nav"+p).css({ opacity: 0 });
	$("#"+p).css({ opacity: 0 });
}