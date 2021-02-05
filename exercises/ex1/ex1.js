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
// The old-n-busted callback way
let files = {};

function getFile(file) {
	fakeAjax(file,function(text){
		files[file] = {
			text,
			hasRendered: false
		};

		output(`Received: ${file}`);

		if (file == "file1") {
			output(text);
			files[file].hasRendered = true;

			if (files["file2"]) {
				output(files["file2"].text);
				files["file2"].hasRendered = true;

				if (files["file3"]) {
					output(files["file3"].text);
					files["file3"].hasRendered = true;
				}
			}
		} else if (file == "file2") {

			if (files["file1"] && files["file1"].hasRendered) {
				output(files["file2"].text);
				files["file2"].hasRendered = true;

				if (files["file3"]) {
					output(files["file3"].text);
					files["file3"].hasRendered = true;
				}
			} else {
				output(`Previous file not loaded... storing ${file}`);
			}
		} else { // file3
			if (files["file2"] && files["file2"].hasRendered) {
				output(files["file3"].text);
				files["file3"].hasRendered = true;
			} else {
				output(`Previous file not loaded... storing ${file}`);
			}
		}

		if (
			files["file1"] &&
			files["file1"].hasRendered &&
			files["file2"] &&
			files["file2"].hasRendered &&
			files["file3"] &&
			files["file3"].hasRendered
		) {
			output("Complete!");
		}
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
