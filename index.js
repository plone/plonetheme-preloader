var fs = require('fs')

module.exports = function(content) {
    this.cacheable && this.cacheable();
    return this.data.override || content;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    this.cacheable && this.cacheable();
    var path = this.resourcePath
    console.log("LOADING " + path);
    var newpath = path.replace('/app/theme/', '/customtheme/');
    console.log("TRYING" + newpath);
    fs.readFile(newpath, 'utf8', function (err, newcontent) {
        if(err) {
            console.log(err);
            console.log("KEEP ORIGINAL " + path);
        } else {
            console.log("OVERRIDE WITH " + newpath);
            data.override = newcontent;
        }
    });
}