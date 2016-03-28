var express = require('express');
var password = require('password-hash-and-salt');
var app = require("express")();
// var cookieParser = require('cookie-parser')
// var session = require('express-session')
//var routes = require('./routes');
var bodyParser = require('body-parser')
// MySQL connection
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'root',
  database: 'traderPRO',
  multipleStatements: true
});

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session);
app.use(bodyParser.urlencoded({
  extended: true
}));

// Important Exports
var sqlFactory = require('./sqlFactory.js');
var exports = module.exports = {};
exports.loggedIn = false;

var sqlGen = new sqlFactory.sqlQuery();

// Global Variables //
var userId = 1;

// Routes
   
  //  STARTING PAGE  //
    app.get('/:var(|index)?', function(req, res){
      res.render('index', { title: 'traderPRO'});
    });

    app.post('/index', function (req, res) {
      var username = req.body.params.username;
      var pass = req.body.params.password;
      var todo = req.body.todo;
      var sqlStr; 
 
  // Creating hash and salt 
      password(pass).hash(function(error, hash) {
        if (error) {
          throw new Error('Something went wrong!');
        } 
        else {
          var sqlParamsCre = {'username':username,'password':hash};
          var sqlParamsVal = {'username':username};

          switch(todo) {
            case 'validate' :
              sqlStr = sqlGen.execSP('validate_login',sqlParamsVal,3).sqlStr;
              conn.query(sqlStr, function (err, results) {
                if (err) {
                  console.log("Tried: "+sqlStr);
                  console.log("Got: "+err)
                } 
                else {
                  var hashReturn = results[1][0]['@o2'];
                  var dbSucc = results[1][0]['@o1'];
                  var succ = 0;
                  if (dbSucc ==0){
                    password(pass).verifyAgainst(hashReturn, function(error, verified) {
                      if(error){
                        throw new Error('Something went wrong!');
                      }
                      if(!verified){
                        succ = -3;
                        console.log("Failed password");
                      }
                      else{
                        succ = 0;
                        console.log("Password correct");
                        // req.session.loggedIn;
                      }
                      var id = results[1][0]['@o3'];
                      res.send(JSON.stringify({'success':succ}));
                      if (succ == 0 ) {
                        userId = id;
                      }
                    });
                  }
                  else {
                    succ = dbSucc;
                    var id = results[1][0]['@o3'];
                    res.send(JSON.stringify({'success':succ}));
                    if (succ == 0 ) {
                      userId = id;
                    }
                  }
                }
              });
              break;
            case 'create' :
              sqlStr = sqlGen.execSP('insert_user',sqlParamsCre,2).sqlStr;
              conn.query(sqlStr, function (err, results) {
                if (err) {
                  console.log("Tried: "+sqlStr);
                  console.log("Got: "+err)
                } 
                else {
                  var succ = results[1][0]['@o1'];
                  var id = results[1][0]['@o2'];
                  res.send(JSON.stringify({'success':succ}));
                  if (succ == 0 ) {
                    userId = id;
                  }
                }
              });
              break;
          }
        }
      });
    });

    // META DATA MGMT
    app.get('/metadatamgmt', function(req, res){
      // queries to get static data
      var getSectors = sqlGen.selectSector().sqlStr + "; ";
      var getCurrencies = sqlGen.selectCurrency().sqlStr + "; ";
      var getAssetClasses = sqlGen.selectAssetClass().sqlStr + "; ";
      var getCompanies = sqlGen.selectCompany().sqlStr + "; ";
      var getCountries = sqlGen.selectCountry().sqlStr + "; ";
      var getIndustries = sqlGen.selectIndustry().sqlStr + "; ";
      var getTickers = sqlGen.selectTickers().sqlStr + "; ";

      console.log(getCurrencies);

      var sqlStr = getSectors + getCurrencies + getAssetClasses + getCompanies + getCountries + getIndustries + getTickers;
      
      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.render('metadatamgmt', {
            title : 'traderPRO - Metadata Management', 
            sectors : results[0],
            currencies : results[1],
            assetClasses : results[2],
            companies : results[3],
            countries : results[4],
            industries : results[5],
            tickers : results[6]
          });
        }
      });       
    });

    app.post('/metadatamgmt', function (req, res) {
      var todo = req.body.todo;
      var sqlStr;
      var sqlParams = req.body.sqlParams;

      console.log(sqlParams);
      
      switch (todo) {
        case 'getIndustries' :
          var getIndustries = sqlGen.selectIndustry(sqlParams).sqlStr;
          sqlStr = getIndustries;
          break;
        
        case 'addCompany' :
          sqlStr = sqlGen.execSP('add_company',sqlParams,1).sqlStr;
          break;

        case 'addTicker' :
          sqlStr = sqlGen.execSP('add_ticker',sqlParams,1).sqlStr;
          break;

        case 'getCompanyData' :
          sqlStr = sqlGen.selectCompany(sqlParams).sqlStr;
          break;

        case 'updateCompany' :
          sqlStr = sqlGen.execSP('update_company',sqlParams,1).sqlStr;
          break;
        case 'getCountryTickers' :
          sqlStr = sqlGen.selectTickers(sqlParams).sqlStr;
          break;
        case 'getTickerData' :
          sqlStr = sqlGen.selectTickers(sqlParams).sqlStr;
          break;
        case 'updateTicker' :
          sqlStr = sqlGen.execSP('update_ticker',sqlParams,1).sqlStr;
          break;
        }
      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          console.log("Results " +results[0]);
          res.send(results);
        }
      }); 
    });

    app.get('/trade', function (req, res) {
      var sqlParams = { 'userId' : userId };
      var getAccounts = sqlGen.selectAccount(sqlParams).sqlStr + "; ";
      var getAssetClasses = sqlGen.selectAssetClass().sqlStr + "; ";
      var getRecentTrans = sqlGen.execSP('select_recentTrans',sqlParams,1).sqlStr;

      var sqlStr = getAccounts + getAssetClasses + getRecentTrans;

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.render('trade', {
            title : 'traderPRO - Trade', 
            accounts : results[0],
            assetClasses : results[1],
            transactions : results[2]
          });
        }
      });
    });

    app.post('/trade', function (req, res) {
      var todo = req.body.todo;
      var params = req.body.params;
      var sqlStr;

      switch (todo) {
        case 'getTransTypes' :
          var getValidTransTypes = sqlGen.selectValidTransTypes(params).sqlStr + "; ";
          var getTickers = sqlGen.selectTickers(params).sqlStr + "; ";
          sqlStr = getValidTransTypes + getTickers;
          break;
        case 'getTickerDetails' :
          sqlStr = sqlGen.selectTickers(params).sqlStr + "; ";
          break;
        case 'insertTrans' :
          sqlStr = sqlGen.insertTrans(params).sqlStr + "; ";
          break;
        case 'getRecentTrans' :
          sqlStr = sqlGen.selectTrans(params).sqlStr + "; ";
      }

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.send(results);
        }
      });

    });

    app.get('/portfolioOverview', function(req, res){  
      var sqlParams = { 'userId' : userId };
      var getAccounts = sqlGen.selectAccount(sqlParams).sqlStr + "; ";

      var sqlStr = getAccounts;

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.render('portfolioOverview', {
            title : 'traderPRO - Portfolio Overview', 
            accounts : results
          });
        }
      });    
    });


    app.post('/portfolioOverview', function (req, res) {
      var todo = req.body.todo;
      var params = req.body.params;
      var sqlStr;

      console.log(params.accountId);

      /*switch (todo) {
        case '' :

          break;
      }

      conn.query(sqlStr, function (err, results) {
        if (err) {
          console.log("Tried: "+sqlStr);
          console.log("Got: "+err)
        } else {
          console.log("Success: "+sqlStr);
          //console.log(results);
          res.send(results);
        }
      });*/

    });


  
