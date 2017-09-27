


  function formPost() {
      if ($("#liquidOrderCustomerVaper").val()=="") {
        $("#liquidOrderCustomerVaper").addClass("requiredField")}
        else { $("#liquidOrderCustomerVaper").removeClass("requiredField")}
     
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
        
        

	var requestObj = { email : $('#liquidOrderCustomerEmail').text(),
			   pass : sessionStorage.getItem("pass"),
			   qty : $('#liquidOrderQuantity').val(),
			   flavor : $('#liquidOrderNectarName').text(),
			   size : $('#liquidOrderSize').val(),
			   nicotine : $('#liquidOrderNicotine').val(),
			   vg : $('#liquidOrderVG').val(),
			   vaper : $('#liquidOrderCustomerVaper').val() }			   	

    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycby2yL0OxsZFDEzESDNHBTqGdZuZHwCzkbBjQ6_prTtZDt3iHACU/exec?callback=postRequestCallback",
      method: "GET",
      dataType: "jsonp",
      data: requestObj
    });

  }

  // print the returned data
function postRequestCallback(response) {
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
	  


  // Make an AJAX call to Google Script
  function login() {
$('#loginPopupShadow').addClass('loading');

	  $('#loginPopupWelcome').text('Authorizing...');

    var loginObj = { email:$('#loginPopupEmail').val(),
		    pass:$('#loginPopupPassword').val() }
    
    var request = jQuery.ajax({
      crossDomain: true,
      url: "https://script.google.com/macros/s/AKfycbw5G9k4sGNtTxQOaEVmSVo0VNEXEhPjfqvwAbecgVBCKyB5JuI/exec?callback=loginCallback",
      method: "GET",
      dataType: "jsonp",
      data : loginObj
    });

  }

  // print the returned data
function loginCallback(response) {	
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
		closeLoginPopup();  

	}
	else 
	{
		$('#loginPopupError').text(response.name);
		afterLoginFunction = null;
		$('#loginPopupShadow').removeClass('loading');
	$('#loginPopupWelcome').text('Authorization Required');
	}
	
}



// Make an AJAX call to Google Script
function loadMyLab() {
      document.getElementById("myLabName").innerHTML = sessionStorage.getItem("name");
    
      var request = jQuery.ajax({
            crossDomain: true,
            url: "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=loadLabCallback",
            method: "GET",
            dataType: "jsonp",
            data : {email : sessionStorage.getItem("email")}
      });
     
}

  // print the returned data
      function loadLabCallback(e) {
         
            
            if (e.error){
                  alert(e.message);
            }
            else {
                  var html = '';                  
                  
                  if (e.pending.length > 0){
                        html += '<h2 class="myLabRequestTitle">Processing</h2>';
                        html += '<div class="myLabRequestContainer">';
                        
                        e.pending.forEach( function (item){
                              html += '<img class="myLabRequestFlask" src=""/>';
                              html += '<span class="myLabRequestNectar">' + item.flavor + '</span>';
				html += '<span class="myLabRequestReference">' + item.reference + '</span>';
				html += '<span class="myLabRequestDate">' + item.datetime + '</span>';
				html += '<span class="myLabRequestSize">' + item.size + '</span>';
				html += '<span class="myLabRequestNicotine">' + item.nicotine + '</span>';
				html += '<span class="myLabRequestVg">' + item.vg + '</span>';
				html += '<span class="myLabRequestQty">' + item.quantity + '</span>';
				html += '<span class="myLabRequestVaper">' + item.vaper + '</span>';
				

                        });
                        html += '</div>';
                  }
                  else{     
                       
                  }
               
                  
                if (e.ready.length > 0){
                        html += '<h2 class="myLabRequestTitle">Processing</h2>';
                        html += '<div class="myLabRequestContainer">';
                        
                        e.pending.forEach( function (item){
                              html += '<img class="myLabRequestFlask" src=""/>';
                              html += '<span class="myLabRequestNectar">' + item.flavor + '</span>';
				html += '<span class="myLabRequestReference">' + item.reference + '</span>';
				html += '<span class="myLabRequestDate">' + item.datetime + '</span>';
				html += '<span class="myLabRequestSize">' + item.size + '</span>';
				html += '<span class="myLabRequestNicotine">' + item.nicotine + '</span>';
				html += '<span class="myLabRequestVg">' + item.vg + '</span>';
				html += '<span class="myLabRequestQty">' + item.quantity + '</span>';
				html += '<span class="myLabRequestVaper">' + item.vaper + '</span>';
				

                        });
                        html += '</div>';
                  }
                  else{     
                       
                  }       

                  
                  document.getElementById('labRequestsInnerSection').innerHTML = html;
            }
    pageLoaded();
      }



	  
	  

