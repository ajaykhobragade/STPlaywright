const playwright = require('playwright');

(async () => {

    //Code execution happens within here
    const browser = await playwright["chromium"].launch({
        headless: false
    });

    //context
    const context = await browser.newContext();

    //navigate to the page
    const page = await context.newPage();

    //navigate to the page
    await page.goto("https://users.startribune.com/placement/2/environment/2/limit-regfirst-mobile-289/start?offer=289");

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })

    //enter credentials to login
    await page.type('[id=user_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=user_password]', 'mystrib123');
    await page.type('[id=user_password_confirmation]', 'mystrib123');
    await page.type('[id=user_zip]', '55374');
    await page.selectOption('[id=user_birth_year]', '1981');

    await page.waitForSelector("#terms_of_use");
    await page.evaluate(() => {
    document.querySelector("#terms_of_use").parentElement.click();});

    await page.keyboard.press('Enter', {delay:2000});

    //hover

    await page.screenshot({path: `ea-${Date.now}.png`});
    
    //await browser.close();
    
})();