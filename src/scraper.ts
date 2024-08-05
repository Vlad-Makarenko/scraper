import puppeteer from 'puppeteer';
import { downloader } from './downloader';

interface Catalog {
	title: string;
	link: string;
	startDate: string;
	endDate: string;
}

export async function scraper(): Promise<Catalog[]> {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://www.tus.si/#s2');
	const catalogs = await page.$$eval('div.card.card-catalogue', elements => {
		return elements.map(element => {
			const title = element.querySelector('h3')?.textContent?.trim() || '';
			const link =
				element.querySelector('.link-icon.solid.pdf')?.getAttribute('href')?.trim() || '';
			const timeElements = element.querySelectorAll('p time');
			const startDate = timeElements[0].getAttribute('datetime')?.trim() || '';
			const endDate = timeElements[1].getAttribute('datetime')?.trim() || '';
			return { title, link, startDate, endDate };
		});
	});

	for (const catalog of catalogs) {
		downloader(catalog.link, `pdf/${catalog.title}.pdf`);
	}

	await browser.close();
	return catalogs;
}
