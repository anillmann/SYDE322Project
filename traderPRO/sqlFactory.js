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
	this.selectSector = function () {
		var sql = new selectSector();
		return sql;
	}
	this.selectIndustry = function () {
		var sql = new selectIndustry();
		return sql;
	}
	this.test = "test";
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

var selectSector = function () {
	this.sqlStr = squel.select().from("sector").toString();
}

var selectIndustry = function () {
	this.sqlStr = squel.select().from("industry").toString();
}