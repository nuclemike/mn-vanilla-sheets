
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
            console.log(e)
            
            if (e.error){
                  alert(e.message);
            }
            else {
                  var pendingRequests = '';                  
                  
                  if (e.pending.length > 0){
                        pendingRequests = '<table>';
                        pendingRequests = '<tr>';
                        pendingRequests += '<th>Nectar</th>';
                        pendingRequests += '<th>Size</th>';
                        pendingRequests += '<th>Nicotine</th>';
                        pendingRequests += '<th>VP/PG</th>';
                        pendingRequests += '<th>Quantity</th>';
                        pendingRequests += '<th>Nickname</th>';
                        pendingRequests = '</tr>';
                        
                        e.pending.forEach( function (item){
                              pendingRequests = '<tr>';
                              pendingRequests += '<td>' + item.flavor + '</td>';
                              pendingRequests += '<td>' + item.size + '</td>';
                              pendingRequests += '<td>' + item.nicotine + '</td>';
                              pendingRequests += '<td>' + item.vg + '</td>';
                              pendingRequests += '<td>' + item.quantity + '</td>';
                              pendingRequests += '<td>' + item.nickname + '</td>';
                              pendingRequests = '</tr>';
                        });
                        pendingRequests = '</table>';
                  }
                  else{     
                        pendingRequests = '<span>you have no Pending Lab-Requests</span><br>'
                  }

                  
                  $('#labRequestsInnerSection').innerHtml(pendingRequests);
            }
    
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


