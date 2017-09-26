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

function loginPopup() {
		$(', #loggingInPopupPanel').hide();		
   		$("#loginPopup").css("z-index","9999").fadeTo( "medium", 1 );
	}



function logout() {
	localStorage.removeItem('name');
	localStorage.removeItem('email');
	localStorage.removeItem('pass');
	localStorage.removeItem('mobile');	
	sessionStorage.removeItem('name');
	sessionStorage.removeItem('email');
	sessionStorage.removeItem('pass');
	sessionStorage.removeItem('mobile');	
	populateUser(false);
}



  // Make an AJAX call to Google Script
  function login() {
    
    var url = "https://script.google.com/macros/s/AKfycbzDWblHNTvXICpwOrT2Yi1NWbXS39IDnODUb6j7DX8gj-DEDGc/exec?callback=loginCb";
    var user = $('#loginPopupEmail').val();
    var pass = $('#loginPopupPassword').val();

    var request = jQuery.ajax({
      crossDomain: true,
      url: url + '&user='+encodeURIComponent(user)+'&pass='+encodeURIComponent(pass),
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
function loginCb(response) {
	console.log(response)
	if (response.success == true){

		sessionStorage.setItem('name', response.name);
		sessionStorage.setItem('email', response.email);
		sessionStorage.setItem('pass', response.pass);
		sessionStorage.setItem('mobile', response.mobile);

		if (document.getElementById('rememberMe').checked) {
			localStorage.setItem('name', response.name);
			localStorage.setItem('email', response.email);
			localStorage.setItem('pass', response.pass);
			localStorage.setItem('mobile', response.mobile);
		}

		closeLoginPopup();  
		populateUser(true);

	}
	else 
	{
		$('#loginPopupError').text(response.name);
	}
}

function closeLoginPopup() {
	$("#loginPopup").fadeTo(  "fast", 0, function() {
		$( this ).css("z-index","-9999");
	});
}

function updateCost() {
    var size = $("#liquidOrderSize").val();
	var qty = $("#liquidOrderQuantity").val(); 
	var price = 0.00;
	var total = 0.00;
	
	if (size == 30) {price = 6}
	else if (size == 60) {price = 10.50}
	else if (size == 120) {price = 19.50}
	
	total = price * qty;
	
	$("#totalCostValue").text("€"+total.toFixed(2));
	
}

