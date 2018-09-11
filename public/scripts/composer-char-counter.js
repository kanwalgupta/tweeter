$(document).ready(function() {
    $( ".tweet-area" ).on( "keyup", function() {
      let tweetLength =  this.value.length;
      $(".counter").html(140-tweetLength);
      if(tweetLength > 140){
        $(".counter").css('color', 'red');
      }else{
        $(".counter").css('color', 'black');
      }
    });
});