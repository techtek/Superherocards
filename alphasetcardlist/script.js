/*
script for generaing a pdf  
*/

$('#cmd').click(function() {
  var options = {
  };
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.addHTML($("#content"), 15, 15, options, function() {
    pdf.save('pageContent.pdf');
  });
});




/*
Holo Effects script 

  using 
    - an animated gif of sparkles.
    - an animated gradient as a holo effect.
    - color-dodge mix blend mode
  
*/
var x;
var $cards = $(".card");
var $style = $(".hover");

$cards
  .on("mousemove touchmove", function(e) { 
    // normalise touch/mouse
    var pos = [e.offsetX,e.offsetY];
    e.preventDefault();
    if ( e.type === "touchmove" ) {
      pos = [ e.touches[0].clientX, e.touches[0].clientY ];
    }
    var $card = $(this);
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.height();
    var w = $card.width();
    var px = Math.abs(Math.floor(100 / w * l)-100);
    var py = Math.abs(Math.floor(100 / h * t)-100);
    var pa = (50-px)+(50-py);
    // math for gradient / background positions
    var lp = (50+(px - 50)/1.5);
    var tp = (50+(py - 50)/1.5);
    var px_spark = (50+(px - 50)/7);
    var py_spark = (50+(py - 50)/7);
    var p_opc = 20+(Math.abs(pa)*1.5);
    var ty = ((tp - 50)/2) * -1;
    var tx = ((lp - 50)/1.5) * .5;
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
    var opc = `opacity: ${p_opc/100};`
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `
    // set / apply css class and style
    $cards.removeClass("active");
    $card.removeClass("animated");
    $card.attr( "style", tf );
    $style.html(style);
    if ( e.type === "touchmove" ) {
      return false; 
    }
    clearTimeout(x);
  }).on("mouseout touchend touchcancel", function() {
    // remove css, apply custom animation on end
    var $card = $(this);
    $style.html("");
    $card.removeAttr("style");
    x = setTimeout(function() {
      $card.addClass("animated");
    },2500);
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*
logo sparkles
  
*/

var logo = $(".Logo");
var logoEmitter = $("#LogoEmitter");
var logoTimeline = new TimelineMax();
var particles = ["normal", "dark", "bright"];

function getRandom(low, high) {
  return Math.floor(Math.random() * (1 + high - low)) + low;
}

function zigZag(item, duration, timeline) {
  timeline.play(0);
}

for (var i = 0; i < 40; i++) {
  var x = getRandom(-60, 65),
    y = getRandom(65, 65),
      startX = i % 2 == 0 ? i * 2.5 : -1 * (i * 2.5),
    negative = getRandom(0, 1) == 1 ? -1 : 1,
    degree = getRandom(90, 180),
    particle = $('<div class="particle"></div>'),
    fill = $('<div class="fill"></div>'),
    duration = getRandom(8, 15), // travel time
    theDelay = getRandom(0, 8),
    particleMovement = new TimelineMax();

  fill.addClass(particles[getRandom(0, particles.length - 1)]);
  particle.append(fill);
  logoEmitter.append(particle); //add it to emitter

  // Create the small movements in each particle
  // indepenedent of the path
  particleMovement.to(
    fill,
    duration / 2,
    {
      x: "+=" + getRandom(-5, 5),
      y: "+=" + getRandom(-5, 5),
      ease: Back.easeOut.config(1.4)
      
    },
    getRandom(0, 2)
  );
  particleMovement.to(
    fill,
    duration / 2,
    {
      x: "+=" + getRandom(-5, 5),
      y: "+=" + getRandom(-2, 2),
      ease: Back.easeOut.config(1.4)
      
    },
    getRandom(0, 2)
  );

  // Set initatial position of the particle based on if its neg or not
  if (y * negative > 0) {
    TweenMax.set(particle, { y: "+=37px", x: '+='+startX });
  } else {
    TweenMax.set(particle, { y: "-=25px", x: '+='+startX });
  }

  logoTimeline.to(
    particle,
    duration,
    {
      x: '+='+x,
      y: '+='+ (negative * y),
      opacity: 0,
      ease: Power1.easeOut,
      repeat: -1,
      scale: getRandom(0.98,1),
      repeatDelay: theDelay,
      transformOrgin: "50% 50%",
      onRepeat: zigZag,
      onRepeatParams: [fill, duration, particleMovement],
      onStartParams: [fill, duration, particleMovement],
      onStart: zigZag
    },
    theDelay
  );
}


var blueParticles = ['blue', 'darkBlue', 'lightBlue']

























