
function populateUser(success) {
      if(success)
      {
            document.getElementById('headerLogin').innerHTML = 'Welcome '+sessionStorage.getItem("name")+'!  <a onclick="logout()">Logout</a>';   
      }
      else {
            document.getElementById('headerLogin').innerHTML = '';   
            var isInMyLab = document.getElementById("labRequestsSection");
            if (isInMyLab) loadContent('nectars');
      }
     
}

// Make an AJAX call to Google Script
function loadMyLab() {
      document.getElementById("myLabName").innerHTML = sessionStorage.getItem("name");
      var url = "https://script.google.com/macros/s/AKfycbwlPr1tGcEfREwpFbMoXyQaqWMnW5hcWNRd_Eqos_HUZxLu5LX7/exec?callback=gLRCb&email=";
      var email =  sessionStorage.getItem("email");

      var request = jQuery.ajax({
            crossDomain: true,
            url: url + encodeURIComponent(email),
            method: "GET",
            dataType: "jsonp"
      });
     
}

  // print the returned data
      function gLRCb(e) {
         
            
            if (e.error){
                  alert(e.message);
            }
            else {
                  var html = '';                  
                  
                  if (e.pending.length > 0){
                        html += '<h2>Processing</h2>';
                        html += '<table>';
                        html += '<tr>';
                        html += '<th>Nectar</th>';
                        html += '<th>Size</th>';
                        html += '<th>Nicotine</th>';
                        html += '<th>VP/PG</th>';
                        html += '<th>Quantity</th>';
                        html += '<th>Nickname</th>';
                        html += '</tr>';
                        
                        e.pending.forEach( function (item){
                              html += '<tr>';
                              html += '<td>' + item.flavor + '</td>';
                              html += '<td>' + item.size + '</td>';
                              html += '<td>' + item.nicotine + '</td>';
                              html += '<td>' + item.vg + '</td>';
                              html += '<td>' + item.quantity + '</td>';
                              html += '<td>' + item.nickname + '</td>';
                              html += '</tr>';
                        });
                        html += '</table>';
                  }
                  else{     
                        html = '<span>you have no Pending Lab-Requests</span><br><br>'
                  }
               
                  
                  if (e.ready.length > 0){
                        html += '<h2>Ready for Pickup!</h2>';
                        html += '<table>';
                        html += '<tr>';
                        html += '<th>Nectar</th>';
                        html += '<th>Size</th>';
                        html += '<th>Nicotine</th>';
                        html += '<th>VP/PG</th>';
                        html += '<th>Quantity</th>';
                        html += '<th>Nickname</th>';
                        html += '</tr>';
                        
                        e.ready.forEach( function (item){
                              html += '<tr>';
                              html += '<td>' + item.flavor + '</td>';
                              html += '<td>' + item.size + '</td>';
                              html += '<td>' + item.nicotine + '</td>';
                              html += '<td>' + item.vg + '</td>';
                              html += '<td>' + item.quantity + '</td>';
                              html += '<td>' + item.nickname + '</td>';
                              html += '</tr>';
                        });
                        html += '</table>';
                  }
                  else{     
                        html = '<span>you have no Lab-Requests ready for pickup</span><br><br>'
                  }                

                  
                  document.getElementById('labRequestsInnerSection').innerHTML = html;
            }
    $("#pageLoader").hide();
      }

window.onload = function(){
  var success = loadSession();
  populateUser(success);
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


