$(document).ready(function() {
	$(".nectar").click(function() {
		var imageUrl = $(this).children(".nectarFlask").attr("src");
		document.getElementById("liquidOrderNectarThumbnail").setAttribute("src", imageUrl);
   		$("#liquidOrderSection").css("z-index","9999").fadeTo( "medium", 1 );
	});
	
	$("#cancelOrder").click(function() {
		$("#liquidOrderSection").fadeTo(  "fast", 0, function() {
			$( this ).css("z-index","-9999")
		});
	});
		
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#splashDiv").fadeOut();
		
		
	}, 0);
	
	
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


