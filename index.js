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

  // Make an AJAX call to Google Script
  function getLabRequests() {
    
    var url = "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=gLRCb&name=";
    var name = "nuclemike@gmail.com"

    var request = jQuery.ajax({
      crossDomain: true,
      url: url + encodeURIComponent(name),
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
  function gLRCb(e) {
    console.log(e.result)
  }

function logout() {
	localStorage.removeItem('name');
	localStorage.removeItem('email');
	localStorage.removeItem('pass');
	localStorage.removeItem('mobile');	
	readLocalStorage();
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
	//  window.localStorage.setItem('myCat', 'Tom');
    console.log(response)
	  if (response.success == true){
		//closeLoginPopup();  
		  $('#loginPopupError').text(response.name);
		  window.localStorage.setItem('name', response.name);
		  window.localStorage.setItem('email', response.email);
		  window.localStorage.setItem('pass', response.pass);
		  window.localStorage.setItem('mobile', response.mobile);
		  readLocalStorage();

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

