


  function formPost() {
      if ($("#liquidOrderCustomerNickname").val()=="") {
        $("#liquidOrderCustomerNickname").addClass("requiredField")}
        else { $("#liquidOrderCustomerNickname").removeClass("requiredField")}
     
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
			   nickname : $('#liquidOrderCustomerNickname').val() }			   	

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
	if (response.success) {
		$('#orderSentPanelEmail').text($("#liquidOrderCustomerEmail").text());
		$('#orderSentPanelRequestID').text(response.requestID);
		$('#orderSentPanel').fadeIn('medium');
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
	  $('#loginPopupWelcome').text('just a sec...');

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
		closeLoginPopup();  

	}
	else 
	{
		$('#loginPopupError').text(response.name);
		afterLoginFunction = null;
	}
	$('#loginPopupShadow').removeClass('loading');
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
                        html += '<h2>Processing</h2>';
                        html += '<table>';
                        html += '<tr>';
                        html += '<th>Nectar</th>';
                        html += '<th>Size</th>';
                        html += '<th>Nicotine</th>';
                        html += '<th>VP/PG</th>';
                        html += '<th>Quantity</th>';
                        html += '<th>Nickname</th>';
                        html += '</tr>';
                        
                        e.pending.forEach( function (item){
                              html += '<tr>';
                              html += '<td>' + item.flavor + '</td>';
                              html += '<td>' + item.size + '</td>';
                              html += '<td>' + item.nicotine + '</td>';
                              html += '<td>' + item.vg + '</td>';
                              html += '<td>' + item.quantity + '</td>';
                              html += '<td>' + item.nickname + '</td>';
                              html += '</tr>';
                        });
                        html += '</table>';
                  }
                  else{     
                        html = '<span>you have no Pending Lab-Requests</span><br><br>'
                  }
               
                  
                  if (e.ready.length > 0){
                        html += '<h2>Ready for Pickup!</h2>';
                        html += '<table>';
                        html += '<tr>';
                        html += '<th>Nectar</th>';
                        html += '<th>Size</th>';
                        html += '<th>Nicotine</th>';
                        html += '<th>VP/PG</th>';
                        html += '<th>Quantity</th>';
                        html += '<th>Nickname</th>';
                        html += '</tr>';
                        
                        e.ready.forEach( function (item){
                              html += '<tr>';
                              html += '<td>' + item.flavor + '</td>';
                              html += '<td>' + item.size + '</td>';
                              html += '<td>' + item.nicotine + '</td>';
                              html += '<td>' + item.vg + '</td>';
                              html += '<td>' + item.quantity + '</td>';
                              html += '<td>' + item.nickname + '</td>';
                              html += '</tr>';
                        });
                        html += '</table>';
                  }
                  else{     
                        html = '<span>you have no Lab-Requests ready for pickup</span><br><br>'
                  }                

                  
                  document.getElementById('labRequestsInnerSection').innerHTML = html;
            }
    pageLoaded();
      }


	  
	  

