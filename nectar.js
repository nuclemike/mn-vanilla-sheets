
function populateUser(success) {
      if(success)
      {
            document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!';
            document.getElementById('liquidOrderCustomerEmail').value = sessionStorage.getItem("email");
            document.getElementById('loginSectionName').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!';
      }
      else {
            document.getElementById('liquidOrderCustomerName').innerHTML = 'Unauthorized';
            document.getElementById('liquidOrderCustomerEmail').value = 'Unauthorized';
            document.getElementById('loginSectionName').innerHTML = 'Please login';            
      }
}

// Make an AJAX call to Google Script
function getLabRequests(success) {
      if (success){
            var url = "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=gLRCb&name=";
            var name = "nuclemike@gmail.com"

            var request = jQuery.ajax({
                  crossDomain: true,
                  url: url + encodeURIComponent(name),
                  method: "GET",
                  dataType: "jsonp"
            });
      }
      else{
           console.log('Lab requests Denied!') 
      }
}

  // print the returned data
  function gLRCb(e) {
    console.log(e.result)
  }

window.onload = function(){
  var success = loadSession();
  populateUser(success);
  getLabRequests(success);
};

function loadSession() {
      sessionStorage.setItem('name', localStorage.getItem("name") || sessionStorage.getItem("name"));      
      sessionStorage.setItem('email', localStorage.getItem("email") || sessionStorage.getItem("email"));            
      sessionStorage.setItem('pass', localStorage.getItem("pass") || sessionStorage.getItem("pass"));            
      sessionStorage.setItem('mobile', localStorage.getItem("mobile") || sessionStorage.getItem("mobile"));  
      var result = (sessionStorage.getItem("name") != null )
      return result;
}


