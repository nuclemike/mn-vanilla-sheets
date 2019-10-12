
function sendRequest() {       	

      if ( $('.liquidOrderSizeOption.selected').attr('value') == undefined || 
	       $("#liquidOrderNicotine").val() < 0 || 
		   $("#liquidOrderVG").val()=="" ) 
		   {
			    $('#liquidOrderTable').addClass('error');
				
				setTimeout(function () { 
				
					$('#liquidOrderTable').removeClass('error');
				}, 50);

			  return false
		   }


    $('#sendOrder, #cancelOrder').hide();
	$('#liquidOrderData').addClass('sending');
	
	
	
 

	var requestObj = { email : sessionStorage.getItem("email"),
			   pass : sessionStorage.getItem("pass"),
			   qty : $('#liquidOrderQuantity').val(),
			   flavor : $('#liquidOrderNectarName').text(),
			   size : $('.liquidOrderSizeOption.selected').attr('value'),
			   nicotine : $('#liquidOrderNicotine').val(),
			   nicType : $('.liquidOrderNicTypeOption.selected').attr('value'),
			   vg : $('#liquidOrderVG').val(),
			   vaper : $('#liquidOrderCustomerVaper').val(),
				usePoints : $('#liquidOrderUsePoints').is(':checked')			   }			   	






	
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbzjtKUgF2SzKQcy6HX_HN-nTH02act4ycyXbcSS/exec",
		type: "POST",
		data: requestObj,
		success: function(response) {        
			sendRequestCb(JSON.parse(response));
		},
		error: function() {        
			alert('ERROR');
		}

	})

   var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbzOCqcFbtdt_Tb4rLgvTyrCwpXTqihkEf2cxW_l/exec?callback=sendRequestCb",
	        
      method: "GET",
      dataType: "jsonp",
      data: requestObj
    });

  }

function sendRequestCb(response) {
	
	if (response.success) {
		
		systemMessage("<b>Thanks a Bunch!</b><br> View more in <u onclick=preloadContent('mylab')>myLAB</u>", 'green');
	}
	else 
	{
		systemMessage(response.error, 'red');
		

	}
	loadContent('nectars'); 
	
	
    // setTimeout(function(){ 
		
		// $( "#systemMessage" ).hide();
	// }, 5000);
         
	
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

			
			
		var loginObj = { 
			email:  $('#loginPopupEmail').val(),
			pass:   $('#loginPopupPassword').val(),
			userid: null,
			seid:   null 
		}
		



		
		

    // var request = jQuery.ajax({
      // crossDomain: true,
      // url: "https://script.google.com/macros/s/AKfycbzS-JJ4GgrJTnnmiyuupkLhAGFoFKTRzLw-ZG2QNoFFpF1iMV6o/exec?callback=loginCb",
      // method: "POST",
      // dataType: "jsonp",
      // data : loginObj
    // });
	
	
	$.ajax({
		url: "https://script.google.com/macros/s/AKfycbzS-JJ4GgrJTnnmiyuupkLhAGFoFKTRzLw-ZG2QNoFFpF1iMV6o/exec",
		type: "POST",
		data: loginObj,
		success: function(response) {        
			loginCb(JSON.parse(response));
		},
		error: function() {        
			alert('ERROR');
		}

	})


  }
  
