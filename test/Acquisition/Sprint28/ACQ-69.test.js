const playwright = require('playwright');
jest.setTimeout(360 * 1000)
const expect = require('expect');
let browser;

//#region click on login button

describe("Test login button", () => {
  it("should able to login", async () => {

  for (const browsertype of ['chromium', 'webkit', 'firefox']) {
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
    //click on login button
    await page.$eval('//*[@id="mobileButton"]/a[2]', (el) => el.click());

    //verify the login fields are available
    await expect(page).toHaveSelector('[id=username]')
    await expect(page).toHaveSelector('[id=password]')

    //fill up the login fields with information
    await page.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
    await page.type('//*[@id="password"]', 'mystrib123');
    await page.click('//*[@id="login-form"]/fieldset[3]/div/input[3]');
    await expect(page).toHaveSelector('.nav-logo-link')

    await browser.close();
  }
})
})
//#endregion
