$(document).ready(function() {

  // Make search useful
  var options = {
    valueNames: [ 'name']
  };

  // Make tabs useful
  $('#myTabs a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
  })

  // All users to follow
  var users = {
    "freecodecamp": 0,
    "storbeck": 0,
    "terakilobyte": 0,
    "habathcx": 0,
    "medrybw": 0,
    "RobotCaleb": 0,
    "thomasballinger": 0,
    "noobs2ninjas": 0,
    "beohoff": 0
  };

  // find online streams
  function findStatus(d, i, cn) {
    if (d.stream===null) {
      users[i]=0;
      getUserStreams(i, 'channels', addCards, '.all-list');
      getUserStreams(i, 'channels', addCards, '.offline-list');
    } else {
      users[i]=1;
      getUserStreams(i, 'channels', addCards, '.all-list');
      getUserStreams(i, 'channels', addCards, '.online-list');
    }
  };

  // get twitch metadata
  function addCards(d, i, cn) {
    var online = '';
    var tagline = '';
    if (users[i] === 1) {
      online = '<span class="status glyph-online glyphicon glyphicon-ok" aria-hidden="true"></span>';
      tagline = (d.status.length >32 ? d.status.substring(0,32)+"...": d.status);
    }
    else online = '<span class="status glyph-offline glyphicon glyphicon-remove" aria-hidden="true"></span>';
    var logo = ''
    if (d.logo===null)
      logo = '<img class="avatar" src="" border="0" style="border:none;"> &nbsp;';
    else
      logo = '<img class="avatar" src="' + d.logo + '"> &nbsp;';
    $(cn).append(
      '<li>'+
      '<a class="link" href="' +d.url+ '" target="_blank">' +
      '<div class="user-card">' +
      logo +
      '<span class="user-name name">'+d.display_name+'</span>'+
      online + 
      '<p class="tag-line">' +tagline +'</p>' +
      '</div>'+
      '</a>'+
      '</li>'
    );
  };

  // API call to twitch for 
  function getUserStreams(userName, link, successF, className) {
    $.ajax({
      url: 'https://api.twitch.tv/kraken/' + link + '/' + userName + '?callback=?',
      type: 'GET',
      contentType: "application/json",
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        successF(data, userName, className);
        
        // Gives search functionality using list.js
        var userList = new List('all', options);
        var userList = new List('online', options);
        var userList = new List('offline', options);

      },
    });
  }

  // Find player values
  for (var prop in users) {
    getUserStreams(prop, 'streams', findStatus, '');
  };

});