const playwright = require('playwright');

(async () => {

    //#region launch browser, context and page
    for (const browsertype of ['chromium']) {
        const browser = await playwright[browsertype].launch({
            headless: false,
            devtools: false
        });

    const context = await browser.newContext();

    const page = await context.newPage();

    page.on('load', () => console.log('Page loaded!'));
    //#endregion

    //#region navigate to the homepage
    await page.goto("https://www.startribune.com/coronavirus-covid-19-minnesota-tracker-map-county-data/568712601/?sz=/7932/website/web_test/test67&segment=Grazer");

    var waitPeriod = 1;
    await page.waitForResponse(response => {
        console.log("Starting to wait... " + waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    })
    //#endregion

    //#region check Ads location existance

    if (await page.$('#zone-none-block-1-leaderboard'), ('data-google-query-id') !== null) console.log('DFP Direct block-1-leaderboard Ad is found');
    else console.log('DFP Direct block-1-leaderboard Ad is not found');

    if (await page.$('#zone-none-block-1-leaderboard:empty').length) console.log('DFP Direct block-1-leaderboard Ad is found');
    else console.log('DFP Direct block-1-leaderboard Ad is not found');

/*     if (await page.$('#zone-2-block-1-vertical') !== null) console.log('DFP Indirect block-1-vertical Ad is found');
    else console.log('DFP Indirect block-1-vertical Ad is not found');

    if (await page.$('#zone-1-block-7-inline-body') !== null) console.log('DFP Indirect block-7-inline-body Ad is found');
    else console.log('DFP Indirect block-7-inline-body Ad is not found');

    if (await page.$('#zone-2-block-3-vertical') !== null) console.log('DFP Indirect block-3-vertical Ad is found');
    else console.log('DFP Indirect block-3-vertical Ad is not found');

    if (await page.$('#zone-2-block-4-fill') !== null) console.log('DFP Indirect block-4-fill Ad is found');
    else console.log('DFP Indirect block-4-fill Ad is not found');

    if (await page.$('#zone-1-block-12-inline-body') !== null) console.log('DFP Indirect block-12-inline-body Ad is found');
    else console.log('DFP Indirect block-12-inline-body Ad is not found'); */

    //#region scrollfullpage
    await scrollFullPage(page);

    async function scrollFullPage(page) {
        await page.evaluate(async () => {
          await new Promise(resolve => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              
              if (totalHeight >= scrollHeight){
                clearInterval(timer);
                resolve();
              }
            }, 100);
          });
        });
      }
    //#endregion

/*     if (await page.$('#zone-2-block-5-fill') !== null) console.log('DFP Indirect block-5-fill Ad is found');
    else console.log('DFP Indirect block-5-fill Ad is not found'); */
    //#endregion

    //#region capture fullpage screenshot
    await page.screenshot({ 
        path: 'startribune_ArticleGrazer.png',
        fullPage : true });
    //#endregion

    //#region close browser
    await browser.close();
    //#endregion
}
})();