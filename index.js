$(document).ready(function() {
	$(".nectar").click(function() {
		var imageUrl = $(this).children(".nectarFlask").attr("src");
		var nectarName = $(this).children(".nectarName").text();
		document.getElementById("liquidOrderNectarThumbnail").setAttribute("src", imageUrl);
		document.getElementById("liquidOrderNectarName").innerHTML = nectarName;
		$('#orderSentPanel, #sendingPanel').hide();
		$('#sendOrder').toggle(!$('#authorizationText').hasClass('denied'));
   		$("#liquidOrderSection").css("z-index","9999").fadeTo( "medium", 1 );
	});
	
	
	$("#cancelOrder").click(function() {
		
		$("#liquidOrderSection").fadeTo(  "fast", 0, function() {
			$( this ).css("z-index","-9999");
		});
	});
		
});

// Wait for window load
$(window).load(function() {
	setTimeout(function(){ 
		$("#splashDiv").slideUp('slow');
		$(".content").show();
	}, 0);		
});



if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ) 	
	{
 	$("body").addClass('mobile');
	}

function toggleMenu() {
    $("#headerMenu").toggleClass("open");
}

function updateCost() {
    var size = $("#liquidOrderSize").val();
	var qty = $("#liquidOrderQuantity").itemIndex +1; 
	var price = 0.00;
	var total = 0.00;
	
	if (size == 0) {price = 6}
	else if (size == 1) {price = 10.50}
	else if (size == 2) {price = 19.50}
	
	total = price * qty;
	
	$("#totalCostValue").text(total);
	
}

