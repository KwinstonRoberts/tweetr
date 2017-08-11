/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  $.getScript('/scripts/add-tweet.js', function(){
    $(document).ready(function(){
      var loadTweets = function(){
        $.get('/tweets',function(data){
          renderTweets(data.tweets, function(){
            addTweet();
            console.log(data.cookie);
            if(data.cookie.user_id){
              $('.userform').addClass('hidden');
              $('#logout').removeClass('hidden');

            }else{
              $('.userform').removeClass('hidden');
              $('#logout').addClass('hidden');
            }
          });
        });
      }();



      function renderTweets(tweets, callback){
        for(x in tweets){
           $('#tweets').append(createTweetElement(tweets[x]));
        }
        callback();
      }

      function createTweetElement(data){
        console.log(data)
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
                  <footer>${Math.floor((date.getTime() - data.created_at)/1000/60/60/24/365)} year(s) ago <i class='fa fa-heart'></i><i class='fa fa-retweet'></i><i class='fa fa-flag'></i></footer>
                </article>`
        }
    });
  });
