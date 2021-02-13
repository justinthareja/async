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
	// thunk constructor
	// active thunk so does the async work on creation
	var data;
	var callback;

	fakeAjax(file, function(result) {
		if (callback) {
			callback(result);
		} else {
			data = result;
		}
	});

	return function(cb) {
		if (data) {
			cb(data)
		} else {
			callback = cb;
		}
	}
}


// request all files at once in "parallel"
var getFile1 = getFile("file1");
var getFile2 = getFile("file2");
var getFile3 = getFile("file3");

// log the output in the correct order
getFile1(function(file1) {
	output(file1);
	getFile2(function(file2) {
		output(file2);
		getFile3(function(file3) {
			output(file3);
			output("done");
		});
	});
});
