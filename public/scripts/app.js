function renderTweets(tweets) {
  tweets.forEach(tweetData => {
    var $tweet = createTweetElement(tweetData);
    $('#tweet-container').append($tweet);
  });
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
  loadTweets();
  function loadTweets(){
    $.ajax('/tweets', { method: 'GET'})
    .then(function (tweets) {
      renderTweets(tweets);
    });
  }
  $("form").on("submit", function(event) {
    event.preventDefault();
    if($(".tweet-area").val().length === 0){
      alert("Please enter something in tweet area to submit");
    }else if($(".tweet-area").val().length > 140){
      alert("User cannot enter more than 140 characters in a tweet");
    }else{
      $.ajax('/tweets', { method: 'POST' , data: $("form").serialize()})
        .then(function (tweet) {
          $('#tweet-container').append(createTweetElement(tweet));
          $(".tweet-area").val("");
      });
    }
  });
});
