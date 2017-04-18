// -*- coding: utf-8 -*-

const fs = require("fs");

const exec = require('child_process').exec;

console.log('Get annotations for papers');

var papers = require("../build/data/folders.json");
// console.log(papers.children);


function callback (error, sdtout, stderr) {
	if (!error) {
		console.log(sdtout);
	} else {
		// TODO
	}
}

for (let i=0; i < papers.children.length; i++) {
	var paper = papers.children[i];

	if (paper.type !== 'file') {
		continue;
	}

	let cmd = "./extract-annotations.py " + paper.path;
	// console.log(cmd);
	exec(cmd, callback);
}


