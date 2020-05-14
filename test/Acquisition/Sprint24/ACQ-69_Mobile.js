const playwright = require('playwright');
const { chromium, webkit, devices } = require('playwright');
const iPhone11 = devices['iPhone 11 Pro'];
//const GalaxyS5 = devices['Galaxy S5'];

(async () => {

    //#region launch browser
    for (const browsertype of ['webkit', 'chromium']) {
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
    
    //#region check disclaimer text
    const contentWrapper = await page.$eval('//*[@id="meterContent"]/div[2]/div/div[2]', e => e.innerHTML);
    console.log(contentWrapper);
    if (contentWrapper==null) console.log('Disclaimer Text Empty....');
    else console.log('Disclaimer Text exist....');
    //#endregion

    //#region click on login button
    await page.$eval('//*[@id="mobileButton"]/a[2]', (el) => el.click()); //button click works for webkit & firefox, but not chromium
    //#endregion

    //#region fill up login information
    await page.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
    await page.type('//*[@id="password"]', 'mystrib123');
    await page.keyboard.press('Enter', {delay:2000});
    //#endregion

    //#region capture screenshot
    await page.screenshot({ 
        path: 'ACQ-69_Mobile.png',
        fullPage : true });
    //#endregion

    //#region close browser
    //await browser.close();
    //#endregion

}  
})();