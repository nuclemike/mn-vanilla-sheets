$(document).ready(function() {
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#splashDiv").fadeOut();
		
		
	}, 3000);
	
	
});



if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ) {
 $("body").addClass('mobile');
}

function toggleMenu() {
    $("#headerMenu").toggleClass("open");
}
$( "#nectar" ).click(function() {
   $("#liquidOrderPopup").fadeIn();
});
