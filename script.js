  "use strict";
  (function() {

    // Some global variables
    var doAttack;
    var enemyHealth = 150;
    var damage = 10;
    var counter = 0;
    var scream = ["sounds/scream.mp3"];
    var cheer = ["sounds/cheer.mp3"];
    var playList = function() {
    var actions = ["sounds/gut-punch.mp3",
                   "sounds/grunt.mp3",
                   "sounds/slap.mp3",
                   "sounds/super-punch.mp3",
                   "sounds/thwack.mp3",
                   "sounds/upper-cut.mp3",
                   "sounds/woosh.mp3", ]

        // Randomizes sounds made when enemy is hit
        var randomNum = Math.floor(Math.random() * (actions.length));

        // appends audio
        $("<audio autoplay><source src=\"" + actions[randomNum] + "\" type=\"audio/mpeg\"></audio>").css('display', 'none').append("body");
      }

      // Initializes game
    var startGame = function() {
        $(' #container ').css('display', 'block');
        $(' #start-btn ').toggleClass('animated').addClass('fadeOut');
        $(' #ehealth').text(enemyHealth);

        // Activates keydown properties for right and left keys
        $(document).keydown(function(event) {
          if (event.keyCode === 39) {
            $(' #right ').animate({
              'top': '-=140px'}, 50)
            $(' #right ').animate({
              'left': '-=40px'}, 50)
            $(' #right ').animate({
              'top': '+=140px'}, 50)
            $(' #right ').animate({
              'left': '+=40px'}, 50)
            playList();
            myAttack();
          }
        });
        $(document).keydown(function(event) {
          if (event.keyCode === 37) {
            $(' #left ').animate({
              'top': '-=120px'}, 50)
            $(' #left ').animate({
              'left': '-=40px'}, 50)
            $(' #left ').animate({
              'top': '+=120px'}, 50)
            $(' #left ').animate({
              'left': '+=40px'}, 50)
            playList();
            myAttack();
          }
        });
      }

      // Decreases enemy's health to zero to win
    var myAttack = function() {
        $(' #ehealth').text(enemyHealth);
        counter++;
        if (enemyHealth === enemyHealth) {
          $(' #ehealth').text(enemyHealth -= damage);
          console.log(enemyHealth);
          console.log(counter)
        }

        // Progressively changes sprite depending on enemy's health
        // Displays 'YOU WIN!' if conditions are met
        if (enemyHealth === 100) {
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
          $("<audio autoplay><source src=\"" + cheer + "\" type=\"audio/mpeg\"></audio>").css('display', 'none').append("body");
          console.log("You win!");
        }

        // Disables oneHitKill function when hit count is 15 (EX. 15 hits * 10 damage equals 150 damage delt to enemy health)
        if (counter === 15) {
          stopAtttack();
        }
      }

      // Enemy one-hit-kill after 10 seconds
      // Displays 'YOU LOSE!'
    var oneHitKill = function() {
        doAttack = setTimeout(function() {
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

      // Stops oneHitKill function if player wins game
    var stopAtttack = function() {
        clearTimeout(doAttack);
      }

      // Reloads page
    var replayGame = function() {
        location.reload();
      }

      // Buttons
    var myEventListeners = function() {

      // Continues to play music
      $(' #play-btn ').click(function(event) {
        $(' #player ').trigger('play');
        $(' #play-btn ').css('display', 'none');
        $(' #stop-btn ').css('display', 'block');
      });

      // Stops music from playing
      $(' #stop-btn ').click(function(event) {
        $(' #player ').trigger('pause');
        $(' #stop-btn ').css('display', 'none');
        $(' #play-btn ').css('display', 'block');
      });
      $(' #replay ').click(function(event) {
        replayGame();
      });
      $(' #start-btn ').click(function(event) {
        oneHitKill();
        startGame();
      });

      // On click animates right arm
      $(' #btn-right ').click(function(event) {
        $(' #right ').animate({
          'top': '-=140px'}, 50)
        $(' #right ').animate({
          'left': '-=40px'}, 50)
        $(' #right ').animate({
          'top': '+=140px'}, 50)
        $(' #right ').animate({
          'left': '+=40px'}, 50)
        playList();
        myAttack();
      });

      // On click animates left arm
      $(' #btn-left ').click(function(event) {
        $(' #left ').animate({
          'top': '-=120px'}, 50)
        $(' #left ').animate({
          'left': '-=40px'}, 50)
        $(' #left ').animate({
          'top': '+=120px'}, 50)
        $(' #left ').animate({
          'left': '+=40px'}, 50)
        playList();
        myAttack();
      });
    }

    $(document).ready(function() {
      myEventListeners();
    })
  })();
