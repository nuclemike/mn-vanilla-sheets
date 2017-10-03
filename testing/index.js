$(document).ready(function() {
	loadContent('nectars');	
});

window.onload = function(){
  var success = loadSession();
  populateUser(success);
};

function pageLoaded() {
	$("#pageLoader").hide();
	$( "#pageContent" ).show()
}

var afterLoginFunction = null;
    
function loadContent(pageName) {
	$( "#pageLoader" ).show();
	$( "#pageContent" ).hide();
	
	if (pageName == 'mylab')
		$( "#headerMyLab" ).addClass('selected').siblings().removeClass('selected')
	else if (pageName == 'nectars')
		$( "#headerNectar" ).addClass('selected').siblings().removeClass('selected')
	
	$( "#pageContent" ).load( pageName+".html", function() {
		//after load html (images excluded)
		
	});
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
		$('#headerLogout, #headerMyLab').show();
		$('#headerLogin').hide();
	}
	else {
		document.getElementById('headerLoginText').innerHTML = "Welcome to Mama's Nectar!";   
		$('#headerLogout, #headerMyLab').hide();
		$('#headerLogin').show();
		var isInMyLab = document.getElementById("myLabRequestTitle");
		if (isInMyLab) loadContent('nectars');
	}

}


function loginPopup() {
	$('#loginPopupTitle').text('Authorization Required');
	$('#loginPopupEmail').val('');
	$('#loginPopupPassword').val('');
	$('#loginPopupError').text('');
   	$("#loginPopupShadow").css("z-index","9999").fadeTo( "medium", 1 );
}
	
function changePassPopup() {
	$('#changePassPopupTitle').text('Change Password');
	$('#changePassCurrent').val('');
	$('#changePassNew').val('');
	$('#changePassConfirm').val('');
	$('#changePassPopupError').text('');
	$("#changePassPopupShadow").css("z-index","9999").fadeTo( "medium", 1 );
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
	location.reload();
}



function closeCredPopup(id) {
	if ($('#'+id).hasClass('loading')) return false;
	afterLoginFunction = null;
	$('#'+id).fadeTo(  "fast", 0, function() {
		$( this ).css("z-index","-9999");
	});
}



function loadSession() {
      if (sessionStorage.getItem("name") != null) {
            return true;
                        
      }
      else {
            if (localStorage.getItem("name") != null) {
                  sessionStorage.setItem('name', localStorage.getItem("name"));       
                  sessionStorage.setItem('email', localStorage.getItem("email"));
                  sessionStorage.setItem('pass', localStorage.getItem("pass"));
                  sessionStorage.setItem('mobile', localStorage.getItem("mobile"));
                  return true;
            } 
            else return false;
      }
            
   

}
