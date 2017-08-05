
    formPost = function() {
    var resultDiv = $("#resultDivContainer");
        
    $('#sendOrder').addClass('denied').text('sending...');    
    $.ajax({
        url: "https://thingproxy.freeboard.io/fetch/https://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",    
        type: "POST",
        data: 
          {                   
              "entry.1565555327": $("#liquidOrderCustomerName").text(),
              "entry.1212940529": $("#liquidOrderFlavor").text(),
              "entry.1380378158": $("#liquidOrderCustomerProfile").text(),
              "entry.1619189758": $("#liquidOrderCustomerEmail").text(),
              "entry.601560370": $("#liquidOrderSize").text(),
              "entry.1250591470": $("#liquidOrderNicotine").text(),
              "entry.1798744401": $("#liquidOrderVG").text(),
              
          "entry.1619189758":$("#liquidOrderCustomerEmail").text(),
          "entry.904873223":"http://graph.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")+"/picture?width=800&height=800",
          "entry.1380378158":"http://www.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")
            }        
        ,                
        dataType: "xml",
        statusCode:{
            0: function(){
                alert('bully 1');
             },
            200:function(){
                alert('t alla!');
                    $('#sendOrder').removeClass('denied').text('sending...');    
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
