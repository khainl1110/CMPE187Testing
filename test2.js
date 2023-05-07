// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const similarity = require('string-similarity-js')
const wdio = require('webdriverio');
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

  // let el1 = await driver.$("~Wysa");
  // await el1.click();

  // // tap on the skip button
  // await driver.touchAction({actions: 'tap', x: 538, y: 1992})

  let textInput = "Let's get active " + Math.floor(Math.random() * 50);
  let expectedTextOutput = "Let's try some exercises";

  console.log(textInput);
  let el2 = await driver.$("//android.widget.LinearLayout[@content-desc=\"Continue conversation\"]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView[1]");
  await el2.click();
  await driver.pause(5000);
  let el3 = await driver.$("~Reply or say help…");
  await el3.setValue(textInput);
  let el4 = await driver.$("~Send");
  await el4.click();

    await driver.pause(10000);
    
    // const elements1 = (await driver.$$('android.widget.TextView'));
    // let elements2 = elements1.reverse().slice(0,7)
    // console.log("Length 1, ", elements1.length);
    // console.log("Length 2", elements2.length);
    // elements2.map(element => console.log(element.getText()) );
    // await driver.pause(5000);
  
    // await driver.deleteSession();

    //const elements1 = (await driver.$$('android.widget.TextView')).reverse().slice(0,5).reverse();
    const elements1 = (await driver.$$('android.widget.TextView')).slice(-7);
    let bagOfTexts = null;
    elements1.forEach(async (element) => {
      let currentText = await element.getText()

      //console.log("Text is " + currentText);

      bagOfTexts += currentText
    });

    await driver.pause(5000);
  
    console.log("Text is " ,bagOfTexts);
    
    let position = bagOfTexts.indexOf(textInput);

    bagOfTexts = bagOfTexts.slice(position + textInput.length, bagOfTexts.length);

    console.log("Text after is ", bagOfTexts);

    let score = similarity.stringSimilarity(bagOfTexts, expectedTextOutput);

    console.log("Final score is ", score);
    await driver.deleteSession();

    


  //console.log(elements.getText());

 
}

main().catch(console.log);

