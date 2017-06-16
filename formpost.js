
    
    JSONTest = function() {
    var resultDiv = $("#resultDivContainer");
    $.ajax({
        url: "http://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",
        type: "POST",
        data: 
        {
          "entry.1565555327": $("#liquidOrderCustomerName").text(),
          "entry.1619189758":$("#liquidOrderCustomerEmail").text(),
          "entry.904873223":"http://graph.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")+"/picture?width=800&height=800",
          "entry.1380378158":"http://www.facebook.com/"+$("#liquidOrderCustomerName").attr("fbid")
        },                
        dataType: "json",
        success: function (result) {
            switch (result) {
                case true:
                    console.log(result);
                    break;
                default:
                    console.log(result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert("status: "+xhr.status+" | error: "+thrownError);
        
        }
    });
};
