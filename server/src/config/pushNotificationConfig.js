const webpush = require('web-push');
const fs = require('fs');
const path = require('path');

function vapidConfig() {
	try {
		if (!!!process.env.VAPID_PUBLIC || !!!process.env.VAPID_PRIVATE) {
			const vapidKeys = webpush.generateVAPIDKeys();
			const textPublic = 'VAPID_PUBLIC=' + vapidKeys.publicKey + '\n';
			const textPrivate = 'VAPID_PRIVATE=' + vapidKeys.privateKey + '\n';
			const text = textPublic + textPrivate;

			const myFile = path.join(__dirname + '../../../.env');

			fs.appendFile(myFile, text, (err) => {
				if (err) {
					console.log('error appending the file' + err);
					console.log('');
					return;
				}
				console.log('New VAPID keys Generated');
				webpush.setVapidDetails(
					'mailto:abhinavsaurav1@gmail.com',
					process.env.VAPID_PUBLIC,
					process.env.VAPID_PRIVATE
				);
			});
		} else {
			webpush.setVapidDetails(
				'mailto:abhinavsaurav1@gmail.com',
				process.env.VAPID_PUBLIC,
				process.env.VAPID_PRIVATE
			);
		}
	} catch (err) {
		console.log('PN error:' + err);
	}
}

vapidConfig();
