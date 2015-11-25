var http = require('http');
var url = require('url');
var fs= require('fs');
var querystring = require('querystring');
var db = require("./db");

function start(route) {
    function onRequest(request,response) {
        if(request.method == "GET"){
            var pathname = url.parse(request.url).pathname;
            //console.log("Request for" + pathname + "received");
            /*
            路由 区别 文件与 API
            */
            var filename = route(request.url);
            if (filename.match("\\.")==null) {
                shootAPI(request,response,filename);
            }else {
                shootFile(request,response,filename);
            }
        }else{
            var postdata = "";
            request.addListener("data",function(postchunk){
                postdata += postchunk;
            })
    
            //POST结束输出结果
            request.addListener("end",function(){
                var params = query.parse(postdata);
                response.write(JSON.stringify(params));
                response.end();
            })
        }
    }
    http.createServer(onRequest).listen(12240);
    console.log("Server has started with port 12240...");
}

function shootFile(request,response,filename) {
    var params = [];
    params = url.parse(request.url,true).query;
    var len = Object.keys(params).length;
    if (len!=0) {
        // params['name'] params['author']
        if(params['name']!=""&&params['author']!="") {
            console.log("param    "+params['name']+params['author']);
            var pa = [params['name'],params['author']];
            db.Do('insert',pa);
        }
    }
    // 文件是否存在
    fs.access(filename, fs.R_OK | fs.W_OK, function (err) {
        if (err) {
            console.log('no access!');
            console.log('can read/write');
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write("404");
        }else {
            fs.readFile(filename, function (err, data) {
                if (err) {
                    console.log(err);
                    // HTTP 状态码: 404 : NOT FOUND
                    // Content Type: text/plain
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.write("404");
                }else{
                    // HTTP 状态码: 200 : OK
                    // Content Type: text/plain
                    //获取后缀名
                    var i = filename.lastIndexOf('.');
                    var suffix = filename.substr( i+1, filename.length);
                    response.writeHead(200,{                //响应客户端，将文件内容发回去
                        'Content-type':"text/"+suffix});    //通过后缀名指定mime类型
                    // 响应文件内容
                    response.write(data.toString());		
                }
                //  发送响应数据
                response.end();
            });
        }
    });
}
function shootAPI(request,response,filename) {
    var data = db.Do(filename,[]);
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(data));
}

exports.start = start;