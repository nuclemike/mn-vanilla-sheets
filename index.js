$(document).ready(function() {
	$("#loader, #splashLogo").addClass("loading");
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#loader").remove();
		$("#splashLogo").attr('class', 'loaded');
		
	}, 3000);
	
	
});
