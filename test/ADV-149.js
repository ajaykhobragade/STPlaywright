const playwright = require('playwright');

(async () => {

    //#region launch browser
    for (const browsertype of ['webkit']) {
    const browser = await playwright[browsertype].launch({
        headless: false
    });
    //#endregion

    //#region context, page, get URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://stage-www.startribune.com/singing-the-concert-cancellation-blues-get-your-live-music-fix-with-these-25-films/569088652/");

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })
    //#endregion
    
    //#region enter credentials to login

    const Subscribe = await page.$$eval('.c0113 c017', buttons => $("button.c0113 c017").console);
    console.log(Subscribe);
    await page.$eval('#mobileButton > button', (el) => el.click());


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
    //#endregion

    //#region capture screenshot
    await page.screenshot({ 
        path: 'ADV-149.png',
        fullPage : true });
    //#endregion

    //#region close browser
    //await browser.close();
    //#endregion

}  
})();