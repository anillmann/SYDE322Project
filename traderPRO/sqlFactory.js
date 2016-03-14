var squel = require('squel');

exports.sqlQuery = function () {
	this.selectCountry = function () {
		var sql = new selectCountry();
		return sql;
	}
}

var selectCountry = function () {
	this.sqlStr = squel.select().from("country").toString();
}