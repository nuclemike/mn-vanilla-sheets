


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
      url: "https://script.google.com/macros/s/AKfycby2yL0OxsZFDEzESDNHBTqGdZuZHwCzkbBjQ6_prTtZDt3iHACU/exec?callback=postRqCb",
      method: "GET",
      dataType: "jsonp",
      data: requestObj
    });

  }

  // print the returned data
function postRqCb(response) {
	if (response.success) {
		$('#orderSentPanelEmail').text($("#liquidOrderCustomerEmail").text());
		$('#orderSentPanelRequestID').text($("#liquidOrderCustomerEmail").text());
		$('#orderSentPanel').fadeIn('medium');
		$('#cancelOrder').show();
	}
	else {
		
		alert('error : ' + response.error);
		$('#cancelOrder').show();

	}
} 
	  
	  
	  

