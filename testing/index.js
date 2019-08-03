$(document).ready(function() {
	
	if (sessionStorage.getItem("over18") == null)
	{
		$('#ageCheck').show();
	}
	
	if (window.location.hash == '#mylab' || 
		window.location.hash == '#myaccount' || 
		window.location.hash == '#nectars' || 
		window.location.hash == '#home' || 
		window.location.hash == '#seducehydra' ||
		window.location.hash == '#chargers' ||
		window.location.hash == '#batteries' ||		
		window.location.hash == '#coilheads' ||	
		window.location.hash == '#rebuilding' ||			
		window.location.hash == '#glasstubes' ||
		window.location.hash == '#starterkits') 
		{
			loadContent(window.location.hash.substring(1));
		} else {
			loadContent('home');	
		}

	//$('#shutdownNoticeShadow').show();
});

window.onload = function(){
	/*
	var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
if( isMobile.any() ) alert('Mobile');
};*/
  var success = loadSession();
  populateUser(success);
};

function pageLoaded() {
	$("#pageLoader").hide();
	$( "#pageContent" ).show()
}

function openMenu(visibility) {
	$( "#headerMenu, #headerMenuCloser" ).toggleClass('opened', visibility);
}


var afterLoginFunction = null;
    
function loadContent(pageName) {
	openMenu(false);
	$( "#pageLoader" ).show();
	$( "#pageContent" ).hide();
	
	
	switch(pageName) {
		case "myaccount" : 
			$( "#headerMyAccount" ).addClass('selected').siblings().removeClass('selected'); break;
		case "mylab" : 
			$( "#headerMyLab" ).addClass('selected').siblings().removeClass('selected'); break;
		case "nectars" : 
			$( "#headerNectar" ).addClass('selected').siblings().removeClass('selected'); break;
		default: 
			$( "#headerMenu" ).children().removeClass('selected'); break;
		
			
	}
	
	$( "#pageContent" ).load( getPage(pageName), function() { 
				//after load;
	});
	
	location.hash = '#'+pageName;
}


function authenticatedFunction(func) {
  if (loadSession()) func()
	else{
		loginPopup();
		afterLoginFunction = func;
	}
}

function populateUser(success) {
	if(success)
	{
		document.getElementById('headerLoginText').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!';   
		$('#headerLogout, #headerMyLab, #headerMyAccount').show();
		$('#headerLogin').hide();
	}
	else {
		document.getElementById('headerLoginText').innerHTML = "Welcome to Mama's Nectar!";   
		$('#headerLogout, #headerMyLab, #headerMyAccount').hide();
		$('#headerLogin').show();
		var isInMyLab = document.getElementById("myLabRequestTitle");
		if (isInMyLab) loadContent('nectars');
	}

}


function loginPopup() {
	openMenu(false);
	$('#scrollContent').css('overflow','hidden');
	$('#loginPopupTitle').text('Authorization Required');
	$('#loginPopupEmail').val('');
	$('#loginPopupPassword').val('');
	$('#loginPopupError').text('');
   	$("#loginPopupShadow").css("z-index","9999").fadeTo( "medium", 1 );
}
	
function changePassPopup() {
	$('#changePassPopupTitle').text('Change Password');
		$('#scrollContent').css('overflow','hidden');
	$('#changePassCurrent').val('');
	$('#changePassNew').val('');
	$('#changePassConfirm').val('');
	$('#changePassPopupError').text('');
	$("#changePassPopupShadow").css("z-index","9999").fadeTo( "medium", 1 );
}	


function logout() {
	openMenu(false);
	localStorage.removeItem('userid');
	localStorage.removeItem('name');
	localStorage.removeItem('email');
	localStorage.removeItem('pass');
	localStorage.removeItem('mobile');	
	sessionStorage.removeItem('userid');
	sessionStorage.removeItem('name');
	sessionStorage.removeItem('email');
	sessionStorage.removeItem('pass');
	sessionStorage.removeItem('mobile');	
	document.location.href=window.location.href.split('#')[0];
}



function closeCredPopup(id) {
		$('#scrollContent').css('overflow','auto');
	if ($('#'+id).hasClass('loading')) return false;
	afterLoginFunction = null;
	$('#'+id).fadeTo(  "fast", 0, function() {
		$( this ).css("z-index","-9999");
	});
}

function ageCheckOk(element){
	sessionStorage.setItem('over18', true);
	element.parentElement.parentElement.remove();
}

function loadSession() {
      if (sessionStorage.getItem("name") != null) {
            return true;
                        
      }
      else {
            if (localStorage.getItem("name") != null) {
				sessionStorage.setItem('userid', localStorage.getItem("userid"));       
                  sessionStorage.setItem('name', localStorage.getItem("name"));       
                  sessionStorage.setItem('email', localStorage.getItem("email"));
                  sessionStorage.setItem('pass', localStorage.getItem("pass"));
                  sessionStorage.setItem('mobile', localStorage.getItem("mobile"));
                  return true;
            } 
            else return false;
      }
            
   

}
