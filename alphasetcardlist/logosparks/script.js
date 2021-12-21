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