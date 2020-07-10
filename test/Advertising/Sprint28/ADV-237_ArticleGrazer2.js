const playwright = require('playwright');

(async () => {

  for (const browsertype of ['chromium']) {
    const browser = await playwright[browsertype].launch({
        headless: true,
        devtools: false
    });
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  let messagesP = [], startTimeP = 0, endTimeP = 0
  let messagesS = [], startTimeS = 0, endTimeS = 0

  //#region test ad load speed on prod 

  // This is for Prod testing, needs to come before we go to the page. We're going to capture the messages to use later.
  page1.on('console', msg => messagesP.push(msg))
  await page1.goto('https://www.startribune.com/trump-connected-lobbyists-reap-windfall-in-covid-19-boom/571640592/?featureOff=Bounce-X&debug=true', {
        waitUntil: 'load',
        timeout: 0
      });
  console.log('Prod URL is loaded!');
  await context1.close();
  
  // Now that we've got all of our messages we'll go through them.
  messagesP.map(msg => {
    if(typeof msg.args()[2] === 'object') { // The console messages we want come through as objects
      if (msg.args()[2].toString().indexOf('Made it to initializeAds') !== -1) { // Have to cast to a string, then search for the value we need
        startTimeP = parseInt(msg.args()[3].toString().replace('JSHandle:', '')) // Again, casting to a string, then replacing some garbage text we get, then parsing it to an int
      }
      if (msg.args()[2].toString().indexOf('Calling googletag.enableServices()') !== -1) {
        endTimeP = parseInt(msg.args()[3].toString().replace('JSHandle:', ''))
      }
    }
  })
  if (startTimeP !== 0 && endTimeP!== 0) { // If we don't get either of these values then this is pointless to do. could error on this
    console.log('Time to send ads on Prod: ', endTimeP-startTimeP) // this is just a console, but you can compare and error on more than 1000
    // This is to make sure time is within 1000 millisec
    const timediffP = endTimeP-startTimeP
    if (timediffP>=1000) console.log('Alert: Time to send ads is taking more than 1000 millisec on Prod');
    else console.log('Succsses: Time to send ads is within 1000 millisec on Prod');
  }
  else console.log('Alert: Prod is loaded without ads');

  //#endregion

  //#region test ad load speed on stage
  // This is for Stage testing, needs to come before we go to the page. We're going to capture the messages to use later.
  page2.on('console', msg => messagesS.push(msg))
  await page2.goto('https://stage-www.startribune.com/trump-connected-lobbyists-reap-windfall-in-covid-19-boom/571640592/?featureOff=Bounce-X&debug=true', {
        waitUntil: 'load',
        timeout: 0
      });
  console.log('Stage URL is loaded!');
  await context2.close();
  await browser.close();
  // Now that we've got all of our messages we'll go through them.
  messagesS.map(msg => {
    if(typeof msg.args()[2] === 'object') { // The console messages we want come through as objects
      if (msg.args()[2].toString().indexOf('Made it to initializeAds') !== -1) { // Have to cast to a string, then search for the value we need
        startTimeS = parseInt(msg.args()[3].toString().replace('JSHandle:', '')) // Again, casting to a string, then replacing some garbage text we get, then parsing it to an int
      }
      if (msg.args()[2].toString().indexOf('Calling googletag.enableServices()') !== -1) {
        endTimeS = parseInt(msg.args()[3].toString().replace('JSHandle:', ''))
      }
    }
  })
  if (startTimeS !== 0 && endTimeS!== 0) { // If we don't get either of these values then this is pointless to do. could error on this
    console.log('Time to send ads on Stage: ', endTimeS-startTimeS) // this is just a console, but you can compare and error on more than 1000
    // This is to make sure time is within 1000 millisec
    const timediffS = endTimeS-startTimeS
    if (timediffS>=1000) console.log('Alert: Time to send ads is taking more than 1000 millisec on Stage');
    else console.log('Succsses: Time to send ads is within 1000 millisec on Stage');
  }
  else console.log('Alert: Stage is loaded without ads');
  //#endregion
}
})();