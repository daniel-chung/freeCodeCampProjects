/* Notes
- Right now when I press negative at 1:xx, then i drop to 0:55 & 0 min setting
- Still need to fix the fill
*/

$(document).ready(function() {

  // Default values
  var currBreak = 300,
    currSession = 1500,
    allowSettingChange = 1,
    type = 'Session',
    nIntervId
    ;

  var audio = new Audio('http://soundbible.com/grab.php?id=1599&type=mp3');

  // Timer Object
  function timerObj() {
    this.sec;
    this.reset = function(s) {
      this.sec = s;
    };
    this.returnTime = function() {
      var pad = function(t) {
        var r = t % 60;
        if (r < 10) return '0' + r;
        else return r;
      };
      var sec = pad(this.sec);
      var min = Math.floor(this.sec / 60);
      return min + ":" + sec;
    };
    this.returnMin = function() {
      return Math.floor(this.sec / 60);
    };
    this.dropSec = function() {
      this.sec--;
    };
  }
  // Create sesh obj
  var sessionObj = new timerObj();

  // Start
  sessionObj.reset(currSession);

  // Display default
  $('.settingBreak').html(Math.floor(currBreak / 60));
  $('.settingSession').html(sessionObj.returnMin());
  $('.valLabel').html(type);
  $('.valTimer').html(sessionObj.returnTime());


  // Change Break setting when legal  
  $('.parent1 .neg').click(function() {
    if (allowSettingChange === 1 && type === 'Break') {
      if (sessionObj.sec > 60) {
        sessionObj.reset((parseInt($('.settingBreak').html())-1)*60);
      }
      $('.settingBreak').html(sessionObj.returnMin());
      $('.valTimer').html(sessionObj.returnTime());
    }
  });
  $('.parent1 .pos').click(function() {
    if (allowSettingChange === 1 && type === 'Break') {
      sessionObj.reset((parseInt($('.settingBreak').html())+1)*60);
      $('.settingBreak').html(sessionObj.returnMin());
      $('.valTimer').html(sessionObj.returnTime());
    }
  });

  // Change Session length setting when legal  
  $('.parent2 .neg').click(function() {
    if (allowSettingChange === 1 && type === 'Session') {
      if (sessionObj.sec > 60) {
        sessionObj.reset((parseInt($('.settingSession').html())-1)*60);
      }
      $('.settingSession').html(sessionObj.returnMin());
      $('.valTimer').html(sessionObj.returnTime());
    }
  });
  $('.parent2 .pos').click(function() {
    if (allowSettingChange === 1 && type === 'Session') {
      sessionObj.reset((parseInt($('.settingSession').html())+1)*60);
      $('.settingSession').html(sessionObj.returnMin());
      $('.valTimer').html(sessionObj.returnTime());
    }
  });

  // Timer controls
  function flashTimer() {
    sessionObj.dropSec();
    $('.valTimer').html(sessionObj.returnTime());
    if (sessionObj.sec <= 0) {
      audio.play();
      if(type === 'Session') {
        type = 'Break'
        $('.valLabel').html(type);
        sessionObj.reset(parseInt($('.settingBreak').html())*60);
      }
      else {
        type = 'Session'
        $('.valLabel').html(type);
        sessionObj.reset(parseInt($('.settingSession').html())*60);
      }
    }
  }
  function startTimer() {
    nIntervId = setInterval(flashTimer, 1000);
  }
  function stopTimer() {
    clearInterval(nIntervId);
  }
  // End timer controls

  // click control
  $('.timer').click(function() {
    if (allowSettingChange === 1) {
      allowSettingChange = 0;
      startTimer();
    } else {
      allowSettingChange = 1;
      stopTimer();
    }
  });

});
