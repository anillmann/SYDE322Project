$(document).ready(function(){

	// test
	$('#test').click(function(){
			
		var val = [];

		var params = JSON.stringify({
			'table' : 'sector'
		});

		console.log('clicked');

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