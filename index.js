var server = require("./hello");
var router = require("./router");

server.start(router.route);