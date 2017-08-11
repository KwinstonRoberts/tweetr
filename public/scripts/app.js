/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
    $(document).ready(function(){
      var loadTweets = function(){
        $.get('/tweets',function(data){
          renderTweets(data, function(){
            addTweet();
          });
        });
      }

      function addTweet(){
        var focused = false;
        $('nav').on('click','button',function(e){
          e.preventDefault();
          $('#new-tweet').slideToggle('fast',function(){
            focused = !focused;
            $('#new-tweet').focus();
          });
        });
        $('#new-tweet>form').on('submit', function(e){
          e.preventDefault();
          var message = $('#new-tweet form textarea');
          console.log(message);
          if(message.val().length > 140){
            $('section>h2').after('<p class="invalid"> your text has too many characters</p>');
          }else if(message.val().length === 0){
            $('section>h2').after('<p class="invalid"> Your text is empty</p>');
          }else{
            $('.invalid').remove();
            $.post('/tweets', $(this).serialize() ,function(){
              $.get('/tweets', function(data){
                $('#tweets').empty();
-                renderTweets(data);
                });
              });
            }
         });
      }

      function renderTweets(tweets){
        var date = new Date();
        for(x in tweets){
           $('#tweets').append(`<article>
                     <header>
                       <img src='${escape(tweets[x].user.avatars.large)}'/>
                       <h2>${escape(tweets[x].user.name)}</h2>
                       <p>${escape(tweets[x].user.handle)}</p>
                     </header>
                     <p>${escape(tweets[x].content.text)}</p>
                     <footer>${Math.floor((date.getTime() - tweets[x].created_at)/1000/60/60/24)} day(s) ago <i class='fa fa-heart'></i><i class='fa fa-retweet'></i><i class='fa fa-flag'></i></footer>
                   </article>`);
          }
      }
  });
