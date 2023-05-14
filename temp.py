el1 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Reply or say help…")
el1.click()

el1.send_keys("test")

el2 = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value="Send")
el2.click()

