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
	this.selectCompany = function (params) {
		var sql = new selectCompany(params);
		return sql;
	}
	this.selectAccount = function (params) {
		var sql = new selectAccount(params);
		return sql;
	}
	this.selectValidTransTypes = function (params) {
		var sql = new selectValidTransTypes(params);
		return sql;
	}
	this.selectTickers = function (params) {
		var sql = new selectTickers(params);
		return sql;
	}
	this.execSP = function (sp,input_params,output_params) {
		var sql = new execSP(sp,input_params,output_params);
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

var selectCompany = function (params) {
	var qry = squel.select().from("company");
	if (params) {
		if (params.companyId) { qry.where("companyId="+params.companyId); }
	}
	this.sqlStr = qry.toString();
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

var selectValidTransTypes = function (params) {
	var assetClassId = params.assetClassId;
	this.sqlStr	= squel.select().from("v_transtypes").where("assetClassId="+assetClassId).toString();
}

var selectTickers = function (params) {
	var qry = squel.select().from("v_tickers");
	if (params.assetClassId) { qry.where("assetClassId="+params.assetClassId); }
	this.sqlStr = qry.toString();
}

var execSP = function (sp,input_params,output_params) {
	var str = "CALL ";
	str += sp + "('";
	  for (x in input_params) {
	    str += input_params[x] + "','"
	  }
	  str = str.substring(0, str.length - 1); //remove the last ', output vars dont need it

	  for (i=1;i<=output_params;i++) {
	    str += "@o" + i + ",";
	  }
	  str = str.substring(0, str.length - 1);
	  str +=  "); ";
	  
	  str += "SELECT ";
	  for (i=1;i<=output_params;i++) {
	      str += "@o" + i + ",";
	  }
	  str = str.substring(0, str.length - 1) + ";";
    this.sqlStr = str.toString();
}

