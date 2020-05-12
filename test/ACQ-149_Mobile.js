const playwright = require('playwright');
const { chromium, webkit, devices } = require('playwright');
const iPhone11 = devices['iPhone 11 Pro'];

(async () => {

    //#region launch browser
    for (const browsertype of ['chromium', 'webkit']) {
    const browser = await playwright[browsertype].launch({
        headless: false,
    
    });
    //#endregion

    //#region context, page, get URL
    const context = await browser.newContext({
        ...iPhone11,
        geolocation: { longitude: 12.492507, latitude: 41.889938 },
        permissions: ['geolocation']
    });
    const page = await context.newPage();
    await page.goto("https://stage-www.startribune.com/singing-the-concert-cancellation-blues-get-your-live-music-fix-with-these-25-films/569088652/");

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })
    //#endregion
    
    //#region click on subscription button
    await page.$eval('//*[@id="mobileButton"]/a[1]', (el) => el.click()); //button click works for webkit, not chromium

    //#endregion

    //#region fill up subscriber information
    await page.type('//*[@id="subscriber_first_name"]', 'Ajay');
    await page.type('//*[@id="subscriber_last_name"]', 'Khobragade');
    await page.type('//*[@id="subscriber_address_1"]', '19388 Harmony Ave');
    await page.type('//*[@id="subscriber_address_2"]', 'NA');
    await page.type('//*[@id="subscriber_city"]', 'Rogers');
    await page.type('//*[@id="subscriber_zip"]', '55374');
    await page.type('//*[@id="subscriber_email_address"]', 'ajay.khobragade@startribune.com');
    await page.type('//*[@id="subscriber_phone_number"]', '215-622-4903');
    await page.keyboard.press('Enter', {delay:2000});
    //#endregion

    //#region capture screenshot
    await page.screenshot({ 
        path: 'ACQ-149_Mobile.png',
        fullPage : true });
    //#endregion

    //#region close browser
    //await browser.close();
    //#endregion

}  
})();