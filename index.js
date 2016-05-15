var fs = require('fs')
var loaderUtils = require("loader-utils");
var request = require('request');

module.exports = function(content) {
    this.cacheable && this.cacheable();
    return this.data.override || content;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    var path = this.resourcePath
    var src_root = path.substring(0, path.lastIndexOf('/src/') + 1)
    var resource_path = path.substring(path.lastIndexOf('/src/') + 4);

    if(query.themepath) {
        var newpath = src_root + query.themepath + resource_path;
        // console.log("TRYING " + newpath);
        fs.readFile(newpath, 'utf8', function (err, newcontent) {
            if(!err) {
                console.log("OVERRIDE " + path + " WITH " + newpath);
                data.override = newcontent;
            }
        });
    }

    if(query.backend) {
        request(
            query.backend + '/theme?resource=' + resource_path,
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    try {
                        var resource_url = JSON.parse(body).href;
                    } catch(e) {
                        return
                    }
                    // console.log("TRYING " + resource_url);
                    request(resource_url, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            data.override = body;
                        }
                    });
                }
            }
        );
    }
}