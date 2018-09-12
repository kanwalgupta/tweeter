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
  let $userTweet = tweetData.content;
  let $date = new Date(tweetData.created_at*1000);
  let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  let tweetDate = new Date(tweetData.created_at);
  let todaysDate = new Date();
  console.log("diff ",todaysDate-tweetDate);


  let $diffDays = Math.floor((todaysDate - tweetDate)/oneDay);


   return `

        <article>
          <header>
            <img src="${$avatar}">
            <span class="user_name">${$user_name}</span>
              <span class="user_handle">${$user_handle}</span>
            </header>
            <div>
              <span class="tweetedText">${$userTweet.text}</span>
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
 // Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1161116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
$( document ).ready(function() {
  renderTweets(data);
  $("form").on("submit", function(event) {
    event.preventDefault();
    console.log("prevented");
    $.ajax('/tweets', { method: 'POST' , data: $("form").serialize()})
    .then(function (tweet) {
      $('#tweet-container').append(createTweetElement(tweet));
      $("#tweet-area").text("");
    });
  });
});
