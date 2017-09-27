  // Make an AJAX call to Google Script
  function formPcccost() {
    
    var url = "https://script.google.com/macros/s/AKfycby2yL0OxsZFDEzESDNHBTqGdZuZHwCzkbBjQ6_prTtZDt3iHACU/exec?callback=testCb";

	var flavor = 'a';//$('#loginPopupEmail').val();
	var email = 'b';//$('#loginPopupPassword').val();
	var size = 'c';//$('#loginPopupPassword').val();
	var nicotine = 'd';//$('#loginPopupPassword').val();
	var vg = 'e';//$('#loginPopupPassword').val();
	var qty = 'f';//$('#loginPopupPassword').val();
	var nickname = 'g';//$('#loginPopupPassword').val();

    var request = jQuery.ajax({
      crossDomain: true,
      url: url + '&flv='+encodeURIComponent(flavor)+'&eml='+encodeURIComponent(email)+'&siz='+encodeURIComponent(email)+'&nct='+encodeURIComponent(email)+'&vgr='+encodeURIComponent(email)+'&qty='+encodeURIComponent(email)+'&nnm='+encodeURIComponent(email),
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
function tecccstCb(response) {
	console.log(response)
	
}



  function formPost() {
      if ($("#liquidOrderCustomerNickname").val()=="") {
        $("#liquidOrderCustomerNickname").addClass("requiredField")}
        else { $("#liquidOrderCustomerNickname").removeClass("requiredField")}
     
      if ($("#liquidOrderSize").val()=="") {
        $("#liquidOrderSize").addClass("requiredField")}
        else { $("#liquidOrderSize").removeClass("requiredField")}        
        
      if ($("#liquidOrderQuantity").val()=="") {
        $("#liquidOrderQuantity").addClass("requiredField")}
        else { $("#liquidOrderQuantity").removeClass("requiredField")}
     
      if ($("#liquidOrderNicotine").val()=="") {
        $("#liquidOrderNicotine").addClass("requiredField")}
        else { $("#liquidOrderNicotine").removeClass("requiredField")}
     
      if ($("#liquidOrderVG").val()=="") {
        $("#liquidOrderVG").addClass("requiredField")}
        else { $("#liquidOrderVG").removeClass("requiredField")}
     
     if ($( ".requiredField" ).length) {return false};

     
    $('#sendOrder, #cancelOrder').hide();
        
        $('#sendingPanel').fadeIn('medium');
        
        
  var url = "https://script.google.com/macros/s/AKfycby2yL0OxsZFDEzESDNHBTqGdZuZHwCzkbBjQ6_prTtZDt3iHACU/exec?callback=postRqCb";

	var flavor = 'a';//$('#loginPopupEmail').val();
	var email = 'b';//$('#loginPopupPassword').val();
	var size = 'c';//$('#loginPopupPassword').val();
	var nicotine = 'd';//$('#loginPopupPassword').val();
	var vg = 'e';//$('#loginPopupPassword').val();
	var qty = 'f';//$('#loginPopupPassword').val();
	var nickname = 'g';//$('#loginPopupPassword').val();

    var request = jQuery.ajax({
      crossDomain: true,
      url: url + '&flv='+encodeURIComponent(flavor)+'&eml='+encodeURIComponent(email)+'&siz='+encodeURIComponent(email)+'&nct='+encodeURIComponent(email)+'&vgr='+encodeURIComponent(email)+'&qty='+encodeURIComponent(email)+'&nnm='+encodeURIComponent(email),
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
function postRqCb(response) {
	if (response.success) {
		$('#orderSentPanel b').text($("#liquidOrderCustomerEmail").val());
		$('#orderSentPanel').fadeIn('medium');
		$('#cancelOrder').show();
	}
	else {
		
		alert('error');
		$('#cancelOrder').show();

	}
} 
	  
	  
	  

