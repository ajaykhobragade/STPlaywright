const playwright = require('playwright');

(async () => {

    //#region launch browser
    for (const browsertype of ['firefox', 'webkit']) {
    const browser = await playwright[browsertype].launch({
        headless: false,
    
    });
    //#endregion

    //#region context, page, get URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://stage-www.startribune.com/singing-the-concert-cancellation-blues-get-your-live-music-fix-with-these-25-films/569088652/");

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })
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
        path: 'ACQ-69.png',
        fullPage : true });
    //#endregion

    //#region close browser
    //await browser.close();
    //#endregion

}  
})();