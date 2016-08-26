$(document).ready(function() {
	$("#loader, #splashLogo").addClass("loading");
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#loader").remove();
		$("splashLogo").toggleClass('loading loaded');
		
	}, 3000);
	
	
});
