var count = 0;
var arr = [
	'Hold on preparing last minute touches..',
	"This shouldn't be taking this much time",
	'Wait! Are you still here?',
	'Escalating this to network devices',
	'Devices pinging each others',
	'Devices responded with Network must be slow!',
	'Trying again!',
];

var preloader = document.getElementById('pre-loader');
preloader.innerHTML =
	'<div class="content">Loading</div><div id="message">' + arr[0] + '</div>';

const messg = document.getElementById('message');

// * variable interval
var timeoutId;
var counter = 3000;
var messageDisplay = function () {
	count++;
	messg.innerHTML = arr[count];

	if (count === 3 || count === 4) {
		counter = 2000;
	} else if (counter === 6) {
		counter = 1500;
	} else {
		counter = 3000;
	}

	if (count === 6) {
		count = -1;
	}

	console.log('I am still working');
	// counter *= 10;
	timeoutId = setTimeout(messageDisplay, counter);
};
timeoutId = setTimeout(messageDisplay, counter);

// ! Below is for constant interval
// setInterval(function () {
// 	count++;
// 	if (count === 7) {
// 		count = 0;
// 	}

// 	messg.innerHTML = arr[count];
// 	console.log('I am still working');
// }, 3000);
