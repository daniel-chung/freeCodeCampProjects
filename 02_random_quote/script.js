$(document).ready(function() {

  
  // jQuery call to get API values
  function new_quote() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(quote) {
        function update_author(s){
          if(s.length===0) { return 'unknown'; }
          else { return s; }
        }
        var text = quote.quoteText;
        var author = update_author(quote.quoteAuthor);
        $('#quote').html(text)
        $('#author').html(author)
        $('a.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text=' + text + ' -' + author)
      }
    });
  }
 
 // Start off with a call
 new_quote();
 
 // Update the call when pressing the button
 $('#quote-button').click(function () { new_quote(); })

 // Add effects to the button
 $( ".button" ).hover(
   function() {
     $(this).addClass("button-hover");
   }, function() {
     $(this).removeClass("button-hover");
   }
 );
 
 // Add additional js effects
 $('span#quote').addClass("quote-text");
 $('span#author').addClass("author-text");

 // giving me issues
 /*// Load Twitter
 window.twttr = (function(d, s, id) {
   var js, fjs = d.getElementsByTagName(s)[0],
     t = window.twttr || {};
   if (d.getElementById(id)) return t;
   js = d.createElement(s);
   js.id = id;
   js.src = "https://platform.twitter.com/widgets.js";
   fjs.parentNode.insertBefore(js, fjs);

   t._e = [];
   t.ready = function(f) {
     t._e.push(f);
   };

   return t;
 }(document, "script", "twitter-wjs"));
 */

});

