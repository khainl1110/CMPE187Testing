# This sample code uses the Appium python client v2
# pip install Appium-Python-Client
# Then you can paste this into a file and simply run with Python

from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

# For W3C actions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions import interaction
from selenium.webdriver.common.actions.action_builder import ActionBuilder
from selenium.webdriver.common.actions.pointer_input import PointerInput
from selenium.webdriver.support.wait import WebDriverWait

import time 
import asyncio
import random

caps = {}
caps["appium:deviceName"] = "emulator-5554"
caps["platformName"] = "android"
caps["appium:automationName"] = "UiAutomator2"
caps["appium:ensureWebviewsHavePages"] = True
caps["appium:nativeWebScreenshot"] = True
caps["appium:newCommandTimeout"] = 3600
caps["appium:connectHardwareKeyboard"] = True

driver = webdriver.Remote("http://127.0.0.1:4723", caps)

def main():
    textInput = "Let's get active and practice mkoooindfulness1" + str( random.randint(1, 1000) )
    print(textInput)
    el1 = driver.find_element(by=AppiumBy.XPATH, value="//android.widget.LinearLayout[@content-desc=\"Continue conversation\"]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView[1]")
    el1.click()

    driver.implicitly_wait(10)

    el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Reply or say help…")
    el2.send_keys(textInput)

    el3 = driver.find_element(by= AppiumBy.ACCESSIBILITY_ID, value = "Send");
    el3.click()

    driver.implicitly_wait(100)

    elements = driver.find_elements(AppiumBy.CLASS_NAME, 'android.widget.TextView')
    
    driver.implicitly_wait(100)

    bagOfText = ''

    for element in elements[-7:]:
            temp = element.text
            

            bagOfText += temp
    print(len(elements))

    print(bagOfText)

    driver.quit()

# asyncio.run(main())
main()