  "use strict";
// perspective .rotate z
(function() {

//Global Variables
  // var keycodes = event.keycode;
  // var body = $('body');
  var doAttack;
  var $left = $(' #left');
  var $right = $(' #right');
  var enemyHealth = 150;
  var damage = 10;
  var counter = 0;
  var scream = ["sounds/scream.mp3"];

  var playList = function() {
    var actions =  [
    "sounds/gut-punch.mp3",
    "sounds/grunt.mp3",
    "sounds/slap.mp3",
    "sounds/super-punch.mp3",
    "sounds/thwack.mp3",
    "sounds/upper-cut.mp3",
    "sounds/woosh.mp3",
  ]

 var randomNum = Math.floor(Math.random() * (actions.length));

 // Used stack overflow post to figure out how to actually play sounds
  //Also how to correctly add the audio elements to the DOM
  // http://stackoverflow.com/questions/20227266/play-random-sounds-without-repeat
    $("<audio autoplay><source src=\"" + actions[randomNum] + "\" type=\"audio/mpeg\"></audio>").css('display', 'none').append("body");

}


// INITIALIZES GAME
var startGame = function() {
  $(' #container ').css('display', 'block');
  $(' #start-btn ').toggleClass('animated').addClass('fadeOut');
  $(' #ehealth').text(enemyHealth);

//ACTIVATES KEYDOWN PROPERTIES
  $(document).keydown(function(event) {
    if (event.keyCode === 39 ) {
    $(' #right ').animate({'top': '-=140px'}, 50)
    $(' #right ').animate({'left': '-=40px'}, 50)
    $(' #right ').animate({'top': '+=140px'}, 50)
    $(' #right ').animate({'left': '+=40px'}, 50)
    playList();
    myAttack();
  }
 });

$(document).keydown(function(event) {
    if ( event.keyCode === 37 ) {
    $(' #left ').animate({'top': '-=120px'}, 50)
    $(' #left ').animate({'left': '-=40px'}, 50)
    $(' #left ').animate({'top': '+=120px'}, 50)
    $(' #left ').animate({'left': '+=40px'}, 50)
    playList();
    myAttack();
  }
});

}

//DECREASE ENEMY HEALTH TO ZERO
//YOU WIN WHEN ENEMY IS DEFEATED
var myAttack = function() {

  $(' #ehealth').text(enemyHealth);
  counter ++;

     if (enemyHealth === enemyHealth) {
        (enemyHealth -= damage);
         console.log(enemyHealth);
         console.log(counter)

             }

     if (enemyHealth  === 100) {
      $(' .enemy ').toggleClass('phase1');
        console.log(enemyHealth);
    }
     if (enemyHealth === 70) {
      $(' .enemy ').removeClass('phase1');
      $(' .enemy ').toggleClass('phase2');
    }

     if (enemyHealth === 50) {
      $(' .enemy ').removeClass('phase2');
      $(' .enemy ').toggleClass('phase3');
    }

    if (enemyHealth === 20) {
      $(' .enemy ').removeClass('phase3');
      $(' .enemy ').toggleClass('phase4');
    }

      if (enemyHealth <= 0) {
      $(' #ehealth').css('display', 'none');
      $(' #left ').css('display', 'none');
      $(' #right ').css('display', 'none');
      $(' #btn-left ').css('display', 'none');
      $(' #btn-right ').css('display', 'none');
      $(' .enemy ').css('display', 'none');
      $(' #replay').css('display', 'block');
      $(' #win ').css('display', 'block').toggleClass('animated').addClass('bounceInDown');
        console.log("You win!");
    }

    if (counter === 15) {
        stopAtttack();
    }
  }

// ENEMY ONE HIT KILL AFTER 10 SECS
// DISPLAYS YOU LOSE
var oneHitKill = function() {
    doAttack = setTimeout(function(){
      $(' .enemy ').removeClass('phase4');
      $(' .enemy ').toggleClass('phase5');
      $(' #ehealth').css('display', 'none');
      $(' #left ').css('display', 'none');
      $(' #right ').css('display', 'none');
      $(' #btn-left ').css('display', 'none');
      $(' #btn-right').css('display', 'none');
      $(' #container ').first().toggleClass('animated').addClass('shake');
      $(' #lose ').css('display', 'block').toggleClass('animated').addClass('bounceInDown');
       $(' #replay').css('display', 'block');
       $("<audio autoplay><source src=\"" + scream + "\" type=\"audio/mpeg\"></audio>").css('display', 'none').append("body");
      console.log("You lose!");
     }, 10000);
}

var stopAtttack = function() {
    clearTimeout(doAttack);
}

  var replayGame = function(){
    location.reload();
  }

 var  myEventListeners = function() {

  $(' #replay ').click(function(event) {
      replayGame();
  });

$(' #start-btn ').click(function(event) {
    oneHitKill();
      startGame();

});
$( "#target" ).keydown(function() {

});

//ON CLICK ANIMATES RIGHT ARM
$(' #btn-right ').click(function(event) {
    $(' #right ').animate({'top': '-=140px'}, 50)
    $(' #right ').animate({'left': '-=40px'}, 50)
    $(' #right ').animate({'top': '+=140px'}, 50)
    $(' #right ').animate({'left': '+=40px'}, 50)
      playList();
      myAttack();
  });
//ON CLICK ANIMATES LEFT ARM
$(' #btn-left ').click(function(event) {
    $(' #left ').animate({'top': '-=120px'}, 50)
    $(' #left ').animate({'left': '-=40px'}, 50)
    $(' #left ').animate({'top': '+=120px'}, 50)
    $(' #left ').animate({'left': '+=40px'}, 50)
      playList();
      myAttack();
  });

}

  $(document).ready(function(){
    myEventListeners();
  })

})();

