//#region playground

//wait page.waitForSelector("input[id-mobileButton]");
    //await page.waitForSelector('//*[@id="mobileButton"]');
    //await page.$eval('#mobileButton > a.c0113.c017', (el) => el.click());
    //await page.$eval('//*[@id="mobileButton"]', (el) => el.click());
    //await page.$eval('#mobileButton', (el) => el.click());
    //await page.click('//*[@id="mobileButton"]/a[1]');
    //await page.click("#mobileButton");
    //await page.click('//*[@id="mobileButton"]');
    //await page.click('.c0113 c017');

    //await page.click('input[value="Subscribe"]');
    //await page.$eval('#mobileButton > a.c0113.c017', (el) => el.click());
    //const Subscribe = await page.$$eval('.c0113 c017', buttons => $("button.c0113 c017").console);
    //console.log(Subscribe);

    /* await page.$('.ReactModal__Content ReactModal__Content--after-open c019 c0111 c011 c018').hasScrollBar();

    (function($) {
        $.fn.hasScrollBar = function() {
            return this.get(0).scrollHeight > this.height();
        }
    })(jQuery); */

    //const facebook = await page.$('.c0113 c017', element => element.textContent);
    //const Subscribe = await page.$('.c0113 c017', e => e.InnerHTML);

    //await page.waitFor(1000); elem => elem.click()
    //await page.click('.c0113 c017');

    //await page.$eval('//*[@id="mobileButton"]/button', (el) => el.click());
    

    /* const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('.nav-utility-btn btn-subscribe'), // Click triggers a popup.
      ])
      await popup.waitForLoadState('domcontentloaded'); // The promise resolves after 'domcontentloaded' event.
      console.log(await popup.title()); // Popup is ready to use. */

/*     const frame = page.frames().find(frame => frame.name() === 'myframe');
    const text = await frame.$eval('.selector', element => element.textContent);
    console.log(text); */

    //const SELECTOR = await page.$eval('.nav-utility-btn btn-subscribe', e => e.outerHTML);
    //console.log(SELECTOR);
    /* if ((await page.$(SELECTOR)) !== null) {
    await page.click(SELECTOR);
    } */



    //await page.waitForSelector('//*[@id="mobileButton"]/button');

    /* const login = await page.$('#mobileButton');
     login.click();
    
     await page.click('#mobileButton') */

    //await page.click('#mobileButton');
    //await page.$eval('#mobileButton', elem => elem.click());
    //await page.evaluate(() => document.querySelector('//*[@id="mobileButton"]/button').scrollIntoView());
    //await page.click('//*[@id="mobileButton"]/button');

    /* await page.click('#meterContent')
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page()))); 
    const popup = await newPagePromise;
    await popup.waitForSelector('#mobileButton')
    const confirm = await popup.$('#mobileButton')
    await popup.click('#mobileButton')
    await page.waitFor(2000);
    await page.goto('your login page'); $ */
    
    //await page.click(launch);

  /*   focusMethod = function getFocus() {
        document.getElementById(".c0116 c0110").focus();
    }

    await page.click('.c0116 c0110'); */

    
   /*  await page.type('[id=user_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=user_password]', 'mystrib123');
    await page.type('[id=user_password_confirmation]', 'mystrib123');
    await page.type('[id=user_zip]', '55374');
    await page.selectOption('[id=user_birth_year]', '1981');  
    
    await page.waitForSelector("#terms_of_use");
    await page.evaluate(() => {
    document.querySelector("#terms_of_use").parentElement.click();});
    
    await page.keyboard.press('Enter', {delay:2000}); */
    endregion

if (await page.$('div.l-home-top-ad') !== null) console.log('DFP Direct Ad is found');
else console.log('DFP Direct Ad is not found');

if (await page.$('#zone-2-block-2-vertical', e => e.outerHTML) !== null) console.log('DFP Indirect block-2-vertical Ad is found');
else console.log('DFP Indirect block-2-vertical Ad is not found');

const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => el['data-google-query-id']);

if (await page.$('#zone-2-block-2-vertical', e => e('data-google-query-id')) !== null) console.log('DFP Indirect block-2-vertical query Ad is found');
else console.log('DFP Indirect block-2-vertical query Ad is not found');

if (await page.$('#zone-none-block-1-leaderboard'), ('data-google-query-id') !== null) console.log('DFP Direct block-1-leaderboard Ad is found');
else console.log('DFP Direct block-1-leaderboard Ad is not found');



if (await page.$('#zone-1A-block-1-native', e => e.outerHTML) !== null) console.log('DFP Indirect block-2-vertical Ad is found');
else console.log('DFP Indirect block-2-vertical Ad is not found');

//const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => el['data-google-query-id']);
const contentWrapper = await page.$eval('#zone-1A-block-1-native', e => e.outerHTML);
console.log(contentWrapper);
if (contentWrapper==null) console.log('Empty');
else console.log('not Empty');

if (await page.$('#zone-1A-block-1-native', e => e('data-google-query-id')) !== null) console.log('DFP Indirect block-2-vertical query Ad is found');
else console.log('DFP Indirect block-2-vertical query Ad is not found');

if (await page.$('#zone-1A-block-1-native'), ('data-google-query-id') !== null) console.log('DFP Direct block-1-leaderboard Ad is found');
else console.log('DFP Direct block-1-leaderboard Ad is not found');

//const contentWrapper = await page.$('#zone-2-block-2-vertical');
//console.log(contentWrapper.getAttr( "style" ) );
//const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => el.style);
//const preloadHref = await page.$eval('#zone-2-block-2-vertical', el => el.href);
//const html = await page.$eval('#zone-2-block-2-vertical', (e, suffix) => e.outerHTML + suffix, 'hello');
//const contentWrapper = await page.$eval('#zone-2-block-2-vertical', el => e['data-google-query-id']);
//const styleAttr = await contentWrapper.getAttribute('style');
//const tweetHandle = await page.$('#zone-2-block-2-vertical');
//await tweetHandle.evaluate(node => node.innerText).toBe('10');
//if (contentWrapper.getAttribute("class") == null || contentWrapper.getAttribute("class") == "") console.log('Empty');
//else console.log('Not Empty');
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