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
    await page.goto("https://www.startribune.com/?sz=/7932/website/web_test/test67");

    var waitPeriod = 1;
    await page.waitForResponse(response => {
        console.log("Starting to wait... " + waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    })
    //#endregion

    //#region check Ads location existance
    /* if (await page.$('#zone-2-block-3-vertical') !== null) console.log('DFP Indirect block-3-vertical Ad is found');
    else console.log('DFP Indirect block-3-vertical Ad is not found');

    if (await page.$('#zone-1C-block-1-native') !== null) console.log('DFP Indirect block-1-native Ad is found');
    else console.log('DFP Indirect block-1-native Ad is not found');

    if (await page.$('#zone-2-block-4-vertical') !== null) console.log('DFP Indirect block-4-vertical Ad is found');
    else console.log('DFP Indirect block-4-vertical Ad is not found');

    if (await page.$('#zone-none-block-2-leaderboard') !== null) console.log('DFP Indirect block-2-leaderboard Ad is found');
    else console.log('DFP Indirect block-2-leaderboard Ad is not found');

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

    if (await page.$('#zone-3-block-5-square') !== null) console.log('DFP Indirect block-5-square Ad is found');
    else console.log('DFP Indirect block-5-square Ad is not found');

    if (await page.$('#zone-3-block-9-square') !== null) console.log('DFP Indirect block-9-square Ad is found');
    else console.log('DFP Indirect block-9-square Ad is not found');

    if (await page.$('#zone-3-block-13-square') !== null) console.log('DFP Indirect block-13-square Ad is found');
    else console.log('DFP Indirect block-13-square Ad is not found');

    if (await page.$('#zone-3-block-17-square') !== null) console.log('DFP Indirect block-17-square Ad is found');
    else console.log('DFP Indirect block-17-square Ad is not found');

    if (await page.$('#zone-none-block-3-leaderboard') !== null) console.log('DFP Indirect block-3-leaderboard Ad is found');
    else console.log('DFP Indirect block-3-leaderboard Ad is not found');

    await scrollFullPage(page); */
    //#endregion
    
    //#region check Ads location existance NEW
    if (await page.$('div.l-home-top-ad') !== null) console.log('DFP Direct Ad is found');
    else console.log('DFP Direct Ad is not found');

    if (await page.$('#zone-2-block-2-vertical', e => e.outerHTML) !== null) console.log('DFP Indirect block-2-vertical Ad is found');
    else console.log('DFP Indirect block-2-vertical Ad is not found');

    //const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => el['data-google-query-id']);
    const contentWrapper = await page.$eval('#zone-2-block-2-vertical', e => e.outerHTML);
    console.log(contentWrapper);
    if (contentWrapper==null) console.log('Empty');
    else console.log('not Empty');

    if (await page.$('#zone-2-block-2-vertical', e => e('data-google-query-id')) !== null) console.log('DFP Indirect block-2-vertical query Ad is found');
    else console.log('DFP Indirect block-2-vertical query Ad is not found');

    if (await page.$('#zone-none-block-1-leaderboard'), ('data-google-query-id') !== null) console.log('DFP Direct block-1-leaderboard Ad is found');
    else console.log('DFP Direct block-1-leaderboard Ad is not found');

    //const contentWrapper = await page.$('#zone-2-block-2-vertical');
    //console.log(contentWrapper.getAttr( "style" ) );
    //const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => el.style);
    //const preloadHref = await page.$eval('#zone-2-block-2-vertical', el => el.href);
    //const html = await page.$eval('#zone-2-block-2-vertical', (e, suffix) => e.outerHTML + suffix, 'hello');
    //const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => e['data-google-query-id']);
    //const contentWrapper = await page.$$eval('#zone-2-block-2-vertical', divs => divs.length);
    //const styleAttr = await contentWrapper.getAttribute('style');
    //const tweetHandle = await page.$('#zone-2-block-2-vertical');
    //await tweetHandle.evaluate(node => node.innerText).toBe('10');
    //if (contentWrapper.getAttribute("class") == null || contentWrapper.getAttribute("class") == "") console.log('Empty');
    //else console.log('Not Empty');

    //#endregion

    //#region capture fullpage screenshot
    await page.screenshot({ 
        path: 'startribune_homepage.png',
        fullPage : true });
    //#endregion

    //#region close browser
    await browser.close();
    //#endregion
}
})();