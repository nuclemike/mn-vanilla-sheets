$(document).ready(function() {
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#splashDiv").fadeOut();
		
		
	}, 3000);
	
	
});


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 //alert('mobile');
}


function toggleMenu() {
    $("#sideBar").toggleClass("open");
}