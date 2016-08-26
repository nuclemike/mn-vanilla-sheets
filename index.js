$(document).ready(function() {
	$("#loader, #splashLogo").addClass("loading");
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#loader").fadeOut("slow"); 
		
	}, 3000);
	
	
});
