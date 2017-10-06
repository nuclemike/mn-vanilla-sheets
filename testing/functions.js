







function labRequestPopup(nectarName) {
	//$('body').css('overflow','hidden');
	var imgUrl = './liquids/' + nectarName.replace(/[^a-z0-9]/gi,'') +'.png';

	document.getElementById("liquidOrderFlask").setAttribute("style", "background-image:url('"+imgUrl.toLowerCase()+"')");
	document.getElementById("liquidOrderNectarName").innerHTML = nectarName;
	document.getElementById('liquidOrderCustomerName').innerHTML = sessionStorage.getItem("name");
	document.getElementById('liquidOrderCustomerEmail').innerHTML = sessionStorage.getItem("email");   
	
	document.getElementById('liquidOrderCustomerVaper').value = '';
	document.getElementById('liquidOrderQuantity').value = 1;
	document.getElementById('liquidOrderSize').value = '';
	document.getElementById('liquidOrderNicotine').value = '';
	document.getElementById('liquidOrderVG').value = '';
	
	updateCost();
	
	$('#orderSentPanel, #sendingPanel, #goToMyLab').hide();
	 $('#sendOrder, #cancelOrder').show();
	$("#liquidOrderSection").css("z-index","9999").fadeTo( "medium", 1 );


}

function closeLabRequestPopup() {
		//	$('body').css('overflow','auto');
		$("#liquidOrderSection").fadeTo(  "fast", 0, function() {
			$( this ).css("z-index","-9999");
		});
	}





function updateCost() {
        var size = document.getElementById("liquidOrderSize").value;
	var qty = document.getElementById("liquidOrderQuantity").value;
	var price = 0.00;
	var total = 0.00;
	var youSave = '';
	
	if (size == 30) {price = 6; }
	else if (size == 60) {price = 10.50; youSave="you save<br>€1.50!";}
	else if (size == 120) {price = 19.50; youSave="you save<br>€4.50!"}
	
	total = price * qty;
		
	document.getElementById("totalCostValue").innerHTML  = "€"+total.toFixed(2);
	document.getElementById("totalCostSave").innerHTML  = youSave;
	
}



