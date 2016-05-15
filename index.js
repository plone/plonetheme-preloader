var fs = require('fs')
var loaderUtils = require("loader-utils");

module.exports = function(content) {
    this.cacheable && this.cacheable();
    return this.data.override || content;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    if(!query.themepath) {
        return
    }
    var path = this.resourcePath
    var src_root = path.lastIndexOf('/src/');
    var newpath = path.substring(0, src_root + 1) + query.themepath + path.substring(src_root + 4);
    //console.log("TRYING " + newpath);
    fs.readFile(newpath, 'utf8', function (err, newcontent) {
        if(!err) {
            console.log("OVERRIDE " + path + " WITH " + newpath);
            data.override = newcontent;
        }
    });
}