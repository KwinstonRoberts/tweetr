
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
          $.get('/tweets', function(d){
            $('#tweets').empty();
            var tweetList = "";
            var date = new Date();
            renderTweets(d,function(){
              message.val('');
            });
          });
        });
      };
    });
  }
