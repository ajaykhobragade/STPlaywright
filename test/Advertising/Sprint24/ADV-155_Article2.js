const playwright = require('playwright');

(async () => {

  //#region launch browser, context and page
  //test pages
  /* const urls = ['https://www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?sz=/7932/website/web_test/test67/&featureOff=Bounce-X', 
  'https://stage-www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?sz=/7932/website/web_test/test67/&featureOff=Bounce-X'] */

  //real life pages
  const urls = ['https://www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?featureOff=Bounce-X', 
  'https://stage-www.startribune.com/trump-lashes-out-at-fauci-amid-criticism-of-slow-virus-response/569585832/?featureOff=Bounce-X']
  
  for (let i = 0; i < urls.length; i++) {

      const url = urls[i];

      for (const browsertype of ['chromium', 'webkit']) {
        const browser = await playwright[browsertype].launch({
            headless: false,
            devtools: false
        });
      const context = await browser.newContext();
      const page = await browser.newPage();
      page.on('load', () => console.log('Page loaded!'));
  //#endregion

  //#region navigate to the homepage
      await page.goto(`${url}`, {
        waitUntil: 'load',
        timeout: 0
      });
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

      const Z2B1V = await page.$$eval('#zone-2-block-1-vertical', divs => $("div#zone-2-block-1-vertical").children('div').length);
      console.log(Z2B1V);
      if (Z2B1V!==1) console.log('Z2B1V AdWrapper empty');
      else console.log('Z2B1V AdWrapper found');

      const Z2B3V = await page.$$eval('#zone-2-block-3-vertical', divs => $("div#zone-2-block-3-vertical").children('div').length);
      console.log(Z2B3V);
      if (Z2B3V!==1) console.log('Z2B3V AdWrapper empty');
      else console.log('Z2B3V AdWrapper found');

      const Z2B4F = await page.$$eval('#zone-2-block-4-fill', divs => $("div#zone-2-block-4-fill").children('div').length);
      console.log(Z2B4F);
      if (Z2B4F!==1) console.log('Z2B4F AdWrapper empty');
      else console.log('Z2B4F AdWrapper found');

      const Z2B5F = await page.$$eval('#zone-2-block-5-fill', divs => $("div#zone-2-block-5-fill").children('div').length);
      console.log(Z2B5F);
      if (Z2B5F!==1) console.log('Z2B5F AdWrapper empty');
      else console.log('Z2B5F AdWrapper found');

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
      
      const ZNB2L = await page.$$eval('#zone-none-block-2-leaderboard', divs => $("div#zone-none-block-2-leaderboard").children('div').length);
      console.log(ZNB2L);
      if (ZNB2L!==1) console.log('ZNB2L AdWrapper empty');
      else console.log('ZNB2L AdWrapper found');

      const Z3B5S = await page.$$eval('#zone-3-block-5-square', divs => $("div#zone-3-block-5-square").children('div').length);
      console.log(Z3B5S);
      if (Z3B5S!==1) console.log('Z3B5S AdWrapper empty');
      else console.log('Z3B5S AdWrapper found');

      const Z3B10S = await page.$$eval('#zone-3-block-10-square', divs => $("div#zone-3-block-10-square").children('div').length);
      console.log(Z3B10S);
      if (Z3B10S!==1) console.log('Z3B10S AdWrapper empty');
      else console.log('Z3B10S AdWrapper found');

      const Z3B15S = await page.$$eval('#zone-3-block-15-square', divs => $("div#zone-3-block-15-square").children('div').length);
      console.log(Z3B15S);
      if (Z3B15S!==1) console.log('Z3B15S AdWrapper empty');
      else console.log('Z3B15S AdWrapper found');

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
          path: 'ST_Article2-PD_ST.png',
          fullPage : true });
  //#endregion

  //#region close browser
      await browser.close();
  //#endregion
      
      }
  }
})();