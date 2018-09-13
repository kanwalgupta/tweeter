function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    var $tweet = createTweetElement(tweetData);
    $('#tweet-container').append($tweet);
  });
}
function registerFormSubmissionHandler(){
  $("form").on("submit", function(event) {
      event.preventDefault();
      if($(".error-message").is(":visible")){
        $(".error-message").slideUp();
      }
      if($(".tweet-area").val().length === 0){
        $(".error-message").html("Please enter something in tweet area to submit");
        $(".error-message").slideDown();
      }else if($(".tweet-area").val().length > 140){
        $(".error-message").slideDown();
        $(".error-message").html("User cannot enter more than 140 characters in a tweet");
      }else{
        $(".error-message").html("").slideUp();
        // Code for avoidance of Cross Site Scripting
        let unsafeValue = $(".tweet-area").val();
        $(".tweet-area").val(escape(unsafeValue));

        $.ajax('/tweets', { method: 'POST' , data: $("form").serialize()})
          .then(function (tweet) {
            $('#tweet-container').prepend(createTweetElement(tweet));
            $(".tweet-area").val("");
            $(".counter").html("140");
        });
      }
  });
}

//Function for converting unsafe user input for avoiding XSS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweetData) {
  let $avatar = tweetData.user.avatars.small;
  let $user_name = tweetData.user.name;
  let $user_handle = tweetData.user.handle;
  let $userTweet = tweetData.content.text;
  let $date = new Date(tweetData.created_at*1000);
  let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  let tweetDate = new Date(tweetData.created_at);
  let todaysDate = new Date();
  let $diffDays = Math.floor((todaysDate - tweetDate)/oneDay);


   return `

        <article>
          <header>
            <img src="${$avatar}">
            <span class="user_name">${$user_name}</span>
              <span class="user_handle">${$user_handle}</span>
            </header>
            <div>
              <span class="tweetedText">${$userTweet}</span>
            </div>
            <footer>
              <span>${$diffDays} days ago</span>
              <div class="displayOnHover">
                <img src="images/flag.png">
                <img src="images/retweet.png">
                <img src="images/like.png">
              </div>
            </footer>
        </article>` ;
}

$( document ).ready(function() {
  // On Page LoadUp , Error message is not displayed using slideUp
  $(".error-message").html("").slideUp();

  loadTweets();
  function loadTweets(){
    $.ajax('/tweets', { method: 'GET'})
    .then(function (tweets) {
      renderTweets(tweets);
    });
  }
  registerFormSubmissionHandler();
  $( ".compose" ).click(function() {
    if($(".new-tweet").is(":visible")){
      $( ".new-tweet" ).slideUp( "slow", function() {
      });
    }else{
      $(".new-tweet").slideDown( "slow", function() {
        $(".tweet-area").focus();
      });
    }
  });

});
