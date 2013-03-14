/* Author: Divya Manian

*/


$.getJSON("http://pipes.yahoo.com/pipes/pipe.run?_id=4a36fa375210cb11ff4cd7aa29caca51&_render=json&_callback=?",
function(json) {
   $('#loading').hide();
   var events = json.value.items;
   var eventsfiltered = [];

   var dateregex = [ { regexp:  /^[0-9][0-9]-[0-9][0-9]/i,
                       replacefn: function(s) {return s.replace(/-/g, '/'); }
                      },

                      {
                        regexp: /\sat\s.*/,
                        replacefn: function(s) {return s.replace(/\sat\s.*/i, ''); }
                      }];
   $.each(events, function(i, event){
     var formatdate = $.trim(event.date);

     $.each(dateregex, function(i, v){
       formatdate =  v.regexp.test($.trim(formatdate)) ? v.replacefn(formatdate) : formatdate;
     });

     formatdate = dateFormat(formatdate, "dddd, mmm d, yyyy");
     if(formatdate && (new Date(formatdate) > new Date())) {

        var $venue = $('<div>').html($.trim(event.venue));
        var eventname =  $venue.find("h1 a").text();

        if(eventname) {
          var location = $venue.find("p.description span.location").text();
          $venue.html(location ? eventname + " " + location : eventname);
        }

         eventsfiltered.push({ 'date' : formatdate, 'title' : event.title, 'venue': $venue.text()});

     }

   });

  eventsfiltered.sort(function(e1, e2) {
    return (new Date(e1.date)).getTime() - (new Date(e2.date)).getTime();
  });

  $("#body").append("<table id='events'/>");
  $("#events").append("<thead><tr><th class='artist'>Artist</th><th>Date</th><th class='venue'>Venue</th></thead><tbody/>");

  $.each(eventsfiltered, function(i, event) {
   if(event.date) {
     var $artist = $('<td>').html($.trim(event.title));
     var $date = $('<td>').addClass('date').html(event.date);
     var $venue = $('<td>').html(event.venue)
   }

   $("#events tbody").append($('<tr>').append($artist).append($date).append($venue));
  });

});

$(document).ready(function(){
  var initheight = parseInt($("#feet").css("height"));
  var count = 0;

    $(document).bind('keydown',function(event){
       if(event.keyCode=='40') {
         if(!count) { $('#feet').css('left', function() { return $('#container').offset().left - parseInt($(this).css('width'))*1.25; }); }
         $('#feet').show();
         count++;
       }  else if(event.keyCode == '38') {
          if(count <=1) {
            $('#feet').hide();
          }  else {
              count-- ;
          }
       }
       changefeet($("#feet"));
       return true;
    });

    function changefeet(feetelm) {
      feetelm.css("height", function(index) {
        return initheight * count;
      });
    }

    $(window).resize(function(event) {
       $('#feet').css('left', function() { return $('#container').offset().left - parseInt($(this).css('width'))*1.25; });
    })

});



// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(window.console){
      try{
       console.log.apply(window,Array.prototype.slice.call(arguments));
        } catch(e){ console.log(arguments) }
  }
};

// catch all document.write() calls
document._write = document.write;
document.write = function(q){
  if (q.match(/docwriteregextopassthrough/)) document._write(q);
  log('document.write(): ',q);
}


// background image cache bug for ie6.  via: http://www.mister-pixel.com/#Content__state=
/*@cc_on   @if (@_win32) { document.execCommand("BackgroundImageCache",false,true) }   @end @*/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-97188-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
