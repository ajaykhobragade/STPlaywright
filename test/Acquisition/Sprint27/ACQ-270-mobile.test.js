const playwright = require('playwright');
const devices = ["iPhone 11 Pro", "Pixel 2"];
const iPhone11 = devices['iPhone 11 Pro'];
jest.setTimeout(250 * 1000)
const expect = require('expect');
let browser;

//#region checking visa disclaimer

describe("Test visa disclaimer for mobile", () => {
  it("should able to verify the disclaimer", async () => {
        
  for (const browsertype of ['chromium']) {
    browser = await playwright[browsertype].launch({
        headless: true,
    })

    //const context = await browser.newContext();
    const context = await browser.newContext({
      ...iPhone11,
      geolocation: { longitude: 12.492507, latitude: 41.889938 },
      permissions: ['geolocation']
  });
    const page = await context.newPage();

    await page.goto("https://users.startribune.com/placement/2/environment/2/limit-visa-compliance-628/start?offer=628", {
        waitUntil: 'load',
        timeout: 0
    });

    await page.waitForResponse(response => {
        return response.request().resourceType() === "xhr"
    })

    // fill up subscriber information
    await page.type('[id=subscriber_first_name]', 'Ajay');
    await page.type('[id=subscriber_last_name]', 'Khobragade');
    await page.type('[id=subscriber_address_1]', '19388 Harmony Ave');
    await page.type('[id=subscriber_address_2]', 'NA');
    await page.type('[id=subscriber_city]', 'Rogers');
    await page.type('[id=subscriber_zip]', '55374');
    await page.type('[id=subscriber_email_address]', 'ajay.khobragade@startribune.com');
    await page.type('[id=subscriber_phone_number]', '215-622-4903');
    await page.keyboard.press('Enter', {delay:2000});

    //enter payment details
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

    //review, confirm purchase
    //select checkbox for terms
    await page.waitForSelector("#terms_of_sale");
    await page.evaluate(() => {
    document.querySelector("#terms_of_sale").parentElement.click();});
    await page.keyboard.press('Enter', {delay:4000});
    
    await expect(page).toHaveText("Please accept the subscription terms.");

    //unselect checkbox for terms
    await page.waitForSelector("#terms_of_sale");
    await page.evaluate(() => {
    document.querySelector("#terms_of_sale").parentElement.click();});

    //select checkbox for subs terms
    await page.waitForSelector("#subscription_terms");
    await page.evaluate(() => {
    document.querySelector("#subscription_terms").parentElement.click();});
    await page.keyboard.press('Enter', {delay:4000});
    
    await expect(page).toHaveText("Please accept the terms of use and privacy policy.");

    //select checkbox for terms
    await page.waitForSelector("#terms_of_sale");
    await page.evaluate(() => {
    document.querySelector("#terms_of_sale").parentElement.click();});
    await page.keyboard.press('Enter', {delay:4000});
    
    await expect(page).toHaveText("Last step: Create a digital login");

    // close browser
    await browser.close();
  }
})
})
//#endregion