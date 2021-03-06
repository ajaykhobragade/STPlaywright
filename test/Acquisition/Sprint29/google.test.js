const playwright = require('playwright');
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
  
  await expect(page).toHaveSelector('[id=user_email_address]')
  await expect(page).toHaveSelector('[id=user_password]')
  await expect(page).toHaveSelector('[id=user_zip]')

})
//#endregion
