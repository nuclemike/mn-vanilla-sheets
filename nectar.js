
function populateUser(success) {
      if(success)
      {
            document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!';
            document.getElementById('liquidOrderCustomerEmail').value = sessionStorage.getItem("email");
            document.getElementById('loggedInName').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!';   
      }
      else {
            document.getElementById('liquidOrderCustomerName').innerHTML = 'Unauthorized';
            document.getElementById('liquidOrderCustomerEmail').value = 'Unauthorized';
            
      }
      
      $('#loginSection').toggle(!success);
      $('#labRequestsSection').toggle(success)
}

// Make an AJAX call to Google Script
function getLabRequests(success) {
      if (success){
            var url = "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=gLRCb&email=";
            var email =  sessionStorage.getItem("email");

            var request = jQuery.ajax({
                  crossDomain: true,
                  url: url + encodeURIComponent(email),
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
        
        labRequestsInnerSection
  }

window.onload = function(){
  var success = loadSession();
  populateUser(success);
  getLabRequests(success);
};

function loadSession() {
      if (sessionStorage.getItem("name") != null) {
            return true;
                        
      }
      else {
            if (localStorage.getItem("name") != null) {
                  sessionStorage.setItem('name', localStorage.getItem("name"));       
                  sessionStorage.setItem('email', localStorage.getItem("email"));
                  sessionStorage.setItem('pass', localStorage.getItem("pass"));
                  sessionStorage.setItem('mobile', localStorage.getItem("mobile"));
                  return true;
            } 
            else return false;
      }
            
   

}


