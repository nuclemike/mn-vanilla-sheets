$(document).ready(function() {
	$("html").addClass("loading");
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#loader").remove();
		$("html").attr('class', 'loaded');
		
	}, 3000);
	
	
});
