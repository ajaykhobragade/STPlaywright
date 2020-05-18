const playwright = require('playwright');

(async () => {

    //#region launch browser
    for (const browsertype of ['chromium', 'firefox', 'webkit']) {
    const browser = await playwright[browsertype].launch({
        headless: false,
    
    });
    //#endregion

    //#region context, page, get URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://stage-www.startribune.com/singing-the-concert-cancellation-blues-get-your-live-music-fix-with-these-25-films/569088652/?featureOff=Bounce-X", {
        waitUntil: 'load',
        timeout: 0
      });

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })
    //#endregion
    
    //#region click on subscription button
    await page.$eval('//*[@id="mobileButton"]/a[1]', (el) => el.click()); //button click works for webkit & firefox, but not chromium

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

    //#region fill up payment information
    await page.waitForSelector("#billing_address_same");
    await page.evaluate(() => {
    document.querySelector("#billing_address_same").parentElement.click();});

    const card = {
        number: '5147305085176291'
      }
    await page.waitForSelector('//*[@id="ccjs-number-formatted"]');
    await page.click('//*[@id="ccjs-number-formatted"]');
    await page.waitForSelector('//*[@id="ccjs-number-formatted"]');
    await page.click('//*[@id="ccjs-number-formatted"]');
    await page.keyboard.type(card.number, { delay: 50 });
        
    await page.type('//*[@id="ccjs-name"]', 'Ajay Khobragade');
    await page.selectOption('.ccjs-month', '01');
    await page.selectOption('.ccjs-year', '22');
    //await page.keyboard.press('Enter', {delay:2000});
    //#endregion

    //#region capture screenshot
    await page.screenshot({ 
        path: 'ACQ-149.png',
        fullPage : true });
    //#endregion

    //#region close browser
    //await browser.close();
    //#endregion

}  
})();