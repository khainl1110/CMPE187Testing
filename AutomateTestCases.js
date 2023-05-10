// Requires the webdriverio client library
// (npm install webdriverio)
// Then paste this into a .js file and run with Node:
// node <file>.js

const similarity = require('string-similarity-js')
const wdio = require('webdriverio');
const fs = require('fs')
const reader = require('xlsx')

async function automateTest() {
    const file = reader.readFile('./temp.xlsx')

    let data = []
    let indexStarts = 8

    similarityPassedThreshold = 0.25

    const temp = reader.utils.sheet_to_json(file.Sheets["TestCases"])
    temp.map(async (row) =>{
        data.push(row)
        
    })

    let counter = 1
    for(const row of data) {
        if(counter >= indexStarts) {
            let textInput = row["Input"]
            let expectedTextOutput = row["Expected output"]
            
            await runTest(textInput, expectedTextOutput, similarityPassedThreshold) 
        }

        counter++;
    }

}

async function runTest (textInput, expectedTextOutput, similarityPassedThreshold) {
    return new Promise(async (resolve) => {

    const caps = {"appium:deviceName":"emulator-5554","platformName":"android","appium:automationName":"UiAutomator2","appium:ensureWebviewsHavePages":true,"appium:nativeWebScreenshot":true,"appium:newCommandTimeout":3600,"appium:connectHardwareKeyboard":true}
    const driver = await wdio.remote({
        protocol: "http",
        hostname: "127.0.0.1",
        port: 4723,
        path: "/",
        capabilities: caps
    });

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

        let isPassed = score >= similarityPassedThreshold? true: false;

        console.log("Final score is ", score);

        let hasToClick1 = bagOfTexts.includes("No, you misunderstood")
        let hasToClick2 = bagOfTexts.includes("No, let's keep talking")

        if(hasToClick1) {
            // await driver.touchAction({actions: 'tap', x: 738, y: 2064})
            await driver.$("~No, you misunderstood").click();
            await driver.pause(5000);
            await driver.$("~Something else?").click();
            await driver.pause(5000);
        }

        if(hasToClick2) {
            await driver.$("~No, let's keep talking").click();
            await driver.pause(5000);
        }
        
        // (await driver.$("~Back")).click();
        // await driver.pause(2000);

        // await driver.longPressKeyCode(3, undefined, undefined);

        await driver.deleteSession();

        // write result to result file
        fs.appendFile("./testResults.txt", 
        "Input: " + textInput + "\n"
        + "Expected output: " + expectedTextOutput + "\n"
        + "Actual output: " + bagOfTexts + "\n"
        + "Similarity score " + score + "\n"
        + "Passed? " + isPassed + "\n"
        + "------------------" + "\n", (err) => {
        if(err)
            console.log(err)
        console.log("Test result was written")
            })
        resolve(null)
    })
    
}
  
automateTest().catch(console.log)

