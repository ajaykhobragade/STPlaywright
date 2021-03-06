const playwright = require('playwright');
const { LazyLoad_SectionFront3_URL_S } = require('./urls');

(async () => {

  //#region launch browser, context and page
  const urls = [
    //{ name: 'prod', link: SectionFront_URL_P}, 
    {name: 'stage', link: LazyLoad_SectionFront3_URL_S}];

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

  //#region login 
      await page.click('a.nav-utility-btn.btn-login.login-js');
      await page.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
      await page.type('//*[@id="password"]', 'mystrib123');
      await page.click('//*[@id="login-form"]/fieldset[3]/div/input[3]');
      await page.waitForNavigation({waitUntil: 'load'});
      
      await page.waitForResponse(response => {
              waitPeriod++;
              return response.request().resourceType() === "xhr"
          })
  //#endregion

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

  //#region check Ads location existance

      await page.waitForResponse(response => {
        waitPeriod++;
        return response.request().resourceType() === "xhr"
      })
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

      const Z2B2V = await page.$$eval('#zone-2-block-2-vertical', divs => $("div#zone-2-block-2-vertical").children('div').length);
      if (Z2B2V!==1) console.log('"zone-2-block-2-vertical" div is empty, since ' + Z2B2V + ' child AD div is found!');
      else console.log('"zone-2-block-2-vertical" div is found!');

      const Z2B3V = await page.$$eval('#zone-2-block-3-vertical', divs => $("div#zone-2-block-3-vertical").children('div').length);
      if (Z2B3V!==1) console.log('"zone-2-block-3-vertical" div is empty, since ' + Z2B3V + ' child AD div is found!');
      else console.log('"zone-2-block-3-vertical" div is found!');

      const Z2B4F = await page.$$eval('#zone-2-block-4-fill', divs => $("div#zone-2-block-4-fill").children('div').length);
      if (Z2B4F!==1) console.log('"zone-2-block-4-fill" div is empty, since ' + Z2B4F + ' child AD div is found!');
      else console.log('"zone-2-block-4-fill" div is found!');

      const Z2B5F = await page.$$eval('#zone-2-block-5-fill', divs => $("div#zone-2-block-5-fill").children('div').length);
      if (Z2B5F!==1) console.log('"zone-2-block-5-fill" div is empty, since ' + Z2B5F + ' child AD div is found!');
      else console.log('"zone-2-block-5-fill" div is found!');

      const Z1B9I = await page.$$eval('#zone-1-block-9-inline', divs => $("div#zone-1-block-9-inline").children('div').length);
      if (Z1B9I!==1) console.log('"zone-1-block-9-inline" div is empty, since ' + Z1B9I + ' child AD div is found!');
      else console.log('"zone-1-block-9-inline" div is found!');

      const Z2B6F = await page.$$eval('#zone-2-block-6-fill', divs => $("div#zone-2-block-6-fill").children('div').length);
      if (Z2B6F!==1) console.log('"zone-2-block-6-fill" div is empty, since ' + Z2B6F + ' child AD div is found!');
      else console.log('"zone-2-block-6-fill" div is found!');
      
      const Z1B18I = await page.$$eval('#zone-1-block-18-inline', divs => $("div#zone-1-block-18-inline").children('div').length);
      if (Z1B18I!==1) console.log('"zone-1-block-18-inline" div is empty, since ' + Z1B18I + ' child AD div is found!');
      else console.log('"zone-1-block-18-inline" div is found!');

      const Z2B7F = await page.$$eval('#zone-2-block-7-fill', divs => $("div#zone-2-block-7-fill").children('div').length);
      if (Z2B7F!==1) console.log('"zone-2-block-7-fill" div is empty, since ' + Z2B7F + ' child AD div is found!');
      else console.log('"zone-2-block-7-fill" div is found!');

      const ZNB3L = await page.$$eval('#zone-none-block-3-leaderboard', divs => $("div#zone-none-block-3-leaderboard").children('div').length);
      if (ZNB3L!==1) console.log('"zone-none-block-3-leaderboard" div is empty, since ' + ZNB3L + ' child AD div is found!');
      else console.log('"zone-none-block-3-leaderboard" div is found!');

      /* const APH = await page.$$eval('#div-gpt-ad-premium-Test67-hover', divs => $("div#div-gpt-ad-premium-Test67-hover").children('div').length);
      if (APH!==1) console.log('"div-gpt-ad-premium-Test67-hover" div is empty, since ' + APH + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-hover" div is found!'); */

    //#endregion

  //#region capture fullpage screenshot
      await page.screenshot({ 
        path: url.name + `-ADV-234_SectionFront3-${browsertype}.png`,
        fullPage : true });
      console.log('Screenshot captured on ' + browsertype + ' browser, for ' + url.name + ' URL!');    
  //#endregion

  //#region close browser
      await browser.close();
  //#endregion

      }
  }    
})();