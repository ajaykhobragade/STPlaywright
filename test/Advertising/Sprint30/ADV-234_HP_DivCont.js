const playwright = require('playwright');
const { LazyLoad_HP_URL_P } = require('./urls');
const { LazyLoad_HP_URL_S } = require('./urls');

(async () => {

  //#region launch browsers, contexts and page
    for (const browsertype of ['chromium']) {
      const browser = await playwright[browsertype].launch({
          headless: false,
          devtools: false
      });
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
  //#endregion
  
  //#region navigate to the pages
    await page1.goto(LazyLoad_HP_URL_P, {
        waitUntil: 'load',
        timeout: 0
      });
    console.log('Prod URL is loaded!');
    
  //#region login 
    await page1.click('a.nav-utility-btn.btn-login.login-js');
    await page1.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
    await page1.type('//*[@id="password"]', 'mystrib123');
    await page1.click('//*[@id="login-form"]/fieldset[3]/div/input[3]');
    await page1.waitForNavigation({waitUntil: 'load'});

    await page1.waitForResponse(response => {
            waitPeriod++;
            return response.request().resourceType() === "xhr"
        })
  //#endregion

  //#region scrollfullpage
    await scrollFullPage(page1);

    async function scrollFullPage(page1) {
        await page1.evaluate(async () => {
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

    var waitPeriod = 10;
    await page1.waitForResponse(response => {
        waitPeriod++;
        return response.request().resourceType() === "xhr"
    });

    await page2.goto(LazyLoad_HP_URL_S, {
        waitUntil: 'load',
        timeout: 0
      });
    console.log('Stage URL is loaded!');
    
  //#region login 
    await page2.click('a.nav-utility-btn.btn-login.login-js');
    await page2.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
    await page2.type('//*[@id="password"]', 'mystrib123');
    await page2.click('//*[@id="login-form"]/fieldset[3]/div/input[3]');
    await page2.waitForNavigation({waitUntil: 'load'});

    await page2.waitForResponse(response => {
            waitPeriod++;
            return response.request().resourceType() === "xhr"
        })
  //#endregion

    //#region scrollfullpage
    await scrollFullPage(page2);
    //#endregion
    
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
      path: `Prod-ADV-234_HP_DivCont-${browsertype}.png`,
      fullPage : true });
    console.log('Screenshot captured on ' + browsertype + ' browser!');

    await page2.screenshot({ 
      path: `Stage-ADV-234_HP_DivCont-${browsertype}.png`,
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