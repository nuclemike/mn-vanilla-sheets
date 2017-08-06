

 authorizeClient = function() {

    $('#sendOrder, #fbLogout').hide();
        $('#notAuthorizedPanelContact').text('loading...');
        $('#notAuthorizedPanelContact').attr('disabled');

        
        
    $.ajax({
        url: "https://thingproxy.freeboard.io/fetch/https://docs.google.com/forms/d/e/1FAIpQLSeThuXsSBXytfXAi1U1kUPwITobAP0qww-JFOfGTjNFi3LNeA/formResponse",    
        type: "POST",
        data: 
          {                   
              "entry.473573732": $("#liquidOrderCustomerName").attr("fbid"),
              "entry.779597357": $("#liquidOrderCustomerName").text()
            }        
        ,                
        statusCode:{
            0: function(){
               
             },
            200:function(){
                window.location.assign("http://m.me/mamasnectar");
              $('#notAuthorizedPanelContact').hide();
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


    formPost = function() {

    $('#sendOrder, #fbLogout').hide();
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
