import puppeteer from 'puppeteer';

interface Catalog {
	title: string;
	link: string;
	startTime: string;
	endTime: string;
}

export async function scraper(): Promise<Catalog[]> {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.tus.si/#s2');
	const catalogs = await page.$$eval('div.card.card-catalogue', elements => {
		return elements.map(element => {
			const title = element.querySelector('h3')?.textContent?.trim() || '';
			const link =
				element.querySelector('.link-icon.solid.pdf')?.getAttribute('href')?.trim() || '';
			const timeElements = element.querySelectorAll('p time');
			const startTime = timeElements[0].getAttribute('datetime')?.trim() || '';
			const endTime = timeElements[1].getAttribute('datetime')?.trim() || '';
			return { title, link, startTime, endTime };
		});
	});
	await browser.close();
	return catalogs;
}
