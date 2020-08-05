const playwright = require('playwright');
//const jestPlaywright = require('jest-playwright');
jest.setTimeout(360 * 1000)
const expect = require('expect');
let browser;

//#region click on login button

beforeAll(async () => {
  await page.goto("https://users.startribune.com/placement/2/environment/2/limit-regfirst-mobile-289/start?offer=289", {
    waitUntil: 'load',
    timeout: 0
  });
  await page.waitForResponse(response => {
    return response.request().resourceType() === "xhr"
}) 
})


test('should able to login', async () => {
  //await jestPlaywright.saveCoverage(page)
  //click on login button
  //await page.$eval('//*[@id="mobileButton"]/a[2]', (el) => el.click());
  //verify the login fields are available
  await expect(page).toHaveSelector('[id=user_email_address]')
  await expect(page).toHaveSelector('[id=user_password]')
  await expect(page).toHaveSelector('[id=user_zip]')
  //fill up the login fields with information
  //await page.type('//*[@id="username"]', 'ajay.khobragade@startribune.com');
  //await page.type('//*[@id="password"]', 'mystrib123');
  //await page.click('//*[@id="login-form"]/fieldset[3]/div/input[3]');
  //await expect(page).toHaveSelector('.nav-logo-link000') //fail test here
  //await jestPlaywright.saveCoverage(page)

  
  //await browser.close();
  //await jestPlaywright.saveCoverage(page)
})
//#endregion
