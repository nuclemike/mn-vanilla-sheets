
function sendRequest() {       	

      if ($("#liquidOrderSize").val()=="") {
	$("#liquidOrderSize").addClass("requiredField")}
	else { $("#liquidOrderSize").removeClass("requiredField")}        


      if ($("#liquidOrderNicotine").val()=="") {
	$("#liquidOrderNicotine").addClass("requiredField")}
	else { $("#liquidOrderNicotine").removeClass("requiredField")}

      if ($("#liquidOrderVG").val()=="") {
	$("#liquidOrderVG").addClass("requiredField")}
	else { $("#liquidOrderVG").removeClass("requiredField")}

     if ($( ".requiredField" ).length) {return false};


    $('#sendOrder, #cancelOrder').hide();

	$('#sendingPanel').fadeIn('medium');

	var vaperText = $("#liquidOrderCustomerVaper").val();  
      if (vaperText=="") { vaperText = $("#liquidOrderCustomerName").text(); }	 

	var requestObj = { email : $('#liquidOrderCustomerEmail').text(),
			   pass : sessionStorage.getItem("pass"),
			   qty : $('#liquidOrderQuantity').val(),
			   flavor : $('#liquidOrderNectarName').text(),
			   size : $('#liquidOrderSize').val(),
			   nicotine : $('#liquidOrderNicotine').val(),
			   vg : $('#liquidOrderVG').val(),
			   vaper : vaperText }			   	

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycby2yL0OxsZFDEzESDNHBTqGdZuZHwCzkbBjQ6_prTtZDt3iHACU/exec?callback=sendRequestCb",
      method: "GET",
      dataType: "jsonp",
      data: requestObj
    });

  }

function sendRequestCb(response) {
	$('#sendingPanel').hide();
	if (response.success) {
		$('#orderSentPanelEmail').text($("#liquidOrderCustomerEmail").text());
		$('#orderSentPanelRequestID').text('#'+response.requestID);
		$('#orderSentPanel').show();
		$('#cancelOrder, #goToMyLab').show();
	}
	else {

		alert('error : ' + response.error);
		$('#cancelOrder').show();

	}
} 

function login() {
	if ($("#loginPopupEmail").val()=="") {
		$("#loginPopupEmail").addClass("requiredField")}
	else { 
		$("#loginPopupEmail").removeClass("requiredField")
	}

	if ($("#loginPopupPassword").val()=="") {
		$("#loginPopupPassword").addClass("requiredField")}
	else { 
		$("#loginPopupPassword").removeClass("requiredField")
	}

	if ($( "#loginPopupTable .requiredField" ).length) {return false};

	$('#loginPopupShadow').addClass('loading');

	  $('#loginPopupWelcome').text('Authorizing...');

    var loginObj = { email:$('#loginPopupEmail').val(),
		    pass:$('#loginPopupPassword').val() }

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbw5G9k4sGNtTxQOaEVmSVo0VNEXEhPjfqvwAbecgVBCKyB5JuI/exec?callback=loginCb",
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });


  }
  
function loginCb(response) {	
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
		$('#loginPopupShadow').removeClass('loading');
		closeLoginPopup('loginPopupShadow');  

	}
	else 
	{
		$('#loginPopupError').text(response.name);
		afterLoginFunction = null;
		$('#loginPopupShadow').removeClass('loading');
		$('#loginPopupWelcome').text('Authorization Required');
		$("#loginPopupEmail").focus()
	}

}

