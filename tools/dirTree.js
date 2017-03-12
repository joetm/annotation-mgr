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

        // stats:
        //   dev: 64512,
        //   mode: 33188,
        //   nlink: 1,
        //   uid: 1000,
        //   gid: 1000,
        //   rdev: 0,
        //   blksize: 4096,
        //   ino: 11280330,
        //   size: 855989,
        //   blocks: 1672,
        //   atime: 2017-03-12T12:37:07.244Z,
        //   mtime: 2017-03-08T16:41:12.500Z,
        //   ctime: 2017-03-08T16:41:31.069Z,
        //   birthtime: 2017-03-08T16:41:31.069Z

    if (stats.mtime) {
        info.mtime = stats.mtime;
    }
    if (stats.atime) {
        info.atime = stats.atime;
    }

    if (stats.size) {
        info.size = stats.size;
    }

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