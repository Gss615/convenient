const puppeteer = require('puppeteer');
let url = 'https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F';
let respirator = {
    '3q': 'https://item.jd.com/100011521400.html',
    '振德': 'https://item.jd.com/100011521400.html',
    '袋鼠医生': 'https://item.jd.com/100006394713.html'
};
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitFor(() => !!document.querySelector('.nickname'));
    let pages = {};
    for (let item in respirator) {
        browser.newPage().then(async (page) => {
            await page.goto(respirator[item]);
            // TODO 刷新机制
            await page.waitFor(() => {
                return document.querySelector('#btn-reservation').classList.value.indexOf('btn-reservation') === -1
            });
            // TODO 下单函数
            page.click('#btn-reservation')
        });
    }

})();