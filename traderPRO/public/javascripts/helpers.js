function appendList(ids,tag,data) {
	// appends list options to select forms given ids
	for (id in ids) {
		$(ids[id]).empty() //.append('<option selected disabled>Select value</option>')
		for (x in data) {
			$(ids[id]).append('<' + tag + '>' + data[x] + '</' + tag +'>');
		}
	}
}