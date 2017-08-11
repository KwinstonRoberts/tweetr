function likeTweet(){
    $('#tweets>article>footer>button').on('click', function(e){
      var hasBeenLiked = $(e.target).text() === 'Like';
      console.log(hasBeenLiked);
      e.preventDefault();
      $.ajax({
        url: '/tweets',
        type: 'PUT',
        data: `liked=${hasBeenLiked}&name=${$(this).closest('article').find('header').find('h2').text()}`,
        success: function(data) {
          console.log(data);
          if($(e.target).data('liked')){
            $(e.target).text(`${data.liked} Likes`);
            alert(`you liked!`);
            $(e.target).data('liked',false);
            console.log($(e.target).data('liked'));
          }else{
            $(e.target).text('Like');
            alert(`you unliked!`);
              $(e.target).data('liked',true);
            console.log($(e.target).data('liked'));
          }
        },
        error: function(err){
          console.log(err)
        }
      });
  });
}
