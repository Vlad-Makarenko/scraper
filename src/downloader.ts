import fs from 'fs';
import https from 'https';
import path from 'path';

export function downloader(url: string, dest: string) {
	const dir = path.dirname(dest);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	const file = fs.createWriteStream(dest);
	https
		.get(url, response => {
			response.pipe(file);
			file.on('finish', () => {
				file.close();
				console.log('Download completed: ', dest);
			});
		})
		.on('error', (err: Error) => {
			fs.unlink(dest, err => {
				if (err) throw err;
			});
			console.error('Error downloading the PDF:', err.message);
		});
}

export function saveData(dest: string, data: string) {
	const dir = path.dirname(dest);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	fs.writeFile(dest, data, err => {
		if (err) throw err;
		console.log('Data saved successfully!');
	});
}
