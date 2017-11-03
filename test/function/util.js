const puppeteer = require('puppeteer');

const headlessOpen = async(url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle'
    });

    return {
        kill: () => {
            browser.close();
        }
    };
};

module.exports = {
    headlessOpen
};
