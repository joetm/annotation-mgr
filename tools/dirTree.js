// based on: http://stackoverflow.com/a/11194896/426266

const fs = require('fs'),
    path = require('path');

const md5File = require('md5-file');

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename)
        };

    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(path.join(filename, child));
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";

        info.hash = md5File.sync(filename);
    }

    return info;
}

if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    // console.log(util.inspect(dirTree(process.argv[2]), false, null));

    // var obj = util.inspect(dirTree(process.argv[2]), false, null);
    var obj = dirTree(process.argv[2]);

    console.log(JSON.stringify(obj, null, 4));
}