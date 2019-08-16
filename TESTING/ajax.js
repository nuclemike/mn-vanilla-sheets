
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
      if (vaperText=="") { vaperText = sessionStorage.getItem("name"); }	 

	var requestObj = { email : sessionStorage.getItem("email"),
			   pass : sessionStorage.getItem("pass"),
			   qty : $('#liquidOrderQuantity').val(),
			   flavor : $('#liquidOrderNectarName').text(),
			   size : $('#liquidOrderSize').val(),
			   nicotine : $('#liquidOrderNicotine').val(),
			   nicType : $('#liquidOrderShotType').val(),
			   vg : $('#liquidOrderVG').val(),
			   vaper : vaperText }			   	

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbzOCqcFbtdt_Tb4rLgvTyrCwpXTqihkEf2cxW_l/exec?callback=sendRequestCb",
	        
      method: "GET",
      dataType: "jsonp",
      data: requestObj
    });

  }

function sendRequestCb(response) {
	$('#sendingPanel').hide();
	if (response.success) {
		$('#orderSentPanelEmail').text(sessionStorage.getItem("email"));
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

	if ($( "#loginPopupShadow .requiredField" ).length) {return false};

	$('#loginPopupShadow').addClass('loading');

	  $('#loginPopupTitle').text('Authorizing...');

    var loginObj = { email:$('#loginPopupEmail').val(),
		    pass:$('#loginPopupPassword').val() }

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbwIIyuLKOjMfF0hoXG6SfwfXx6evNJW3jx93KavDg/exec?callback=loginCb",
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });


  }
  
function loginCb(response) {	
	if (response.success == true){
		sessionStorage.setItem('userid', response.userid);
		sessionStorage.setItem('name', response.name);
		sessionStorage.setItem('email', response.email);
		sessionStorage.setItem('pass', response.pass);
		sessionStorage.setItem('mobile', response.mobile);

		if (document.getElementById('rememberMe').checked) {
			localStorage.setItem('userid', response.userid);
			localStorage.setItem('name', response.name);
			localStorage.setItem('email', response.email);
			localStorage.setItem('pass', response.pass);
			localStorage.setItem('mobile', response.mobile);
		}


		populateUser(true);
		if (afterLoginFunction != null) afterLoginFunction();
		$('#loginPopupShadow').removeClass('loading');
		closeCredPopup('loginPopupShadow');  

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

function proceedChangePass(){
	  if ($("#changePassCurrent").val()=="") {
		$("#changePassCurrent").addClass("requiredField");
	}
	else { 
		$("#changePassCurrent").removeClass("requiredField");
	}

	if ($("#changePassNew").val().length<8) {
		$("#changePassNew").addClass("requiredField");
		$('#changePassPopupError').text("Password should be at least 8 characters.");
	}
	else { 
		$("#changePassNew").removeClass("requiredField");
		$('#changePassPopupError').text("");
	}
	
	if ($("#changePassConfirm").val().length<8) {
		$("#changePassConfirm").addClass("requiredField");
	}
	else { 
		$("#changePassConfirm").removeClass("requiredField");
	}
	
	if ($("#changePassNew").val() != $("#changePassConfirm").val()) {
		$("#changePassNew").addClass("requiredField");
		$("#changePassConfirm").addClass("requiredField");
		$('#changePassPopupError').text("Passwords do not match!");
	}
	else { 
		$("#changePassConfirm").removeClass("requiredField");
		$("#changePassConfirm").removeClass("requiredField");
		$('#changePassPopupError').text("");
	}

	if ($( "#changePassPopupShadow .requiredField" ).length) {return false};
	
	
		$('#changePassPopupShadow').addClass('loading');

	  $('#changePassPopupTitle').text('Please wait...');



    var loginObj = { 	email: sessionStorage.getItem("email"),
						pass:$('#changePassCurrent').val(),
						newpass:$('#changePassConfirm').val()	}

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbznCuQa2FgLDUmmV309rQMJZIpDCfu585NfB55tdYyrJ2GaVQOB/exec?callback=changePassCb",
	  
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });
  }

