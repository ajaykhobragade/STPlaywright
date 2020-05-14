const playwright = require('playwright');

(async () => {

    //#region launch browser
    const browser = await playwright["chromium", "webkit"].launch({
        headless: false
    });

    //#endregion

    //#region context, page, get URL
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://users.startribune.com/placement/1/environment/2/meter-desktop-331/start?offer=331");

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })
    //#endregion

    //#region fill up subscriber information
    await page.type('[id=subscriber_first_name]', 'Ajay');
    await page.type('[id=subscriber_last_name]', 'Khobragade');
    await page.type('[id=subscriber_address_1]', '19388 Harmony Ave');
    await page.type('[id=subscriber_address_2]', 'NA');
    await page.type('[id=subscriber_city]', 'Rogers');
    await page.type('[id=subscriber_zip]', '55374');
    await page.type('[id=subscriber_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=subscriber_phone_number]', '215-622-4903');
    await page.keyboard.press('Enter', {delay:2000});
    //#endregion

    //#region enter payment details
    await page.waitForSelector("#billing_address_same");
    await page.evaluate(() => {
    document.querySelector("#billing_address_same").parentElement.click();});

    const card = {
        number: '5147305085176291'
      }
    await page.waitForSelector('//*[@id="payment-type-creditCard"]/div/div[2]/div/div[1]/fieldset[1]/input[2]');
    await page.click('//*[@id="payment-type-creditCard"]/div/div[2]/div/div[1]/fieldset[1]/input[2]');
    await page.waitForSelector('//*[@id="payment-type-creditCard"]/div/div[2]/div/div[1]/fieldset[1]/input[2]');
    await page.click('//*[@id="payment-type-creditCard"]/div/div[2]/div/div[1]/fieldset[1]/input[2]');
    await page.keyboard.type(card.number, { delay: 50 });
        
    await page.type('//*[@id="payment-type-creditCard"]/div/div[2]/div/div[2]/fieldset/input', 'Ajay Khobragade');
    await page.selectOption('.ccjs-month', '01');
    await page.selectOption('.ccjs-year', '22');
    await page.keyboard.press('Enter', {delay:2000});
    //#endregion

    //#region review, confirm purchase
    await page.waitForSelector("#terms_of_sale");
    await page.evaluate(() => {
    document.querySelector("#terms_of_sale").parentElement.click();});

    await page.keyboard.press('Enter', {delay:4000});
    //#endregion

    //#region create new login
    await page.click('#slide-1');
    await page.type('[id=user_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=user_password]', 'strib123');
    await page.type('[id=user_password_confirmation]', 'strib123');
    await page.type('[id=user_zip]', '55374');
    await page.selectOption('#user_birth_year', '1981');

    await page.waitForSelector("#terms_of_use");
    await page.evaluate(() => {
    document.querySelector("#terms_of_use").parentElement.click();});

    await page.keyboard.press('Enter', {delay:4000});
    //#endregion

     //#region login in
    await page.click('#slide-2');
    await page.type('[id=login_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=login_password]', 'india12345');
    await page.keyboard.press('Enter', {delay:8000});
     //#endregion

     //#region thanks and continue
    const clickText = text => {
        return page.evaluate(text => [...document.querySelectorAll('*')].find(e => e.textContent.trim() === text).click(), text);
    };
    await clickText('Continue');
    //await page({delay:4000});

     //#endregion

    //#region capture screenshot
    await page.screenshot({ 
        path: 'Offer331Slide.png',
        fullPage : true });
    //#endregion

    //#region close browser
    await browser.close();
    //#endregion
    
})();