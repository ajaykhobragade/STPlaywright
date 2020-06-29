const playwright = require('playwright');
jest.setTimeout(360 * 1000)
const expect = require('expect');
let browser;

//#region click on subscription button

describe("Test Subscription button", () => {
  it("should have subscription button", async () => {

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

    //verify the subscription fields are available
    await expect(page).toHaveSelector('[id=subscriber_first_name]')
    await expect(page).toHaveSelector('[id=subscriber_last_name]')
    await expect(page).toHaveSelector('[id=subscriber_address_1]')
    await expect(page).toHaveSelector('[id=subscriber_address_2]')
    await expect(page).toHaveSelector('[id=subscriber_city]')
    await expect(page).toHaveSelector('[id=subscriber_state]')
    await expect(page).toHaveSelector('[id=subscriber_zip]')
    await expect(page).toHaveSelector('[id=subscriber_email_address]')
    await expect(page).toHaveSelector('[id=subscriber_phone_number]')

    //click on next button before filling up fields
    //await page.click('//*[@id="meterCheckout"]/form/div[3]/button');
    await page.$eval('//*[@id="meterCheckout"]/form/div[3]/button', (el) => el.click());

    //verify the error message for mandatory fields
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[1]/div/div[1]/span', "Please provide your first name.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[1]/div/div[2]/span', "Please provide your last name.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[2]/div/div[1]/span', "Please provide your address.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[3]/div/div[1]/span', "Please enter a city.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[3]/div/div[3]/span', "Please enter your zip code.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[4]/div/div[1]/span', "Please enter a valid email address.");
    await expect(page).toHaveText('//*[@id="meterCheckout"]/form/div[2]/div[4]/div/div[2]/span', "Please enter the phone number associated with your account. (Required for verification.)");

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

    await browser.close();
}
  })
})
//#endregion
