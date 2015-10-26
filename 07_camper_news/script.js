$(document).ready(function(){

  // Function to clean up titles
  function cleanNames(s){
    if (s.length>24)
      return s.substring(0,20)+"...";
    else
      return s;
  };
  
  // API call to FreeCodeCamp
    $.ajax({
      type: 'GET',
      url: 'http://www.freecodecamp.com/news/hot?callback=?',
      jsonpCallback: 'jsonCallback',
      contentType: "application/javascript",
      success: function(json) {
         parseData(json);
      },
    });

  // Parse data
  var root = 'http://www.freecodecamp.com/';
  var newsRoot = 'http://www.freecodecamp.com/news/';
  function parseData(l){
    for (var i=0; i<l.length; i++) {
      var currDate = new Date(l[i].timePosted);
      var currDate2 = currDate.toString().split(' ');
      var formatDate = currDate2[0] + ", " +
          [currDate2[2],currDate2[1],currDate2[3]].join(' ');
      
      $('div.posts').append(
        '<div class="post">'+
          '<div>'+
           '<a href = "'+l[i].link+'">'+
            '<img src='+l[i].author.picture+'>'+'<br>'+
            '<span class="post-text post-title">'+
              cleanNames(l[i].headline)+
            '</span>'+
          '</a>'+
         '</div>'+
          
          '<div class="post-text">'+
           '<a href="'+root+l[i].author.username+'">'+
            'by: '+l[i].author.username+''+
           '</a>'+
          '</div>'+

          '<div class="post-text">'+
            '&hearts; '+l[i].upVotes.length+
          
            '<a href="'+newsRoot+l[i].storyLink.replace(/\s+/g, '-')+'">'+
            '<button class="discuss">Discuss</button>'+
            '</a>'+
          '</div>'+

          '<div class="post-text">'+        
           'Posted on: '+formatDate+
          '</div>'+
        '</div>'
      );
    }
  };
  
});