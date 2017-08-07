$(document).ready(function(){
	console.log('loaded');
	$(".new-tweet").on('input','textarea',function(e){

		var count = 140 - $(this).val().length;
		var counter = $(this).siblings('.counter');
		
		counter.text(count);
		
		if(count<0){
			counter.addClass('invalid');
		}else{
			counter.removeClass('invalid');
		}
		
	});
});