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

		var array = [];
		var shots = 0;

		e.requests.forEach( function (item){

			var found = false;
				
			for (var i = 0; i < array.length; i++) {			
				if (array[i].flavor === item.flavor) {								
					array[i][item.size] += item.quantity;									
					found = true;
				}
			}
				
			if (!found) {
				array.push({flavor : item.flavor, '30':0, '60':0, '120':0})
				array[array.length-1][item.size] = item.quantity;
			}
			
			shots += item.quantity *  Math.ceil( (item.nicotine / 72 * item.size ) / ( 24 / 72 * 10 ) );
			
		});
		
		
		var html = '<tr>';
		html += '<th>Flavor</th><th>30</th><th>60</th><th>120</th>';
		html += '</tr>';
		
		var count = {'30':0,'60':0,'120':0};
		
		array.forEach( function (item){

			html += '<tr>';
			html += '<td>'+item.flavor+'</td><td>'+item['30']+'</td><td>'+item['60']+'</td><td>'+item['120']+'</td>';
			html += '</tr>';		

			count['30'] += item['30'];
			count['60'] += item['60'];
			count['120'] += item['120'];
			
			
		});	

			html += '<tr>';
			html += '<td>Total Shots : '+shots+'</td><td>'+count['30']+'</td><td>'+count['60']+'</td><td>'+count['120']+'</td>';
			html += '</tr>';		
		
		document.getElementById("productionTable").innerHTML = html;
	}
	
}

function containsFlavor(flavor, array) {
    var i;

	for (i = 0; i < array.length; i++) {			
		if (array[i].flavor === flavor) {
			return true;
		}
	}

    return false;
}