function proceedChangePassword(){
	  if ($("#changePasswordCurrent").val()=="") {
		$("#changePasswordCurrent").addClass("requiredField");
	}
	else { 
		$("#changePasswordCurrent").removeClass("requiredField");
	}

	if ($("#changePasswordNew").length<8) {
		$("#changePasswordNew").addClass("requiredField");
		$('#loginPopupError').text("Password should be at least 8 characters.");
	}
	else { 
		$("#changePasswordNew").removeClass("requiredField");
		$('#loginPopupError').text("");
	}
	
	if ($("#changePasswordConfirm").length<8) {
		$("#changePasswordConfirm").addClass("requiredField");
	}
	else { 
		$("#changePasswordConfirm").removeClass("requiredField");
	}
	
	if ($("#changePasswordNew").val() != $("#changePasswordConfirm").val()) {
		$("#changePasswordNew").addClass("requiredField");
		$("#changePasswordConfirm").addClass("requiredField");
		$('#loginPopupError').text("Passwords do not match!");
	}
	else { 
		$("#changePasswordConfirm").removeClass("requiredField");
		$("#changePasswordConfirm").removeClass("requiredField");
		$('#loginPopupError').text("");
	}

	if ($( "#loginPopupTable .requiredField" ).length) {return false};
	
	
		$('#loginPopupShadow').addClass('loading');

	  $('#loginPopupWelcome').text('Please wait...');



    var loginObj = { 	email: sessionStorage.getItem("email"),
						pass:$('#changePasswordCurrent').val(),
						newpass:$('#changePasswordConfirm').val()	}

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbxAm1XNsZtOY1oYXdKIsYtaoUDzbkrnkpXUKFJ5HD4v05WqnZ0/exec?callback=changePassCb",
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });
  }

function changePassCb(response) {	
	if (response.success == true){
		alert("Password Changed Successfully. Please login using your new password.");
		logout();
	}
	else 
	{
		$('#loginPopupError').text(response.name);
		afterLoginFunction = null;
		$('#loginPopupShadow').removeClass('loading');
		$('#loginPopupWelcome').text('Change Password');		
	}


}

function loadMyLab() {
	document.getElementById("myUserID").innerHTML = sessionStorage.getItem("userid");
	document.getElementById("myAccountName").innerHTML = sessionStorage.getItem("name");
	document.getElementById("myAccountEmail").innerHTML = sessionStorage.getItem("email");
	document.getElementById("myAccountMobile").innerHTML = sessionStorage.getItem("mobile");


	var request = jQuery.ajax({
		crossDomain: true,
		url: "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=loadMyLabCb",
		method: "GET",
		dataType: "jsonp",
		data : {email : sessionStorage.getItem("email")}
	});

}

function loadMyLabCb(e) {


	if (e.error) { alert(e.message) }
	else {
		var html = '';


		e.requests.forEach( function (item){


			var imgUrl = 'liquids/' + item.flavor.replace(/[^a-z0-9]/gi,'') +'.png';
			html += '<div class="myLabRequestWrapper fxFixed state'+item.state+'">';
			html += '<div class="myLabRequestFlask" style="background-image:url('+imgUrl.toLowerCase()+')">';
			html += '<span class="myLabRequestQty">' + item.quantity + 'x</span>';						
			html += '<span class="myLabRequestNectar fxDisplay fxJustifyCenter fxAlignCenter">' + item.flavor + '</span>';
			html += '</div>';
			html += '<span class="myLabRequestVaper">' + item.vaper + '</span>';

			html += '<span class="myLabRequestDate"><b>Ordered</b>' + item.datetime + '</span>';
			html += '<span class="myLabRequestSize"><b>Size</b>' + item.size + 'ml</span>';
			html += '<span class="myLabRequestNicotine"><b>Nicotine</b>' + item.nicotine + '</span>';

			var vgText = '';
			if (Math.round(item.vg) == 100) {vgText="MAX-VG"}
			else {vgText = Math.round(item.vg)+"/"+ Math.round(100-item.vg)}

			html += '<span class="myLabRequestVg"><b>VG/PG</b>' + vgText + '</span>';
			html += '<span class="myLabRequestReference"><b>Ref</b>' + item.reference + '</span>';
			html += '</div>';	

		});

		if (e.requests.length > 0) {
			html += '</div>';
	     		$('#myAccountDetails.noLabRequests').remove();
			document.getElementById('myLabRequestContainer').innerHTML = html;	
		}
	}

	pageLoaded();
}

