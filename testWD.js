// Requires the admc/wd client library
// (npm install wd)
// Then paste this into a .js file and run with Node 7.6+

const wd = require('wd');
const driver = wd.promiseChainRemote("http://127.0.0.1:4723");
const caps = {"appium:deviceName":"emulator-5554","platformName":"android","appium:automationName":"UiAutomator2","appium:ensureWebviewsHavePages":true,"appium:nativeWebScreenshot":true,"appium:newCommandTimeout":3600,"appium:connectHardwareKeyboard":true};

async function main () {
  await driver.init(caps);
  await driver.setImplicitWaitTimeout(5000);

  let el1 = await driver.elementById("bot.touchkin:id/layout_to_highlight");
  await el1.click();
  
  await driver.quit();
}

main().catch(console.log);