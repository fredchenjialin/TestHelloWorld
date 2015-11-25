var url = require('url');


function route(pathname) {
    var filename = url.parse(pathname).pathname;
    if(filename === "/" 
        || filename === "/index"
        || filename === "/admin")filename = "/admin.html";
        
    if(filename.indexOf('/api/')==0) {
        return filename.substr(5);
    }
    return filename.substr(1);
}
exports.route = route;