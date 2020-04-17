const playwright = require('playwright');

(async () => {

    //Code execution happens within here
    const browser = await playwright["chromium"].launch({
        headless: false,
        devtools: false
    });

    //context
    const context = await browser.newContext();

    //navigate to the newpage
    const page = await context.newPage();

    page.on('load', () => console.log('Page loaded!'));

    //navigate to the homepage
    await page.goto("https://www.startribune.com/?sz=/7932/website/web_test/test67");

    var waitPeriod = 1;
    await page.waitForResponse(response => {
        console.log("Starting to wait... " + waitPeriod);
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    })

    //check Ads location existance
    if (await page.$('div.l-home-top-ad') !== null) console.log('DFP Direct Ad is found...confirming Ad is filling up');
    else console.log('DFP Direct Ad is not found');

    if (await page.$('#zone-2-block-2-vertical') !== null) console.log('DFP Indirect block-2-vertical Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-2-block-3-vertical') !== null) console.log('DFP Indirect block-3-vertical Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-1C-block-1-native') !== null) console.log('DFP Indirect block-1-native Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-2-block-4-vertical') !== null) console.log('DFP Indirect block-4-vertical Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-none-block-2-leaderboard') !== null) console.log('DFP Indirect block-2-leaderboard Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-3-block-5-square') !== null) console.log('DFP Indirect block-5-square Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-3-block-9-square') !== null) console.log('DFP Indirect block-9-square Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-3-block-13-square') !== null) console.log('DFP Indirect block-13-square Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-3-block-17-square') !== null) console.log('DFP Indirect block-17-square Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');

    if (await page.$('#zone-none-block-3-leaderboard') !== null) console.log('DFP Indirect block-3-leaderboard Ad is found...confirming Ad is filling up');
    else console.log('DFP Indirect Ad is not found');
    //check Ads location existance

    //fullpage screenshot
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

    await page.screenshot({ 
        path: 'startribune_homepage.png',
        fullPage : true });
    
    //close browser
    await browser.close();
    
})();