function changePassCb(response) {	
	if (response.success == true){
		alert("Password Changed Successfully. Please login again using your new password.");
		logout();
	}
	else 
	{
		$('#changePassPopupError').text(response.error);
		afterLoginFunction = null;
		$('#changePassPopupShadow').removeClass('loading');
		$('#changePassPopupTitle').text('Change Password');		
	}


}

function changeMarketing(recieveMarketing){
	var elem = document.getElementById("myAccountMarketing");
	elem.classList = [];
	elem.innerHTML = "Just a moment please, we are processing your request...";




    var loginObj = { 	email: sessionStorage.getItem("email"),
						marketing: recieveMarketing	}

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbwuXaKmsoIF2Bs4YqOZNyZXCWDNWh7xkmHg5sS-0dd6LWMirVA/exec?callback=changeMarketingCb",
	  
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });
  }

function changeMarketingCb(response) {	

var elem = document.getElementById("myAccountMarketing");
	if (response.success == true){
		if (response.value == true){
			elem.innerHTML = 'Great! You are currently subscribed to recieve emails regarding discounts, offers, gifts or new products! ' +
			'<a id="changeMarketing" onclick="changeMarketing(false); return false;">Click here to Unsubscribe.</a>';
		} else {
			elem.innerHTML = 'Oh Crap! You are not subscribed to recieve emails regarding discounts, offers, gifts or new products.' +
			'<a id="changeMarketing" onclick="changeMarketing(true); return false;"> Click here to Subscribe now!</a>';	
		}
		elem.classList = [response.value];
	}
	else 
	{
		elem.innerHTML = 'Error : '+ response.error;
		
	}


}

function loadMyLab() {
	var request = jQuery.ajax({
		crossDomain: true,
		url: "https://script.google.com/macros/s/AKfycbwQMliSuDjfOFXzP4-O1IaPKCZuy1CjONa3M1PkBA/exec?callback=loadMyLabCb",
		method: "GET",
		dataType: "jsonp",
		data : {userid : sessionStorage.getItem("userid")}
	});

}

function loadMyLabCb(e) {


	if (e.error) { alert(e.message) }
	else {
		var html = '';


		e.requests.forEach( function (item){


			var imgUrl = 'nectar/' + item.flavor.replace(/[^a-z0-9]/gi,'') +'.png';
			html += '<div class="myLabRequestWrapper fxFixed state'+item.state+'">';
			html += '<div class="myLabRequestFlask" style="background-image:url('+imgUrl.toLowerCase()+')">';
			html += '<span class="myLabRequestQty">' + item.quantity + 'x</span>';						
			html += '<span class="myLabRequestNectar fxDisplay fxJustifyCenter fxAlignCenter">' + item.flavor + '</span>';
			html += '</div>';
			html += '<span class="myLabRequestVaper">' + item.vaper + '</span>';

			html += '<span class="myLabRequestDate"><b>Ordered</b>' + item.datetime + '</span>';
			if (item.nicType=='F')
				html += '<span class="myLabRequestNicType"><b>Range</b><span class="nicTypeF">Seduce</span></span>';
			else
				html += '<span class="myLabRequestNicType"><b>Range</b><span class="nicTypeS">Hydra</span></span>';
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

function loadMyAccount(){
	var request = jQuery.ajax({
		crossDomain: true,
		url: "https://script.google.com/macros/s/AKfycbwcZPAD21O1NKh6OMSv90-7hI6qPec9T90d6nXOkq4__JpKm_Q/exec?callback=loadMyAccountCb",
		method: "GET",
		dataType: "jsonp",
		data : {userid : sessionStorage.getItem("userid")}
	});
}

function loadMyAccountCb(response){
	if (response.success == true){
		document.getElementById("myUserID").innerHTML = response.details.userId;
		
		var date = new Date(response.details.memberFrom);
		document.getElementById("myMembership").innerHTML = date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();;
		
		document.getElementById("myAccountName").innerHTML = response.details.fullName;
		document.getElementById("myAccountEmail").innerHTML = response.details.email;
		document.getElementById("myAccountMobile").innerHTML = response.details.mobile;
		
		changeMarketingCb({success:true, value:response.details.marketing});
		
	} else {
		alert(response.error)
	}
		pageLoaded();
}

