const playwright = require('playwright');

(async () => {

    //Code execution happens within here
    const browser = await playwright["chromium"].launch({
        headless: false,
        devtools: true
    });

    //context
    const context = await browser.newContext();

    //navigate to the page
    const page = await context.newPage();

    page.on('load', () => console.log('Page loading!'));

    //navigate to the page
    await page.goto("https://www.startribune.com/");

    var waitPeriod = 10;
    await page.waitForResponse(response => {
        console.log("Starting to wait... " + waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "image"
    })

    //check image existance
    //await page.type('[xpath=//*[@id="aw0"]/amp-img/img]')
    //await page.
    
    //sample console log
    page.on('console', msg => {
        for (let i = 0; i < msg.args().length; ++i)
          console.log(`${i}: ${msg.args()[i]}`);
      });
    page.evaluate(() => console.log('looking for Ads!'));

    //screenshot
    await page.screenshot({path: `ea-${Date.now}.png`});
    
    //close browser
    await browser.close();
    
})();