var http = require('http');
var jsdom = require("jsdom");

var truncations = function (data, truncate) {
    return data.replace(truncate, '').trim();
}

var fetch = function (options, callback) {
    http.get(options,function (res) {
        var data = '';
        res.on('data',function (chunk) {
            data += chunk;
        }).on('end', function () {
                console.log('Hitting: ' + options['host']);
                if (data.indexOf('<html>') != -1) {
                    jsdom.env(
                        data,
                        ["http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"],
                        function (errors, window) {
                            data = truncations(window.$("body").text(), options['truncate']);
                            callback(data);
                        }
                    );
                }
                else{
                    data = truncations(data, options['truncate']);
                    callback(data);
                }

            });
    }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
}

exports.fetch = fetch;