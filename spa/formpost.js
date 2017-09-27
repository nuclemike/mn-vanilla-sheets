  // Make an AJAX call to Google Script
  function test() {
    
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
      url: url + '&aaa='+encodeURIComponent(flavor)+'&bbb='+encodeURIComponent(email)+'&ccc='+encodeURIComponent(email)+'&ddd='+encodeURIComponent(email)
      method: "GET",
      dataType: "jsonp"
    });

  }

  // print the returned data
function testCb(response) {
	console.log(response)
	
}



    formPost = function() {
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

     
    $('#sendOrder').hide();
        $('#cancelOrder').css('opacity','0');
        $('#cancelOrder').attr('disabled');
        $('#sendingPanel').fadeIn('medium');
        
        
    $.ajax({
        url: "https://thingproxy.freeboard.io/fetch/https://docs.google.com/forms/d/e/1FAIpQLSeoSGSuoK1Fybl7W0Jw45NZct4hdS3E_sK8S7aPslIfqM48Zg/formResponse",    
        type: "POST",
        data: 
          {                   
              "entry.993384798": $("#liquidOrderCustomerName").text(),
              "entry.69264499": $("#liquidOrderNectarName").text(),
              "entry.859530884": "http://www.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid"),
              "entry.591208937": $("#liquidOrderCustomerEmail").val(),
              "entry.48792472": $("#liquidOrderCustomerNickname").val(),
              "entry.1844516169": $("#liquidOrderSize").val(),
              "entry.1234826815": $("#liquidOrderNicotine").val(),
              "entry.372041597": $("#liquidOrderVG").val(),
              "entry.600498963": $("#liquidOrderQuantity").val()
              
            }        
        ,                
        statusCode:{
            0: function(){
               
             },
            200:function(){
              $('#orderSentPanel b').text($("#liquidOrderCustomerEmail").val());
                    $('#orderSentPanel').fadeIn('medium', function() {
       $('#cancelOrder').removeAttr('disabled');
                        $('#cancelOrder').css('opacity','1');
        $('#fbLogout').show();
  });
             }
        }    ,
        success: function (result) {
            switch (result) {
                case true:
                    //console.log("success true :" +);
                    break;
                default:
                    //console.log("success true :" +result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("status: "+xhr.status+" | error: "+thrownError);
        
        }
    });
};
