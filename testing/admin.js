function fetchProduction() {

	var request = jQuery.ajax({
		crossDomain: true,
		url: "https://script.google.com/macros/s/AKfycbzt92wYbTAU42aojnQCMghvQ9Eo6k2zw7f2ulp3gw9mOytblWE/exec?callback=fetchProductionCb",
		method: "GET",
		dataType: "jsonp",
		data : {userid : localStorage.getItem("userid")}
	});

}               

function fetchProductionCb(e) {


	if (e.error) { alert(e.message) }
	else {

		var seduceArray = []
		var hydraArray = [];
		var seduceShots = 0;
		var hydraShots = 0;

		//compute seduce and hydra - fill arrays + shots
		e.requests.forEach( function (item){


			if (item.nicType == 'F') {

				var found = false;
					
				for (var i = 0; i < seduceArray.length; i++) {			
					if (seduceArray[i].flavor === item.flavor) {								
						seduceArray[i][item.size] += item.quantity;									
						found = true;
					}
				}
					
				if (!found) {
					seduceArray.push({flavor : item.flavor, '30':0, '60':0, '120':0})
					seduceArray[seduceArray.length-1][item.size] = item.quantity;
				}
				
				seduceShots += item.quantity *  Math.ceil( (item.nicotine / 72 * item.size ) / ( 24 / 72 * 10 ) );
				
			} else if (item.nicType == 'S') {

				var found = false;
					
				for (var i = 0; i < hydraArray.length; i++) {			
					if (hydraArray[i].flavor === item.flavor) {								
						hydraArray[i][item.size] += item.quantity;									
						found = true;
					}
				}
					
				if (!found) {
					hydraArray.push({flavor : item.flavor, '30':0, '60':0, '120':0})
					hydraArray[hydraArray.length-1][item.size] = item.quantity;
				}
				
				hydraShots += item.quantity *  Math.ceil( (item.nicotine / 200 * item.size ) / ( 24 / 200 * 10 ) );
				
			} 
			
		});
		
		
		//show seduce
		var html = '<tr>';
		html += '<th>Seduce (Freebase)</th><th>30</th><th>60</th><th>120</th>';
		html += '</tr>';
		
		var count = {'30':0,'60':0,'120':0};
		
		seduceArray.forEach( function (item){

			html += '<tr>';
			html += '<td>'+item.flavor+'</td><td>'+item['30']+'</td><td>'+item['60']+'</td><td>'+item['120']+'</td>';
			html += '</tr>';		

			count['30'] += item['30'];
			count['60'] += item['60'];
			count['120'] += item['120'];
			
			
		});	

			html += '<tr>';
			html += '<td>Total Shots : '+seduceShots+'</td><td>'+count['30']+'</td><td>'+count['60']+'</td><td>'+count['120']+'</td>';
			html += '</tr>';				
		
		document.getElementById("seduceProductionTable").innerHTML = html;
		
		//show hydra
		var html = '<tr>';
		html += '<th>Hydra (Salt)</th><th>30</th><th>60</th><th>120</th>';
		html += '</tr>';
		
		var count = {'30':0,'60':0,'120':0};
		
		hydraArray.forEach( function (item){

			html += '<tr>';
			html += '<td>'+item.flavor+'</td><td>'+item['30']+'</td><td>'+item['60']+'</td><td>'+item['120']+'</td>';
			html += '</tr>';		

			count['30'] += item['30'];
			count['60'] += item['60'];
			count['120'] += item['120'];
			
			
		});	

			html += '<tr>';
			html += '<td>Total Shots : '+hydraShots+'</td><td>'+count['30']+'</td><td>'+count['60']+'</td><td>'+count['120']+'</td>';
			html += '</tr>';				
		
		document.getElementById("hydraProductionTable").innerHTML = html;		
	}
	
}


