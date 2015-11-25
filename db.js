var mysql = require('mysql');

var roww;
function Do(method_str,param) {
	
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '1234567',
		port     : 3306,
		database : 'nodejstest'
	});
	
	//创建一个connection
	connection.connect(function(err){
		if(err){        
			console.log('[query] - :'+err);
			return;
		}
		console.log('[connection connect]  succeed!');
	});
	
	if(method_str=='insert') {
		var queryInsert = 'INSERT INTO test(name,auther) VALUES(?,?)';
		connection.query(queryInsert,param,function(err,result) {
			if(err){
				console.log('[INSERT ERROR] - ',err.message);
				return;
			}        
	
			console.log('--------------------------INSERT----------------------------');
		});
	} else if (method_str=='select') {
		var querySelect = 'SELECT * FROM test';
		connection.query(querySelect,function(err,rows,fields) {
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return;
			}        
			roww = rows;
			
			console.log('--------------------------SELECT----------------------------');
		});
	}
	
	connection.end(function(err){
		if(err){        
			return;
		}
		console.log('[connection end] succeed!');
	});
	return roww;
}

exports.Do=Do;