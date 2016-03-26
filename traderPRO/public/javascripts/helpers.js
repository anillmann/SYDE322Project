function appendList(obj,tag,data) {
	// appends list options to select forms given ids
	obj.empty();
	obj.append('<'+tag+' selected disabled>Select value</'+tag+'>');
	for (x in data) {
		obj.append('<'+tag+' value='+data[x][0]+'>' + data[x][1] + '</'+tag+'>');
	}
}

function errCheck(code) {
	switch (code) {
		case 0 :
			return "Success.";
			break;
		case -1 :
			return "Unexpected SQL Error.";
			break;
		case -2 :
			return "SQL Error. Value already exisits."
			break;
		case -3 :
			return "SQL Error. Invalid data."
			break;
	}
}