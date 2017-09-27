$(document).ready(function() {
	loadContent('nectars');	
});

// Wait for window load
/*
$(window).load(function() {
	setTimeout(function(){ 
		$("#splashDiv").slideUp('slow');
		//$(".content").show();
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
*/

function loadContent(pageName) {
	$( "#pageLoader" ).show();
	$( "#pageContent" ).hide();
	
	$( "#pageContent" ).load( pageName+".html", function() {
		//if (pageName != 'mylab' || pageName != 'nectars') $("#pageLoader").hide();
		if (pageName != 'nectars')
		{
		var nrOfImages = $("img").length;
		    $("#pageContent img").load(function() {
			if(--nrOfImages == 0)
			{
			    $("#pageLoader").hide();
			}
		    });
		}
		$(this).show();
	});
}



function labRequestPopup(nectarName) {

	var imgUrl = './liquids/' + nectarName.replace(/[^a-z0-9]/gi,'') +'.png';

	document.getElementById("liquidOrderNectarThumbnail").setAttribute("src", imgUrl.toLowerCase());
	document.getElementById("liquidOrderNectarName").innerHTML = nectarName;
	document.getElementById('liquidOrderCustomerName').innerHTML = sessionStorage.getItem("name");
	document.getElementById('liquidOrderCustomerEmail').value = sessionStorage.getItem("email");   
	document.getElementById('liquidOrderCustomerNickname').value = sessionStorage.getItem("name");
	$('#orderSentPanel, #sendingPanel').hide();
	$("#liquidOrderSection").css("z-index","9999").fadeTo( "medium", 1 );


}

function closeLabRequestPopup() {
		
		$("#liquidOrderSection").fadeTo(  "fast", 0, function() {
			$( this ).css("z-index","-9999");
		});
	}


function authenticatedFunction(func) {
  if (loadSession()) func()
	else{
		loginPopup();
		afterLoginFunction = func
	}
}

var afterLoginFunction = null;
    


function toggleMenu() {
    $("#headerMenu").toggleClass("open");
}

function loginPopup() {
		$('#loggingInPopupPanel').hide();		
   		$("#loginPopupShadow").css("z-index","9999").fadeTo( "medium", 1 );
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

		
		populateUser(true);
		if (afterLoginFunction != null) afterLoginFunction();
		closeLoginPopup();  

	}
	else 
	{
		$('#loginPopupError').text(response.name);
		afterLoginFunction = null;
	}
}

function closeLoginPopup() {
	afterLoginFunction = null;
	$("#loginPopupShadow").fadeTo(  "fast", 0, function() {
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

