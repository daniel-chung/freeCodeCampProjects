$(document).ready(function(){

  //Hide the search bar info to start
  $('input#searchTerm').hide();
  $('span.updatePage').hide();

  //Create functionality for seach bar
  function toggleNav1() {
    $('.random').hide();
    $('.searchBar').animate({
      width: 200,
      marginLeft: '-100px'
    }, 500, function(){
      $('.start').hide();
      $('input#searchTerm').show();
      $('span.updatePage').show();          
      $('input#searchTerm').focus();
    });
  } 
  function toggleNav2() {
    $('input#searchTerm').hide();
    $('span.updatePage').hide();
    $('.searchBar').animate({
      width: 30,
      marginLeft: '-15px'
    }, 500, function(){
      $('.start').show();
      $('.random').show();
      $('.outer').css('height', "100%");
      $('.prompt').show();    });
  }

  
  // Function to send a search call to API
  function wpSearch(params) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?'+
           'action=query&format=json&list=prefixsearch&'+
           'redirects&pssearch='+params,
      type: 'GET',
      contentType: "application/json",
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        for (var i=0; i<data.query.prefixsearch.length; i++){
          var id = data.query.prefixsearch[i].pageid;
          var title = data.query.prefixsearch[i].title;
          wpRetrieveData(title,id);
        }
      }
    });
  };

  // Function to retrieve results
  function wpRetrieveData(t,i) {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?'+
           'action=query&prop=extracts&format=json&exsentences=1&'+
           'exsectionformat=plain&redirects&pageids='+i,
      type: 'GET',
      contentType: "application/json",
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        var returnObj = data.query.pages;
        for (var p in returnObj) {
          var result = returnObj[p].extract;
          $('div.results').append(
            '<a href="https://en.wikipedia.org/wiki/'+
              t.replace(/\s+/g, '_') +
              '" target="_blank" class="links">'+
            '<div class="card">'+
              '<div class="card-title"><b>'+
                t+
              '</b></div>'+
              '<div class="card-desc">'+
                $(result).text()+
              '</div>'+
            '</div>'+
            '</a>'
          );
          
          // Hover
          $( ".card" ).hover(
            function() {
              $( this ).addClass( "hover" );
            }, function() {
              $( this ).removeClass( "hover" );
            }
          );

        }
      }
    });
  };
    
  // Expand Search button
  $('.start').click(toggleNav1);

  // Search
  //wpSearch('hello');  
  $( "#target" ).keydown(function( event ) {
    if ( event.which === 13 ) {
      event.preventDefault();
      $('div.results').html("");
      $('.prompt').hide();
      $('.outer').css('height', "0%");
      wpSearch($("input#searchTerm").val());
    }
  });
  
  // Clear button when pressing the "X"
  $('.updatePage').click(function(){
    $('div.results').html("")
    $('input#searchTerm').val('');
    toggleNav2();
  });
    
});
