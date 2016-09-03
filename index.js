$(document).ready(function() {
	$("html").addClass("loading");
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#loader").remove();
		$("html").attr('class', 'loaded');
		
	}, 0000);
	
	
});


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 alert('mobile');
}
