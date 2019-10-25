
function systemMessage(message, className){
			
	$( "<p id='systemMessage' class='"+className+"' >"+message+"</p>" ).insertAfter( "#header" );
	
    setTimeout(function(){ 
		
		$( "#systemMessage" ).remove();
	}, 5000);
}

function labRequestPopup(element) {	

	 if (accessNeeded(function() {labRequestPopup(element)})) {
		return false;
	 }

	

	var nectarName = $(element).children(".nectarName").html();
	var nectarInfo = $(element).children(".nectarInfo").html();
	var nectarTags = $(element).attr('props').replace(/ /g, ' • ');
	
	
	
	openMenu(false);
	$( "#pageLoader" ).show();
	$( "#pageLoader" ).html("loading <b>"+nectarName+"</b>");
	$( "#pageContent" ).hide();
	$( "#scrollContent" ).scrollTop(0);
	
	
	
	
	var nectarSimpleString = nectarName.replace(/[^a-z0-9]/gi,'').toLowerCase();
	
	
	//gtag('config', 'UA-104168459-1', {'page_path': '/'+nectarName});
	//location.hash = location.hash+'/'+nectarSimpleString;
		
    var imgUrl = './nectar/' + nectarSimpleString +'.png';
	
	
	$( "#pageContent" ).load( getPage('nectarorder'), function() { 
	
		pageLoaded();
		

		document.getElementById("liquidOrderFlask").setAttribute("src", imgUrl.toLowerCase());
		document.getElementById("liquidOrderNectarName").innerHTML = nectarName;
		document.getElementById("liquidOrderNectarInfo").innerHTML = nectarInfo;
		document.getElementById("liquidOrderNectarTags").innerHTML = nectarTags;		
		document.getElementById("liquidOrderCustomerVaper").value = sessionStorage.getItem("name");
		
		
		// if (redeemMode) {
			// $('#nectarOrderContainer').addClass('redeemMode');
			// $('#sendOrder').html('Gimme! <span>&#129322</span>');
		// }
		
	});

	 


}


function selectOption(element){
	$(element).addClass('selected').siblings().removeClass('selected');
	recalcNectar();
}

function recalcNectar() {
	var nicDose = document.getElementById("liquidOrderNicotine").value;
	
	$('#liquidOrderShotTypeRow').toggle(nicDose > 0);
	
	if ($('#liquidOrderShotTypeRow').is(":hidden")) 
		$(".liquidOrderNicTypeOption[value=F]").addClass('selected').siblings().removeClass('selected');
	
	
	var size = $('.liquidOrderSizeOption.selected').attr('value');
	
	var nicType = $('.liquidOrderNicTypeOption.selected').attr('value');
	
	$(".liquidOrderSizeOption[value=120]").toggle(nicType == "F");
	
	if (size == 120 && nicType == "S") {
		$(".liquidOrderSizeOption[value=60]").addClass('selected').siblings().removeClass('selected');	
		size = 60;
	}

    var size = $('.liquidOrderSizeOption.selected').attr('value');
	var qty = document.getElementById("liquidOrderQuantity").value;
	
	var price = 0.00;
	var total = 0.00;
	
	var backPointsValue = 0;
	
	if (size && nicDose > -1) {
		
		if (nicType == 'F') {
			if      (size == 30)  {price = 6;     }
			else if (size == 60)  {price = 10.50; }
			else if (size == 120) {price = 19.50; }
		} else {
			if      (size == 30)  {price = 7;     }
			else if (size == 60)  {price = 12.50; }
			else if (size == 120) {price = 23.50; }
		}
		
		//calculations
		var myPoints = 0;
		
		if (sessionStorage.getItem('points') != null) {
			myPoints = sessionStorage.getItem('points');
		}
		
		total = price * qty;	
		var backPointsValue = Math.floor( (15-nicDose) * total );
		var needMorePoints = ( total * 100 ) - myPoints;
		var hasEnoughPoints = ( myPoints >= ( total * 100 ) );
		
		//calculate points back or points to redeem		
		if ( $('#liquidOrderUsePoints').is(':checked')&& hasEnoughPoints ) {
			$('#nectarOrderContainer').addClass('redeemMode');
			document.getElementById("liquidOrderCostValue").innerHTML = "FREE!";
		    document.getElementById("redeemInfoText").innerHTML = "you'll use <b class='points'>"+100 * total +"</b> points for this purchase!";
			$('#redeemInfoText').show();
		} else {
			$('#nectarOrderContainer').removeClass('redeemMode');
			$("#liquidOrderUsePoints").prop("checked", false);
			document.getElementById("liquidOrderCostValue").innerHTML = "€"+total.toFixed(2);		
			document.getElementById("redeemInfoText").innerHTML = "you'll earn <b class='points'>"+backPointsValue+"</b> points with this purchase!";
			$('#redeemInfoText').toggle(backPointsValue > 0);
		}
		
		
		
		
		//if user has enough points
		if ( hasEnoughPoints ) {
			$('#liquidOrderRedeemRow').removeClass('notEnough');	
			document.getElementById("liquidOrderUsePointsCaption").innerHTML = "Get for Free!";	
			document.getElementById("liquidOrderUsePointsInfo").innerHTML = "Congrats! You have "+myPoints+" points left! That's enough! ";
			
			
		} else {
			$('#liquidOrderRedeemRow').addClass('notEnough');
			document.getElementById("liquidOrderUsePointsCaption").innerHTML = "you've got "+ myPoints +" points";
			
			document.getElementById("liquidOrderUsePointsInfo").innerHTML = "You need "+ needMorePoints +" more to get this order for free.";
		
		}
		
		
		
		
		
		
		

		 

		
		
	}
	
		$('#liquidOrderCostRow, #liquidOrderRedeemRow').toggle( (size != undefined) && (nicDose > -1) );
				

}



