/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){
  var loadTweets = function(){
    $.get('/tweets',function(data){
      renderTweets(data, function(){
          $('#tweets>article>footer>button').on('click', function(e){
            var hasBeenLiked = $(e.target).text() === 'Like';
            e.preventDefault();
            $.ajax({
              url: '/tweets',
              type: 'PUT',
              data: `liked=${hasBeenLiked}&name=${$(this).closest('article').find('header').find('h2').text()}`,
              success: function(data) {
                if($(e.target).data('liked')){
                  $(e.target).text(`${data.liked} Likes`);
                  $(e.target).data('liked',false);
                }else{
                  $(e.target).text('Like');
                  $(e.target).data('liked',true);
                }
              },
              error: function(err){
              console.log(err)
            }
          });
        });
      });
    });
  }();



  function renderTweets(tweets, cb){
    for(x in tweets){
       $('#tweets').append(createTweetElement(tweets[x]));
    }
    cb();
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
              <footer>${Math.floor((date.getTime() - data.created_at)/1000/60/60/24/365)} year(s) ago <button data-liked=true>Like</button></footer>
            </article>`
    }
});
