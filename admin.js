function fetchProduction() {

	var request = jQuery.ajax({
		crossDomain: true,
		url: "https://script.google.com/macros/s/AKfycbzt92wYbTAU42aojnQCMghvQ9Eo6k2zw7f2ulp3gw9mOytblWE/exec?callback=fetchProductionCb",
		method: "GET",
		dataType: "jsonp",
		data : {userid : sessionStorage.getItem("userid")}
	});

}               

function fetchProductionCb(e) {


	if (e.error) { alert(e.message) }
	else {
		var html = '';

		html += '<th>';
		html += '<td>qty</td><td>flavor</td><td>size</td><td>nicotine</td><td>nicType</td>';
		html += '</th>';

		e.requests.forEach( function (item){

			html += '<tr>';
			html += '<td>'+item.qty+'</td><td>'+item.flavor'+</td><td>'+item.size+'</td><td>'+item.nicotine+'</td><td>'+item.nicType+'</td>';
			html += '</tr>';			

		});

		document.getElementById("productionTable").innerHTML = html;
	}
	
}

