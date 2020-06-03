const playwright = require('playwright');

(async () => {

  //#region launch browsers, contexts and page
    for (const browsertype of ['chromium', 'webkit']) {
      const browser = await playwright[browsertype].launch({
          headless: true,
          devtools: false
      });
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
  //#endregion

  //#region navigate to the pages
    await page1.goto('https://www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?featureOff=Bounce-X', {
        waitUntil: 'load',
        timeout: 0
      });
    console.log('Prod URL is loaded!');
    
    var waitPeriod = 10;
    await page1.waitForResponse(response => {
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    });

    await page2.goto('https://stage-www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?featureOff=Bounce-X', {
        waitUntil: 'load',
        timeout: 0
      });
    console.log('Stage URL is loaded!');
    
    var waitPeriod = 10;
    await page2.waitForResponse(response => {
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    });
  //#endregion

  //#region compare ad div counts
    const divsCounts1 = await page1.$$eval('.dfp-ad-container', (divs) => divs.length);
    console.log('The total number of Ad div counts with matching class on prod is ' + divsCounts1);
    const divsCounts2 = await page2.$$eval('.dfp-ad-container', (divs) => divs.length);
    console.log('The total number of Ad div counts with matching class on stage is ' + divsCounts2);

    if (divsCounts1==divsCounts2) console.log ('divCounts on prod and stage is matched');
    else console.log('divCounts on prod and stage is NOT matched');
  //#endregion

  //#region capture fullpage screenshot
    await page1.screenshot({ 
      path: `ComparePage-${browsertype}.png`,
      fullPage : true });
    console.log('Screenshot captured on ' + browsertype + ' browser!');

    await page2.screenshot({ 
      path: `ComparePage-${browsertype}.png`,
      fullPage : true });
    console.log('Screenshot captured on ' + browsertype + ' browser!');
  //#endregion

  //#region close contexts, browser
    await context1.close();
    await context2.close();
    browser.close();
  //#endregion
    }
  })();