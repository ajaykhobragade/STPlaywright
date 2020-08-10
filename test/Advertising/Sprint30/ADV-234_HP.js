const playwright = require('playwright');
const { LazyLoad_HP_URL_S } = require('./urls');

(async () => {

  //#region launch urls, browser, context and page
  const urls = [
    //{ name: 'prod', link: HP_URL_P }, 
    { name: 'stage', link: LazyLoad_HP_URL_S }];
  
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

  //#region check Ads location existance
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
      
      await page.waitForResponse(response => {
          waitPeriod++;
          return response.request().resourceType() === "xhr"
      })
      /* const APSR = await page.$$eval('#div-gpt-ad-premium-Test67-skinright', divs => $("div#div-gpt-ad-premium-Test67-skinright").children('div').length);
      if (APSR!==1) console.log('"div-gpt-ad-premium-Test67-skinright" div is empty, since ' + APSR + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-skinright" div is found!');

      const APSL = await page.$$eval('#div-gpt-ad-premium-Test67-skinleft', divs => $("div#div-gpt-ad-premium-Test67-skinleft").children('div').length);
      if (APSL!==1) console.log('"div-gpt-ad-premium-Test67-skinleft" div is empty, since ' + APSL + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-skinleft" div is found!'); */

      const ZNB1L = await page.$$eval('#zone-none-block-1-leaderboard', divs => $("div#zone-none-block-1-leaderboard").children('div').length);
      if (ZNB1L!==1) console.log('"zone-none-block-1-leaderboard" div is empty, since ' + ZNB1L + ' child AD div is found!');
      else console.log('"zone-none-block-1-leaderboard" div is found!');

      const Z2B2V = await page.$$eval('#zone-2-block-2-vertical', divs => $("div#zone-2-block-2-vertical").children('div').length);
      if (Z2B2V!==1) console.log('"zone-2-block-2-vertical" div is empty, since ' + Z2B2V + ' child AD div is found!');
      else console.log('"zone-2-block-2-vertical" div is found!');

      const Z2B3V = await page.$$eval('#zone-2-block-3-vertical', divs => $("div#zone-2-block-3-vertical").children('div').length);
      if (Z2B3V!==1) console.log('"zone-2-block-3-vertical" div is empty, since ' + Z2B3V + ' child AD div is found!');
      else console.log('"zone-2-block-3-vertical" div is found!');

      const Z1CB1N = await page.$$eval('#zone-1C-block-1-native', divs => $("div#zone-1C-block-1-native").children('div').length);
      if (Z1CB1N!==1) console.log('"zone-1C-block-1-native" div is empty, since ' + Z1CB1N + ' child AD div is found!');
      else console.log('"zone-1C-block-1-native" div is found!');

      const Z2B4V = await page.$$eval('#zone-2-block-4-vertical', divs => $("div#zone-2-block-4-vertical").children('div').length);
      if (Z2B4V!==1) console.log('"zone-2-block-4-vertical" div is empty, since ' + Z2B4V + ' child AD div is found!');
      else console.log('"zone-2-block-4-vertical" div is found!');

      const ZNB2L = await page.$$eval('#zone-none-block-2-leaderboard', divs => $("div#zone-none-block-2-leaderboard").children('div').length);
      if (ZNB2L!==1) console.log('"zone-none-block-2-leaderboard" div is empty, since ' + ZNB2L + ' child AD div is found!');
      else console.log('"zone-none-block-2-leaderboard" div is found!');

      const Z3B5S = await page.$$eval('#zone-3-block-5-square', divs => $("div#zone-3-block-5-square").children('div').length);
      if (Z3B5S!==1) console.log('"zone-3-block-5-square" div is empty, since ' + Z3B5S + ' child AD div is found!');
      else console.log('"zone-3-block-5-square" div is found!');

      const Z3B9S = await page.$$eval('#zone-3-block-9-square', divs => $("div#zone-3-block-9-square").children('div').length);
      if (Z3B9S!==1) console.log('"zone-3-block-9-square" div is empty, since ' + Z3B9S + ' child AD div is found!');
      else console.log('"zone-3-block-9-square" div is found!');

      const Z3B13S = await page.$$eval('#zone-3-block-13-square', divs => $("div#zone-3-block-13-square").children('div').length);
      if (Z3B13S!==1) console.log('"zone-3-block-13-square" div is empty, since ' + Z3B13S + ' child AD div is found!');
      else console.log('"zone-3-block-13-square" div is found!');

      const Z3B17S = await page.$$eval('#zone-3-block-17-square', divs => $("div#zone-3-block-17-square").children('div').length);
      if (Z3B17S!==1) console.log('"zone-3-block-17-square" div is empty, since ' + Z3B17S + ' child AD div is found!');
      else console.log('"zone-3-block-17-square" div is found!');

      const ZNB3L = await page.$$eval('#zone-none-block-3-leaderboard', divs => $("div#zone-none-block-3-leaderboard").children('div').length);
      if (ZNB3L!==1) console.log('"zone-none-block-3-leaderboard" div is empty, since ' + ZNB3L + ' child AD div is found!');
      else console.log('"zone-none-block-3-leaderboard" div is found!');

      /* const APH = await page.$$eval('#div-gpt-ad-premium-Test67-hover', divs => $("div#div-gpt-ad-premium-Test67-hover").children('div').length);
      if (APH!==1) console.log('"div-gpt-ad-premium-Test67-hover" div is empty, since ' + APH + ' child AD div is found!');
      else console.log('"div-gpt-ad-premium-Test67-hover" div is found!'); */

  //#endregion

  //#region capture fullpage screenshot
      await page.screenshot({ 
        path: url.name + `-ADV-234_HP-${browsertype}.png`,
        fullPage : true });
      console.log('Screenshot captured on ' + browsertype + ' browser, for ' + url.name + ' URL!');
  //#endregion

  //#region close browser
      await browser.close();
  //#endregion

      }  
  }
})();