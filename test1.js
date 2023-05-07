// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const wdio = require('webdriverio');
async function main () {
  const caps = {"appium:app":"C:\\Users\\khain\\Downloads\\Wysa.apk","appium:deviceName":"emulator-5554","platformName":"android","appium:automationName":"UiAutomator2","appium:ensureWebviewsHavePages":true,"appium:nativeWebScreenshot":true,"appium:newCommandTimeout":3600,"appium:connectHardwareKeyboard":true}
  const driver = await wdio.remote({
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: caps
  });
  await driver.longPressKeyCode(187, undefined, undefined);
  await driver.longPressKeyCode(3, undefined, undefined);
  await driver.touchAction({actions: 'tap', x: 687, y: 2042})
  await driver.touchAction({actions: 'tap', x: 342, y: 2061})
  await driver.touchAction({actions: 'tap', x: 643, y: 1796})
  await driver.touchAction({actions: 'tap', x: 786, y: 1627})
  await driver.touchAction({actions: 'tap', x: 990, y: 1821})
  await driver.touchAction({actions: 'tap', x: 986, y: 1806})
  await driver.touchAction({actions: 'tap', x: 997, y: 1400})
  await driver.deleteSession();
}

main().catch(console.log);