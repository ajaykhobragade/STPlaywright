const playwright = require('playwright');

(async () => {

    //#region launch browser, context and page
    for (const browsertype of ['chromium', 'webkit']) {
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
    console.log(page.url());
    
    var waitPeriod = 1;
    await page.waitForResponse(response => {
        console.log("Starting to wait... " + waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    })
    //#endregion
    
    //#region check Ads location existance

    const APSR = await page.$$eval('#div-gpt-ad-premium-Test67-skinright', divs => $("div#div-gpt-ad-premium-Test67-skinright").children('div').length);
    console.log(APSR);
    if (APSR!==1) console.log('APSR AdWrapper empty');
    else console.log('APSR AdWrapper found');

    const APSL = await page.$$eval('#div-gpt-ad-premium-Test67-skinleft', divs => $("div#div-gpt-ad-premium-Test67-skinleft").children('div').length);
    console.log(APSL);
    if (APSL!==1) console.log('APSL AdWrapper empty');
    else console.log('APSL AdWrapper found');

    const ZNB1L = await page.$$eval('#zone-none-block-1-leaderboard', divs => $("div#zone-none-block-1-leaderboard").children('div').length);
    console.log(ZNB1L);
    if (ZNB1L!==1) console.log('ZNB1L AdWrapper empty');
    else console.log('ZNB1L AdWrapper found');

    const Z2B2V = await page.$$eval('#zone-2-block-2-vertical', divs => $("div#zone-2-block-2-vertical").children('div').length);
    console.log(Z2B2V);
    if (Z2B2V!==1) console.log('Z2B2V AdWrapper empty');
    else console.log('Z2B2V AdWrapper found');

    const Z2B3V = await page.$$eval('#zone-2-block-3-vertical', divs => $("div#zone-2-block-3-vertical").children('div').length);
    console.log(Z2B3V);
    if (Z2B3V!==1) console.log('Z2B3V AdWrapper empty');
    else console.log('Z2B3V AdWrapper found');

    const Z1CB1N = await page.$$eval('#zone-1C-block-1-native', divs => $("div#zone-1C-block-1-native").children('div').length);
    console.log(Z1CB1N);
    if (Z1CB1N!==1) console.log('Z1CB1N AdWrapper empty');
    else console.log('Z1CB1N AdWrapper found');

    const Z2B4V = await page.$$eval('#zone-2-block-4-vertical', divs => $("div#zone-2-block-4-vertical").children('div').length);
    console.log(Z2B4V);
    if (Z2B4V!==1) console.log('Z2B4V AdWrapper empty');
    else console.log('Z2B4V AdWrapper found');

    const ZNB2L = await page.$$eval('#zone-none-block-2-leaderboard', divs => $("div#zone-none-block-2-leaderboard").children('div').length);
    console.log(ZNB2L);
    if (ZNB2L!==1) console.log('ZNB2L AdWrapper empty');
    else console.log('ZNB2L AdWrapper found');

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

    const Z3B5S = await page.$$eval('#zone-3-block-5-square', divs => $("div#zone-3-block-5-square").children('div').length);
    console.log(Z3B5S);
    if (Z3B5S!==1) console.log('Z3B5S AdWrapper empty');
    else console.log('Z3B5S AdWrapper found');

    const Z3B9S = await page.$$eval('#zone-3-block-9-square', divs => $("div#zone-3-block-9-square").children('div').length);
    console.log(Z3B9S);
    if (Z3B9S!==1) console.log('Z3B9S AdWrapper empty');
    else console.log('Z3B9S AdWrapper found');

    const Z3B13S = await page.$$eval('#zone-3-block-13-square', divs => $("div#zone-3-block-13-square").children('div').length);
    console.log(Z3B13S);
    if (Z3B13S!==1) console.log('Z3B13S AdWrapper empty');
    else console.log('Z3B13S AdWrapper found');

    const Z3B17S = await page.$$eval('#zone-3-block-17-square', divs => $("div#zone-3-block-17-square").children('div').length);
    console.log(Z3B17S);
    if (Z3B17S!==1) console.log('Z3B17S AdWrapper empty');
    else console.log('Z3B17S AdWrapper found');

    const ZNB3L = await page.$$eval('#zone-none-block-3-leaderboard', divs => $("div#zone-none-block-3-leaderboard").children('div').length);
    console.log(ZNB3L);
    if (ZNB3L!==1) console.log('ZNB3L AdWrapper empty');
    else console.log('ZNB3L AdWrapper found');

    const APH = await page.$$eval('#div-gpt-ad-premium-Test67-hover', divs => $("div#div-gpt-ad-premium-Test67-hover").children('div').length);
    console.log(APH);
    if (APH!==1) console.log('APH AdWrapper empty');
    else console.log('APH AdWrapper found');

    await scrollFullPage(page);
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