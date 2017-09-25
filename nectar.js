// window.localStorage.setItem('name', response.name);
//	  window.localStorage.setItem('email', response.email);
//	  window.localStorage.setItem('pass', response.pass);
//	  window.localStorage.setItem('mobile', response.mobile);
      

function readLocalStorage() {
      document.getElementById('liquidOrderCustomerName').innerHTML = 'Welcome '+localStorage.getItem("name")+'!';
      document.getElementById('liquidOrderCustomerEmail').value = localStorage.getItem("email");
}

readLocalStorage();

