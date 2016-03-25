var squel = require('squel');

exports.sqlQuery = function () {
	this.selectCountry = function () {
		var sql = new selectCountry();
		return sql;
	}
	this.selectCurrency = function () {
		var sql = new selectCurrency();
		return sql;
	}
	this.selectAssetClass = function () {
		var sql = new selectAssetClass();
		return sql;
	}
}

var selectCountry = function () {
	this.sqlStr = squel.select().from("country").toString();
}

var selectCurrency = function () {
	this.sqlStr = squel.select().from("currency").toString();
}

var selectAssetClass = function () {
	this.sqlStr = squel.select().from("assetClass").toString();
}
