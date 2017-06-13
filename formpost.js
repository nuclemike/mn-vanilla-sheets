
    
    JSONTest = function() {
    var resultDiv = $("#resultDivContainer");
    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSeCCI4TI1CVp-6FgzFk4_XRsgUa9cTDVzUK0dg_1U-gHFzkzQ/formResponse",
        type: "POST",
        data: 
        {
          "entry.1565555327": $("#status").text(),
          "entry.1619189758":$("#email").text(),
          "entry.904873223":"http://graph.facebook.com/"+$("#fbid").text()+"/picture?width=800&height=800",
          "entry.1380378158":"http://www.facebook.com/"+$("#fbid").text()
        },                
        dataType: "json",
        success: function (result) {
            switch (result) {
                case true:
                    processResponse(result);
                    break;
                default:
                    resultDiv.html(result);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
        }
    });
};
