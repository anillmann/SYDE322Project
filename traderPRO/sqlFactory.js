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
	this.selectTransTypes = function () {
		var sql = new selectTransTypes();
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
	this.insertTrans = function (params) {
		var sql = new insertTrans(params);
		return sql;
	}
	this.selectTrans = function (params) {
		var sql = new selectTrans(params);
		return sql;
	}
	this.selectTransFormat = function (params) {
		var sql = new selectTransFormat(params);
		return sql;
	}
	this.deleteTrans = function (params) {
		var sql = new deleteTrans(params);
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

var selectTransTypes = function () {
	this.sqlStr = squel.select().from("transtype").toString();
}

var selectTickers = function (params) {
	var qry = squel.select().from("v_tickers");
	if (params) {
		if (params.assetClassId) { qry.where("assetClassId="+params.assetClassId); }
		if (params.countryId) { qry.where("countryId="+params.countryId); }
		if (params.tickerId) { qry.where("tickerId="+params.tickerId); }
	}
	this.sqlStr = qry.toString();
}

 var selectTrans = function (params) {
 	var qry = squel.select().from("trans");
	if (params) {
		if (params.accountId) { qry.where("accountId="+params.accountId); }
		if (params.transId) { qry.where("transId="+params.transId); }
	}
	this.sqlStr = qry.toString();
 }

var selectTransFormat = function (params) {
 	var qry = squel.select().from("v_trans");
	if (params) {
		if (params.accountId) { qry.where("accountId="+params.accountId); }
	}
	qry.order("transDate",false);
	this.sqlStr = qry.toString();
 }

 var deleteTrans = function (params) {
 	var qry = squel.delete().from("trans").where("transId="+params.transId);
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

var insertTrans = function(params) {
	var transTypeId = params.transTypeId;
	var transDate = params.transDate;
	var transPrice = params.transPrice;
	var transAmt = params.transAmt;
	var tickerId = params.tickerId;
	var accountId = params.accountId;
	var str = squel.insert().into("trans")
							.set("transTypeId",transTypeId)
							.set("transDate",procDate(transDate))
							.set("transPrice",transPrice)
							.set("transAmt",transAmt)
							.set("accountId",accountId)
							.set("tickerId",tickerId).toString() + "; ";
	str += "CALL calc_Positions('"+procDate(transDate)+"',@o1)"
	this.sqlStr = str;
}

function procDate (str) {
	var d;
	d = new Date(str);
	var month = d.getMonth() + 1;
	return d.getFullYear()+'-'+month+'-'+d.getDate();
}