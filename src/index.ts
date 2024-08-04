import fs from 'fs';
import { scraper } from './scraper';

async function main() {
	try {
		const catalogs = await scraper();
		fs.writeFile('data/catalogs.json', JSON.stringify(catalogs), err => {
			if (err) throw err;
			console.log('Catalogs saved successfully!');
		});
	} catch (error) {
		console.log(error);
	}
}

main();
