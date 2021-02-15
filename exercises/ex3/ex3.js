function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	return new Promise(function (resolve, reject) {
		fakeAjax(file, function (data) {
			resolve(data);
		});
	});
}

// request all files at once in "parallel"
// ???
var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

p1.then(function (file1) {
	output(file1);
	return p2;
})
.then(function (file2) {
	output(file2);
	return p3;
})
.then(function (file3) {
	output(file3);
	output("Complete")
})
.catch(output)