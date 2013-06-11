var http = require('http');
var static = require('node-static');
var file = new static.Server();
var url = require('url');
var index = require('./index.njs');
var post = require('./post.njs');

var handleReq = function(req, res) {
    if (url.parse(req.url).pathname == '/index.php') {
        index.serve(req, res);
    }if (url.parse(req.url).pathname == '/post.php') {
        post.serve(req, res);
    }else{
        file.serve(req, res);
    }

};
var svr = http.createServer(handleReq);

svr.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');


