  function fb_login(){
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID
            testAPI();
        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile,email,read_page_mailboxes'
    });
}
  
  function fb_logout(){  
  FB.logout(function(response) {
  // user is now logged out
    
    statusChangeCallback(response);
   // fb_login()
});
  }
  
  
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
     setLoggedOut();
    }
  }
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  
  
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '648709548655451',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
  };
  
  
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  

  function setLoggedOut() {
     document.getElementById('authorizationText').innerHTML = 'Unauthorized: Please login with Facebook.';
      document.getElementById('authorizationText').className = "denied";
    
      document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome dear Vaper!';
      document.getElementById('liquidOrderCustomerName').setAttribute("fbid", '');
      document.getElementById('liquidOrderCustomerEmail').value = '';
      document.getElementById('liquidOrderCustomerThumbnail').setAttribute("src","stylesheets/user.jpg");
    
      document.getElementById('fbLoginPanel').style.display = "block";
      document.getElementById('sendOrder').style.display = "none";      
      document.getElementById('fbLogout').style.display = "none";     
      document.getElementById('notAuthorizedPanel').style.display = "none";     
      document.getElementById('liquidOrderTable').style.display = "none";          
    
  }

  function setNotAuthorized() {
      document.getElementById('authorizationText').innerHTML = "Your Account is not yet Activated.;
      document.getElementById('authorizationText').className = "denied";
    
      document.getElementById('liquidOrderCustomerName').innerHTML = response.name;
      document.getElementById('liquidOrderCustomerName').setAttribute("fbid", response.id);
      document.getElementById('liquidOrderCustomerEmail').value = response.email;
      document.getElementById('liquidOrderCustomerThumbnail').setAttribute("src","http://graph.facebook.com/"+response.id+"/picture?width=100&height=100");

      document.getElementById('sendOrder').style.display = "block";      
      document.getElementById('fbLogout').style.display = "block";
      document.getElementById('fbLoginPanel').style.display = "none";
      document.getElementById('notAuthorizedPanel').style.display = "block";      
      document.getElementById('liquidOrderTable').style.display = "none";      
    
  }
  
  function setAuthorized() {
      document.getElementById('authorizationText').innerHTML = "Authorized Mama's Nectar relative!";
      document.getElementById('authorizationText').className = "";        
    
      document.getElementById('liquidOrderCustomerName').innerHTML = response.name;
      document.getElementById('liquidOrderCustomerName').setAttribute("fbid", response.id);
      document.getElementById('liquidOrderCustomerEmail').value = response.email;
      document.getElementById('liquidOrderCustomerThumbnail').setAttribute("src","http://graph.facebook.com/"+response.id+"/picture?width=100&height=100");
          
      document.getElementById('sendOrder').style.display = "block";      
      document.getElementById('fbLogout').style.display = "block";
      document.getElementById('fbLoginPanel').style.display = "none";
      document.getElementById('notAuthorizedPanel').style.display = "block";    
      document.getElementById('liquidOrderTable').style.display = "block";      
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'name, email'},function(response) {
      console.log('Successful login for: ' + response.name);
      if (auths.indexOf(response.id) > -1) {
      }
      setAuthorized();
      else
      {
      setNotAuthorized();
      }
    /*
    FB.ui({
        app_id:'xxxxxxxx',
        method: 'send',
        name: "sdfds jj jjjsdj j j ",
        link: 'https://apps.facebook.com/xxxxxxxaxsa',
        to:response.id,
        description:'sasa d d dssd ds sd s s s '
    });
*/
      
      
      
    });
  }
