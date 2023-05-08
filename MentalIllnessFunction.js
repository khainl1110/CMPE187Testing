// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const similarity = require('string-similarity-js')
const wdio = require('webdriverio');
const fs = require('fs')
// const By = require("AppiumBy");

async function main () {
  const caps = {"appium:deviceName":"emulator-5554","platformName":"android","appium:automationName":"UiAutomator2","appium:ensureWebviewsHavePages":true,"appium:nativeWebScreenshot":true,"appium:newCommandTimeout":3600,"appium:connectHardwareKeyboard":true}
  const driver = await wdio.remote({
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    capabilities: caps
  });

  await driver.touchAction([
    {action: 'press', x: 536, y: 1910},
    {action: 'moveTo', x: 525, y: 929},
    'release'
  ]);

  await driver.pause(2000);

  let el1 = await driver.$("~Wysa");
  await el1.click();

  await driver.pause(5000);

  // tap on the skip button
  // let el21 = await driver.$("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.TextView[2]");
  // await el21.click();

    await driver.pause(5000);
    let textInput = "What are different exercises that will help with my anxiety";
    let expectedTextOutput = "I notice you are not feeling well, how can I help you";

    console.log(textInput);
    let el2 = await driver.$("//android.widget.LinearLayout[@content-desc=\"Continue conversation\"]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView[1]");
    await el2.click();
    await driver.pause(5000);
    let el3 = await driver.$("~Reply or say help…");
    await el3.setValue(textInput);
    let el4 = await driver.$("~Send");
    await el4.click();

    await driver.pause(10000);
    
    const elements1 = (await driver.$$('android.widget.TextView')).slice(-7);
    let bagOfTexts = null;
    elements1.forEach(async (element) => {
      let currentText = await element.getText()

      bagOfTexts += currentText
    });

    await driver.pause(5000);
  
    console.log("Text is " ,bagOfTexts);
    
    let position = bagOfTexts.indexOf(textInput);

    bagOfTexts = bagOfTexts.slice(position + textInput.length, bagOfTexts.length);

    console.log("Text after is ", bagOfTexts);

    let score = similarity.stringSimilarity(bagOfTexts, expectedTextOutput);

    console.log("Final score is ", score);

    (await driver.$("~Back")).click();
    await driver.pause(2000);

    await driver.longPressKeyCode(3, undefined, undefined);

    await driver.deleteSession();

    // write result to result file
    fs.appendFile("./testResults.txt", 
    "Input: " + textInput + "\n"
    + "Expected output: " + expectedTextOutput + "\n"
    + "Actual output: " + bagOfTexts + "\n"
    + "Similarity score " + score + "\n"
    + "------------------" + "\n", (err) => {
      if(err)
        console.log(err)
      console.log("Test result was written")
    })

}

main().catch(console.log);

