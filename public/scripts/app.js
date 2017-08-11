/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  var loadTweets = function(){
    $.get('/tweets',function(data){
      console.log('1')
      renderTweets(data.sort(function(a,b){
        return b.created_at - a.created_at
      }));
      });
  }();

  function renderTweets(tweets){
    for(x in tweets){
      console.log(tweets[x]);
       $('#tweets').append(createTweetElement(tweets[x]));
    }
  }

  function createTweetElement(data){
    var user = data.user;
    var date = new Date();
    var escape = function(str){
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    return`<article>
              <header>
                <img src='${escape(user.avatars.large)}'/>
                <h2>${escape(user.name)}</h2>
                <p>${escape(user.handle)}</p>
              </header>
              <p>${escape(data.content.text)}</p>
              <footer>${Math.floor((date.getTime() - data.created_at)/1000/60/60/24/365)} year(s) ago <i class='fa fa-flag' aria-hidden="true"></i><i class="fa fa-retweet" aria-hidden="true"></i><i class="fa fa-thumbs-up" aria-hidden="true"></i></footer>
            </article>`
    }
});
