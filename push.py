from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import subprocess
from subprocess import check_output

rawList = check_output("cd ~/Lorenzo/Github/OpenSpeeches/assets/tv_show/ && find *", shell=True)
formattedList = []
for el in rawList.split("\n"):
    formattedList.append(el.replace(".mp4", ""))

print formattedList

browser = webdriver.Chrome()
browser.get("http://localhost:8000/views/addSpeech.html")

for el in formattedList:
    browser.find_element_by_id("title").send_keys(el.replace("_", " ").title())
    browser.find_element_by_id("author").send_keys("The Practice")
    browser.find_element_by_id("category").send_keys("tv_show")
    browser.find_element_by_id("path").send_keys(el)
    browser.find_element_by_id("submit").click()
