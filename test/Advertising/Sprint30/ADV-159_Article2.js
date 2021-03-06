const playwright = require('playwright');
const { Article2_URL_P } = require('./urls');
const { Article2_URL_S } = require('./urls');

(async () => {

  //#region launch browser, context and page
  const urls = [
    //{ name: 'prod', link: Article2_URL_P}, 
    {name: 'stage', link: Article2_URL_S}];

  for (let i = 0; i < urls.length; i++) {

      const url = urls[i];

      for (const browsertype of ['chromium', 'webkit', 'firefox']) {
        const browser = await playwright[browsertype].launch({
            headless: true,
            devtools: false
        });
      const context = await browser.newContext();
      const page = await browser.newPage();
      page.on('load', () => console.log('Page loaded on ' + browsertype + ' browser!'));
  //#endregion

  //#region navigate to the homepage
      await page.goto(`${url.link}`, {
        waitUntil: 'load',
        timeout: 0
      });
      console.log(page.url() + ' is loaded!');

      var waitPeriod = 10;
      await page.waitForResponse(response => {
          waitPeriod++;
          return response.request().resourceType() === "xhr"
      })
  //#endregion

  //#region check Ads location existance

      /* const APSR = await page.$$eval('#div-gpt-ad-premium-Test67-skinright', divs => $("div#div-gpt-ad-premium-Test67-skinright").children('div').length);
      if (APSR!==1) console.log('"div-gpt-ad-premium-Test67-skinright" div is empty, since ' + APSR + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-skinright" div is found!');

      const APSL = await page.$$eval('#div-gpt-ad-premium-Test67-skinleft', divs => $("div#div-gpt-ad-premium-Test67-skinleft").children('div').length);
      if (APSL!==1) console.log('"div-gpt-ad-premium-Test67-skinleft" div is empty, since ' + APSL + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-skinleft" div is found'); */

      const ZNB1L = await page.$$eval('#zone-none-block-1-leaderboard', divs => $("div#zone-none-block-1-leaderboard").children('div').length);
      if (ZNB1L!==1) console.log('"zone-none-block-1-leaderboard" div is empty, since ' + ZNB1L + ' child AD div is found!');
      else console.log('"zone-none-block-1-leaderboard" div is found!');

      const Z2B1V = await page.$$eval('#zone-2-block-1-vertical', divs => $("div#zone-2-block-1-vertical").children('div').length);
      if (Z2B1V!==1) console.log('"zone-2-block-1-vertical" div is empty, since ' + Z2B1V + ' child AD div is found!');
      else console.log('"zone-2-block-1-vertical" div is found!');

      const Z2B3V = await page.$$eval('#zone-2-block-3-vertical', divs => $("div#zone-2-block-3-vertical").children('div').length);
      if (Z2B3V!==1) console.log('"zone-2-block-3-vertical" div is empty, since ' + Z2B3V + ' child AD div is found!');
      else console.log('"zone-2-block-3-vertical" div is found!');

      const Z2B4F = await page.$$eval('#zone-2-block-4-fill', divs => $("div#zone-2-block-4-fill").children('div').length);
      if (Z2B4F!==1) console.log('"zone-2-block-4-fill" div is empty, since ' + Z2B4F + ' child AD div is found!');
      else console.log('"zone-2-block-4-fill" div is found!');

      const Z2B5F = await page.$$eval('#zone-2-block-5-fill', divs => $("div#zone-2-block-5-fill").children('div').length);
      if (Z2B5F!==1) console.log('"zone-2-block-5-fill" div is empty, since ' + Z2B5F + ' child AD div is found!');
      else console.log('"zone-2-block-5-fill" div is found!');

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
      if (ZNB2L!==1) console.log('"zone-none-block-2-leaderboard" div is empty, since ' + ZNB2L + ' child AD div is found!');
      else console.log('"zone-none-block-2-leaderboard" div is found!');

      const Z3B5S = await page.$$eval('#zone-3-block-5-square', divs => $("div#zone-3-block-5-square").children('div').length);
      if (Z3B5S!==1) console.log('"zone-3-block-5-square" div is empty, since ' + Z3B5S + ' child AD div is found!');
      else console.log('"zone-3-block-5-square" div is found!');

      const Z3B10S = await page.$$eval('#zone-3-block-10-square', divs => $("div#zone-3-block-10-square").children('div').length);
      if (Z3B10S!==1) console.log('"zone-3-block-10-square" div is empty, since ' + Z3B10S + ' child AD div is found!');
      else console.log('"zone-3-block-10-square" div is found!');

      const Z3B15S = await page.$$eval('#zone-3-block-15-square', divs => $("div#zone-3-block-15-square").children('div').length);
      if (Z3B15S!==1) console.log('"zone-3-block-15-square" div is empty, since ' + Z3B15S + ' child AD div is found!');
      else console.log('"zone-3-block-15-square" div is found!');

      const ZNB3L = await page.$$eval('#zone-none-block-3-leaderboard', divs => $("div#zone-none-block-3-leaderboard").children('div').length);
      if (ZNB3L!==1) console.log('"zone-none-block-3-leaderboard" div is empty, since ' + ZNB3L + ' child AD div is found!');
      else console.log('"zone-none-block-3-leaderboard" div is found!');

      /* const APH = await page.$$eval('#div-gpt-ad-premium-Test67-hover', divs => $("div#div-gpt-ad-premium-Test67-hover").children('div').length);
      if (APH!==1) console.log('"div-gpt-ad-premium-Test67-hover" div is empty, since ' + APH + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-hover" div is found!'); */

      await scrollFullPage(page);
    //#endregion

  //#region capture fullpage screenshot
      await page.screenshot({ 
        path: url.name + `-ADV-159_Article2-${browsertype}.png`,
        fullPage : true });
      console.log('Screenshot captured on ' + browsertype + ' browser, for ' + url.name + ' URL!');    
  //#endregion

  //#region close browser
      await browser.close();
  //#endregion

      }
  }    
})();