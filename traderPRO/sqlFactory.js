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
	this.selectIndustry = function (params) {
		var sql = new selectIndustry(params);
		return sql;
	}
	this.selectAccount = function (params) {
		var sql = new selectAccount(params);
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

var selectSector = function () {
	this.sqlStr = squel.select().from("sector").toString();
}

var selectIndustry = function (params) {
	var qry = squel.select().from("industry");
	if (params) {
		var sectorId = params.sectorId;
		qry = qry.where("sectorId="+sectorId);
	}
	this.sqlStr = qry.toString();
}

var selectAccount = function (params) {
	var userId = params.userId;
	this.sqlStr = squel.select().from("account").where("userId="+userId).toString();
}

