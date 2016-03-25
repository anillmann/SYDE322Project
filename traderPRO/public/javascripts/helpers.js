function appendList(obj,tag,data) {
	// appends list options to select forms given ids
	obj.empty();
	obj.append('<'+tag+' selected disabled>Select value</'+tag+'>');
	for (x in data) {
		obj.append('<'+tag+' value='+data[x][0]+'>' + data[x][1] + '</'+tag+'>');
	}
}