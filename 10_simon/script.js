$(document).ready(function(){
  // Global power variable
  var pwr = 0;

  // Audio variables
  var audio1 = document.createElement('audio');
  var audio2 = document.createElement('audio');
  var audio3 = document.createElement('audio');
  var audio4 = document.createElement('audio');
  var audios = [audio1, audio2, audio3, audio4];
  var audioSrc = 'https://s3.amazonaws.com/freecodecamp/';
  audio1.setAttribute('src', audioSrc+'simonSound1.mp3');
  audio2.setAttribute('src', audioSrc+'simonSound2.mp3');
  audio3.setAttribute('src', audioSrc+'simonSound3.mp3');
  audio4.setAttribute('src', audioSrc+'simonSound4.mp3');
  audio1.setAttribute('class','audio1');
  audio2.setAttribute('class','audio2');
  audio3.setAttribute('class','audio3');
  audio4.setAttribute('class','audio4');

  // Animate counter
  function animateCounter() {
    if( $('.power-button').hasClass('power-on') ) {
      $('.counter')
        .delay(300).queue(function(){ 
          $(this).addClass('counter-on').dequeue();})
        .delay(300).queue(function(){ 
          $(this).removeClass('counter-on').dequeue();})
        .delay(300).queue(function(){ 
          $(this).addClass('counter-on').dequeue();})
        .delay(300).queue(function(){ 
          $(this).removeClass('counter-on').dequeue();})
        .delay(300).queue(function(){ 
          $(this).addClass('counter-on').dequeue();})
        .delay(300);
    }
    else { $('.counter').removeClass('counter-on');}
  }
  
  //handle delays
  function handleDelay(initialF, resultF){
    function firstFunction() {
      var deferred = $.Deferred();
      var i = 0;
      var nextStep = function() {
        if (i<initialF.length) {
          initialF[i]();
          i++;
          setTimeout(nextStep, 1400); 
        }
        else { deferred.resolve(i); }
      };
      nextStep();
      return deferred.promise();
    }
    function secondFunction() {
      var promise = firstFunction();
      promise.then(function(result) { 
        resultF();
      });
    }
    secondFunction();    
  };

  // Create sequence object
  var sequence = {
    cache: [],
    counter: 0,
    userCache: [],
    add: function() {
      this.cache.push( Math.floor(Math.random()*4) );
      this.counter++;
      this.displayCounter();
    },
    displayCounter: function() {
      if (this.counter < 10)
        $('.counter').html('0'+this.counter.toString());
      else $('.counter').html(this.counter);      
    },
    play: function() {
      this.displayCounter();
      $('.button').addClass('locked');
      var currCache = this.cache;
      function firstFunction() {
        var deferred = $.Deferred();
        var i = 0;
        var nextStep = function() {
          if (i<currCache.length && pwr === 1) {
            playColor(currCache[i]);
            i++;
            setTimeout(nextStep, 1400); 
          }
          else {
            deferred.resolve(i);
          }
        };
        nextStep();
        return deferred.promise();
      }
      function secondFunction() {
        var promise = firstFunction();
        promise.then(function(result) {
          if (pwr===1) { $('.button').removeClass('locked'); }
          else { $('.button').addClass('locked'); }
        });
      }
      secondFunction();
      this.userCache = [];
    },
    check: function() {
      for (var i=0; i<this.userCache.length; i++) {
        if(this.userCache[i]!==this.cache[i] && pwr === 1) {
          this.userCache = [];
          $('.counter').html('!!');
          handleDelay([animateCounter], 
                      function() { sequence.play() } );
          return true;
        }
      }
      if (this.userCache.length === this.cache.length && pwr === 1) {
        this.add();
        this.play();
      }
    }
  };

  // Animate User pressing buttons
  var colorObj = { 'green': 0, 'red': 1, 'yellow': 2, 'blue': 3};
  $('.button')
    .mousedown(function() {
      if(!$(this).hasClass('locked')) {
        $(this).addClass(
          $(this).attr('class').split(' ')[1]+'-light');
        audios[colorObj[$(this).attr('class').split(' ')[1]]].play();
      }})
    .mouseup(function() {
      if(!$(this).hasClass('locked')) {
        $(this).removeClass(
          $(this).attr('class').split(' ')[1]+'-light');
        sequence.userCache.push(
          colorObj[$(this).attr('class').split(' ')[1]]
        );
        sequence.check();
      }});

  // Animate Computer playing colors
  var colorArr = ['green', 'red', 'yellow', 'blue'];
  function playColor(colorNum){
    if (pwr === 1) {
      $('.'+colorArr[colorNum])
        .delay(700).queue(function(){
          $(this)
            .addClass(colorArr[colorNum]+'-light')
            .dequeue();
          audios[colorNum].play();
          })
        .delay(700).queue(function(){
          $(this)
            .removeClass(colorArr[colorNum]+'-light')
            .dequeue();
        });
    }
  };

  // Reset settings
  function reset() {
      pwr = 0;
      $('.button').stop().clearQueue();
      $('.button').removeClass(function(index, element){
        return (element.match(/-light/g) || []).join(' ');
      });
      sequence.cache = [];
      sequence.counter = 0;
      sequence.userCache = [];
      $('.counter').html('--');
      $('.button').addClass('locked');
  };

  // Power button
  $('.power-switch').click(function(){
    $(this).children('.power-button').toggleClass("power-on");
    $('.counter').toggleClass("counter-on");
    if (pwr === 0) {
      pwr = 1;
      $('.start').removeClass('locked');
    }
    else {
      reset();
      $('.start').addClass('locked');
    }
  });
  
  // Start button
  $('.start').click(function() {
    if(!$(this).hasClass('locked')) {
      reset();
      pwr = 1;
      sequence.add();
      handleDelay([animateCounter], 
                  function() { sequence.play() } );
    }
  });

});
