import { scraper } from './scraper';
import { saveData } from './downloader';

async function main() {
	try {
		const catalogs = await scraper();
		saveData('data/catalogs.json', JSON.stringify(catalogs));
	} catch (error) {
		console.log(error);
	}
}

main();
