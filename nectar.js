// window.localStorage.setItem('name', response.name);
//	  window.localStorage.setItem('email', response.email);
//	  window.localStorage.setItem('pass', response.pass);
//	  window.localStorage.setItem('mobile', response.mobile);
      

function readLocalStorage() {
      document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome '+localStorage.getItem("name")+'!';
      document.getElementById('liquidOrderCustomerEmail').value = localStorage.getItem("email");
      document.getElementById('loginSectionName').innerHTML = 'Welcome '+localStorage.getItem("name")+'!';
}


function populateUser() {
      document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome '+localStorage.getItem("name")+'!';
      document.getElementById('liquidOrderCustomerEmail').value = localStorage.getItem("email");
      document.getElementById('loginSectionName').innerHTML = 'Welcome '+localStorage.getItem("name")+'!';
}

// Make an AJAX call to Google Script
function getLabRequests() {
      if (localStorage.getItem("email") == null){
      }
      else{
            var url = "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=gLRCb&name=";
            var name = "nuclemike@gmail.com"

            var request = jQuery.ajax({
                  crossDomain: true,
                  url: url + encodeURIComponent(name),
                  method: "GET",
                  dataType: "jsonp"
            });
      }
}

  // print the returned data
  function gLRCb(e) {
    console.log(e.result)
  }

window.onload = function(){
  loadSession();
  getLabRequests();
};

function loadSession() {
      sessionStorage.setItem('name', localStorage.getItem("name") || saessionStorage.getItem("name"));      
      sessionStorage.setItem('email', localStorage.getItem("email") || saessionStorage.getItem("email"));            
      sessionStorage.setItem('pass', localStorage.getItem("pass") || saessionStorage.getItem("pass"));            
      sessionStorage.setItem('mobile', localStorage.getItem("mobile") || saessionStorage.getItem("mobile"));      
}

var j = i || 10; //j is now 10

