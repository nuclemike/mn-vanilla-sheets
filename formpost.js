
    formPost = function() {

    $('#sendOrder, #fbLogout').hide();
        $('#cancelOrder').css('opacity','0');
        $('#cancelOrder').attr('disabled');
        $('#sendingPanel').fadeIn('medium');
        
        
    $.ajax({
        url: "https://thingproxy.freeboard.io/fetch/https://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",    
        type: "POST",
        data: 
          {                   
              "entry.1565555327": $("#liquidOrderCustomerName").text(),
              "entry.1212940529": $("#liquidOrderNectarName").text(),
              "entry.1380378158": "http://www.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid"),
              "entry.1619189758": $("#liquidOrderCustomerEmail").val(),
              "entry.601560370": $("#liquidOrderSize").val(),
              "entry.1250591470": $("#liquidOrderNicotine").val(),
              "entry.1798744401": $("#liquidOrderVG").val(),
              "entry.1820674796": $("#liquidOrderQuantity").val()
              
            }        
        ,                
        dataType: "xml",
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
