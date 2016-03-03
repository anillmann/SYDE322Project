$(document).ready(function(){

	// functions
	function appendList(ids,tag,data) {
		// appends list options to select forms given ids
		for (id in ids) {
			$(ids[id]).empty() //.append('<option selected disabled>Select value</option>')
			for (x in data) {
				$(ids[id]).append('<' + tag + '>' + data[x] + '</' + tag +'>');
			}
		}
	}

	// test
	$('#test').click(function(){
			
		var val = [];

		var params = JSON.stringify({
			'table' : 'sector'
		});


		$.ajax('exec_qry',{
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			data : params,
			success : function(results){
				console.log(results);

				for (x in results) {
					val[x] = results[x].sector
				}

				appendList(['#test'],'div',val)

			}
		});
	});


});