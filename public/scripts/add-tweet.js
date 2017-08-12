$(document).ready(function(){
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
          for(x in d){
            console.log(d[x]);
            $('#tweets').prepend(`
              <article>
              <header>
                <img src='${d[x].user.avatars.large}'/>
                <h2>${d[x].user.name}</h2>
                <p>${d[x].user.handle}</p>
              </header>
              <p>${d[x].content.text}</p>
              <footer>${Math.floor((date.getTime() - d[x].created_at)/1000/60/60/24/365)} year(s) ago <i class='fa fa-heart'></i><i class="fa fa-retweet"></i><i class="fa fa-flag"></i></footer>
            </article>`);
          }
          message.val('');
        });
      });
    };
  });
});
