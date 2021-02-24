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
	return new Promise(function resolver(resolve, reject) {
		fakeAjax(file, resolve);
	});
}

// request an array of files at once in "parallel"
// ???

async function init() {
	const p1 = getFile("file1");
	const p2 = getFile("file2");
	const p3 = getFile("file3");

	output(await p1);
	output(await p2);
	output(await p3);
	output("done");
}

init();