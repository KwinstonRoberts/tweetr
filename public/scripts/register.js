$(document).load(function(){
  $('#login').click(function(event) {
    event.preventDefault();
    var data;
    $.post('/register', data, function(resp) {
    });
  });
  $('#logout').click(function(event) {
    event.preventDefault();
    $.post('/logout',function(data){
      console.log('ok');
    });
  });
});
