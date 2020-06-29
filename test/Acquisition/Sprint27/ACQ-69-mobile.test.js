const playwright = require('playwright');
const devices = ["iPhone 11 Pro"];
const iPhone11 = devices['iPhone 11 Pro'];
jest.setTimeout(360 * 1000)
const expect = require('expect');
let browser;


//#region click on login button

describe("Test login button for mobile", () => {
  it("should able to login", async () => {

  for (const browsertype of ['chromium', 'webkit']) {
    browser = await playwright[browsertype].launch({
        headless: false,
    })
  
    //const context = await browser.newContext();
    const context = await browser.newContext({
      ...iPhone11,
      geolocation: { longitude: 12.492507, latitude: 41.889938 },
      permissions: ['geolocation']
  });
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