//  Database Calls  //
      app.post('/exec_sp',function(req,res){
      // this is a general call that will execute any sp with parameters in the form:
      /*  
          var params = JSON.stringify({
          'sp' : 'insert_elementTag',     // the name of the SP, exactly as in the db
          'input_params' : {              // the values of the input parameters, name of key does not mater
            'i1' : 'Automotive',          // number of input parameters in emebeded JSON must match number in SP definition
            'i2' : 'Industry'
          },
          'output_params' : 1             // the number of output parameters
          });
      */     

      var sp = req.body.sp;
      var input_params = req.body.input_params;
      var output_params = req.body.output_params;
      var sqlStr = "CALL "

      sqlStr += sp + "('";
      for (x in input_params) {
        sqlStr += input_params[x] + "','"
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1); //remove the last ', output vars dont need it

      for (i=1;i<=output_params;i++) {
        sqlStr += "@o" + i + ",";
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      sqlStr +=  "); ";
      
      sqlStr += "SELECT ";
      for (i=1;i<=output_params;i++) {
          sqlStr += "@o" + i + ",";
      }
      sqlStr = sqlStr.substring(0, sqlStr.length - 1) + ";";

      console.log(sqlStr);

      conn.query(sqlStr,function(err,results){
        if(err){
          console.log(err);
        } else {
          res.send(results);
        }
      });

    });

    app.post('/exec_qry',function(req,res){
      // this is a general call that will execute an query with/without where clauses with parameters in the form:
      /*
          var params = JSON.stringify({
              'table' : 'museum'          // if no clauses, do not include clauses
          });

          var params = JSON.stringify({
              'table' : 'exhibit',
              'clauses' : {
                'musuemId' : "'f_getMuseumId(' + museum + ')'" // make sure to send strings with quotes - ''
              }
          });
      */
      var table = req.body.table;
      var clauses = req.body.clauses;

      var sqlStr = "SELECT * FROM ";

      sqlStr += table;

      if (clauses != null) {
        sqlStr += " WHERE ";
        for (x in clauses) {
          sqlStr += x + "=" + clauses[x] + ",";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
      }
      sqlStr += ";";
      
      console.log(sqlStr);

      conn.query(sqlStr,function(err,results){
        if(err){
          console.log(err);
        } else {
          res.send(results);
        }
      });

    });



// Run Server
app.listen(3100, function(){
  console.log("Listening on 3100");
});



