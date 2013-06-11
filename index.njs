var util = require('util');

exports.serve = function(req, res) { var pre = {};
    initGET(req, pre, function() {
        page(req, res, pre, function() {
        }); });
};

function page(req, res, pre, cb) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (pre._GET['x']) {
        res.end('The value of x is '+pre._GET['x']+'.'); }else{
        res.end('There is no value for x.');
    }
    cb();
}

function initGET(req, pre, cb) {
    pre._GET = {};
    var urlparts = req.url.split('?'); if (urlparts.length >= 2) {
        var query = urlparts[urlparts.length-1].split('&'); for (var p=0; p < query.length; ++p) {
            var pair = query[p].split('=');
            pre._GET[pair[0]] = pair[1];
        }
    }
    cb();
}

function initPOST(req, pre, cb) {
    pre._POST = {};
    var body = '';
    req.on('data', function(chunk) {
        body += chunk;
        if (body.length > 1e6) {
            req.connection.destroy();
        }
    });
    req.on('end', function() {
        var pairs = body.split('&');
        for (var p=0; p < pairs.length; ++p) {
            var pair = pairs[p].split('=');
            pre._POST[pair[0]] = pair[1];
        }
        cb();
    });
}