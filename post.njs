var initreq = require('./initreq.njs');

exports.serve = function(req, res) { var pre = {};
    initreq.initGET(req, pre, function() {
        initreq.initPOST(req, pre, function() { initreq.initCOOKIE(req, pre, function() {
            initreq.initREQUEST(req, pre, function() { initreq.initSESSION(req, pre, function() {
                page(req, res, pre, function() { var cookies = [];
                    for ( var c in pre._COOKIE) {
                        cookies.push(c + '=' + pre._COOKIE[c]);
                    }
                    res.setHeader('Set-Cookie', cookies);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end(res.content);
                }); });
            }); });
        }); });
};

function page(req, res, pre, cb) { res.writeHead(200, {'Content-Type': 'text/plain'}); if (pre._GET['x']) {
    res.end('The value of x is '+pre._GET['x']+'.'); }else{
    res.end('There is no value for x.');
}
    cb(); }