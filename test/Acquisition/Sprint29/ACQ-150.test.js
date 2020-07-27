const playwright = require('playwright');
jest.setTimeout(360 * 1000)
const expect = require('expect');
let browser;

//#region click on subscription button

describe("Test payment slide", () => {
  it("should have payment slide", async () => {

  for (const browsertype of ['chromium']) {
    browser = await playwright[browsertype].launch({
        headless: true,
    })
  
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://stage-www.startribune.com/singing-the-concert-cancellation-blues-get-your-live-music-fix-with-these-25-films/569088652/?featureOff=Bounce-X", {
      waitUntil: 'load',
      timeout: 0
    });

    await page.waitForResponse(response => {
      return response.request().resourceType() === "xhr"
  })
    //click on subscription button
    await page.$eval('//*[@id="mobileButton"]/a[1]', (el) => el.click());
    //fill up the subscription fields with information
    await page.type('//*[@id="subscriber_first_name"]', 'Ajay');
    await page.type('//*[@id="subscriber_last_name"]', 'Khobragade');
    await page.type('//*[@id="subscriber_address_1"]', '19388 Harmony Ave');
    await page.type('//*[@id="subscriber_address_2"]', 'NA');
    await page.type('//*[@id="subscriber_city"]', 'Rogers');
    await page.type('//*[@id="subscriber_zip"]', '55374');
    await page.type('//*[@id="subscriber_email_address"]', 'ajay.khobragade@startribune.com');
    await page.type('//*[@id="subscriber_phone_number"]', '215-622-4903');
    await page.keyboard.press('Enter', {delay:2000});

    //verify the subscription information on payment slide

    //verify the payment type fields are available
    await expect(page).toHaveSelector('//*[@id="meterCheckout"]/form/div[3]/div[1]/div/div/label/input')
    await expect(page).toHaveSelector('//*[@id="meterCheckout"]/form/div[3]/div[2]/div/div/label/input')
    //verify the billing address fields are available
    await expect(page).toHaveSelector('[id=billing_address_same]')
    await expect(page).toHaveSelector('[id=billing_address_1]')
    await expect(page).toHaveSelector('[id=billing_address_2]')
    await expect(page).toHaveSelector('[id=billing_city]')
    await expect(page).toHaveSelector('[id=billing_state]')
    await expect(page).toHaveSelector('[id=billing_zip]')
    //verify the payment information fields are available
    await expect(page).toHaveSelector('//*[@id="ccjs-number-formatted"]')
    await expect(page).toHaveSelector('//*[@id="cc_csc"]')
    await expect(page).toHaveSelector('//*[@id="ccjs-name"]')
    await expect(page).toHaveSelector('//*[@id="ccjs-month"]')
    await expect(page).toHaveSelector('//*[@id="meterCheckout"]/form/div[5]/div[2]/div[2]/div[1]/div/div[3]/select')
    //click on next button before filling up fields
    await page.$eval('//*[@id="meterCheckout"]/form/div[7]/div[2]/button', (el) => el.click());
    //verify the error message for mandatory fields
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[4]/div[2]/div[1]/span', "Please enter billing address.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[5]/div[1]/div[1]/span', "Please enter your credit card number.");
    //fill up the billing address fields with information
    await page.type('//*[@id="billing_address_1"]', '19388 Harmony Ave');
    await page.type('//*[@id="billing_address_2"]', 'NA');
    await page.type('//*[@id="billing_city"]', 'Rogers');
    await page.type('//*[@id="billing_zip0000"]', '55374');
    //verify the checkbox (same as subscription address) action

    //fill up the payment information fields 
    await page.waitForSelector("#billing_address_same");
    await page.evaluate(() => {
    document.querySelector("#billing_address_same").parentElement.click();});

    const card = {
        number: '5147305085176291'
      }
    await page.waitForSelector('//*[@id="ccjs-number-formatted"]');
    await page.click('//*[@id="ccjs-number-formatted"]');
    await page.waitForSelector('//*[@id="ccjs-number-formatted"]');
    await page.click('//*[@id="ccjs-number-formatted"]');
    await page.keyboard.type(card.number, { delay: 50 });
        
    await page.type('//*[@id="ccjs-name"]', 'Ajay Khobragade');
    await page.selectOption('.ccjs-month', '01');
    await page.selectOption('.ccjs-year', '22');
    //click on next button after filling up fields
    await page.$eval('//*[@id="meterCheckout"]/form/div[7]/div[2]/button', (el) => el.click());
    await expect(page).toHaveSelector('//*[@id="terms_of_sale"]')
    
    await browser.close();
}
  })
})
//#endregion