function loginCb(response) {	

	
	if(response.success)
	{
		sessionStorage.setItem('userid', response.userid);    
		sessionStorage.setItem('name', response.name);    
		sessionStorage.setItem('email', response.email);    
		sessionStorage.setItem('points', response.points);    
		sessionStorage.setItem('seid', response.seid);   

		//if remember me, save session into localStorage
		if (document.getElementById('rememberMe').checked) {
			localStorage.setItem('userid', response.userid); 
			localStorage.setItem('seid', response.seid); 		
		}
		
		

		if (afterLoginFunction != undefined) afterLoginFunction();
		$('#loginPopupShadow').removeClass('loading');
		closeCredPopup('loginPopupShadow');  
		
		$('.credPopupData').remove();

	}
	else 
	{
		$('#loginPopupError').text(response.error);
		afterLoginFunction = undefined;
		$('#loginPopupShadow').removeClass('loading');
		$("#loginPopupEmail").focus()
	}
	
	populateUser(response.success);	

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
		afterLoginFunction = undefined;
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
		
					
		stateDefs = { 
			''  : '',
			'U' : 'Unpaid',
			'R' : '',
			'N' : 'Produced',
						}
		
		var html = `<div class="myLabRequestRow fxDisplay">
						<div class="fxStretch myLabRequestMidCol">
							<span class="myLabRequestRowFlavor">Product</span>
						</div>
						<div class="fxFixed myLabRequestEndCol">
							<span class="myLabRequestRowPrice"></span>
						</div>
					</div>`;
		var totalPrice = 0.00;
		e.requests.forEach( function (item){
			
				totalPrice += item.price;
				
				var imgUrl = 'nectar/' + item.flavor.replace(/[^a-z0-9]/gi,'') +'.png';
				var nicText = '';
				if (item.nicotine > 0){
					nicText = item.nicType=='F' ? ' Freebase' : ' Salt'
				}
				var vgText = '';
				if ( Math.round(item.vg) == 100 ) {
					vgText="MAX-VG"
				}
				else {
					vgText = Math.round(item.vg)+"/"+ Math.round(100-item.vg)
				}
						
				
				html += '<div class="myLabRequestRow fxDisplay">';
					


					html += '<img class="fxFixed fxDisplay fxAlignCenter" src="'+imgUrl.toLowerCase()+'"/>';

					html += '<div class="fxStretch myLabRequestMidCol">';			
						html += '<span class="myLabRequestRowFlavor">' + item.flavor + '</span>';						
						html += '<span class="myLabRequestRowInfo">';
							html += '<span>' +item.quantity + 'x ' + item.size + 'ml' + '</span>';
							html += '<span>' + item.nicotine + 'mg'+nicText + '</span>';	
							html += '<span>' + vgText + '</span>';
							html += '<span>' + item.vaper + '</span>';
							html += '<span>' + item.datetime + '</span>';
						html += '</span>';
					html += '</div>';
					html += '<div class="fxFixed myLabRequestEndCol">';
						html += '<span class="myLabRequestRowPrice">€' + item.price.toFixed(2) + '</span>';
						html += '<span class="myLabRequestGridState state'+item.state+'">' + stateDefs[item.state] + '</span>';
					html += '</div>';
				html += '</div>';
				
		});
		
		

						
				
					
		

		
		

				

		if (e.requests.length > 0) { 
			
		var	 footerHtml =  '<div class="myLabRequestTotalSummary">';
			footerHtml += 	'<span class="">Total<b>€'+totalPrice.toFixed(2)+'</b></span>';	
			footerHtml += '</div>';
			


			document.getElementById('myLabRequestContainer').innerHTML = '<div class="myLabRequestGrid fxDisplay fxDirCol">'+html+'</div>'+footerHtml;	
			
		} 
		else {
			html = '<h2 class="noLabRequests">you have no lab-requests</h2>' 
			document.getElementById('myLabRequestContainer').innerHTML = '<div class="myLabRequestGrid fxDisplay fxDirCol">'+html+'</div>'+footerHtml;	
		}
		
	
		
		
	}

	pageLoaded();
}

function loadMyAccount(){
	
	if (sessionStorage.getItem("userid") && sessionStorage.getItem("seid"))
	{
		var userRef = {
			userid : sessionStorage.getItem("userid"),
			seid : sessionStorage.getItem("seid")
		}
		var request = jQuery.ajax({
			crossDomain: true,
			url: "https://script.google.com/macros/s/AKfycbwXffCM5Bszinspmq4Gidvq9qyGs_egLaVhmI5ckfxSREbGlxwf/exec/exec?callback=loadMyAccountCb",
			method: "GET",
			dataType: "jsonp",
			data : userRef
		});
	}
}

function loadMyAccountCb(response){
	if (response.success == true){
		document.getElementById("myUserID").innerHTML = response.details.userId;
		
		var date = new Date(response.details.memberFrom);
		document.getElementById("myMembership").innerHTML = date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();;
		document.getElementById("myAccountPoints").innerHTML = response.details.points;
		document.getElementById("myAccountName").innerHTML = response.details.fullName;
		document.getElementById("myAccountEmail").innerHTML = response.details.email;
		document.getElementById("myAccountMobile").innerHTML = response.details.mobile;
		
		changeMarketingCb({success:true, value:response.details.marketing});
		
	} else {
		alert(response.error)
	}
		pageLoaded();
}

