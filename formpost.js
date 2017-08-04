    JSONTest = function() {
        alert("version 2");
        var request = new XMLHttpRequest();
var params = "entry.1565555327=something";
request.open('POST', "http://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse", true);
request.onreadystatechange = function() {if (request.readyState==4) alert("It worked!");};
request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
request.setRequestHeader("Content-length", params.length);
request.setRequestHeader("Connection", "close");
request.send(params);
    }
    JSONTesst = function() {
    var resultDiv = $("#resultDivContainer");
        
        
        // url: "https://docs.google.com/a/www.mamasnectar.com/forms/d/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",
        
    $.ajax({
        url: "http://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",    
        "Access-Control-Allow-Origin": "*",
        type: "POST",
        data: 
          {        
          "entry.1565555327": $("#liquidOrderCustomerName").text(),
          "entry.1619189758":$("#liquidOrderCustomerEmail").text(),
          "entry.904873223":"http://graph.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")+"/picture?width=800&height=800",
          "entry.1380378158":"http://www.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")
            }        
        ,                
        dataType: "xml",
        statusCode:{
            0: function(){
                alert('bully');
             },
            200:function(){
                alert('bully');
             }
        }    ,
        success: function (result) {
            switch (result) {
                case true:
                    console.log("success true :" +result);
                    break;
                default:
                    console.log("success true :" +result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("status: "+xhr.status+" | error: "+thrownError);
        
        }
    });
};
