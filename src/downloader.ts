import fs from 'fs';
import https from 'https';

export function downloader(url: string, dest: string) {
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
