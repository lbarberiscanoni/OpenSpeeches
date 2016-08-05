from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import requests
import json

firebaseToken = "M9aZ22v4qRdPkHNsGRyfAzWX8QpeTE8KqCnrvpiL"

dbURL = "https://open-speeches.firebaseio.com/speeches/.json"
dbURL += "?auth=" + firebaseToken

browser = webdriver.Chrome()

def upload(bill):
    billPushed = requests.post(url = dbURL, data = json.dumps(bill))
    print bill

    print "uploading"
    if billPushed.status_code == requests.codes.ok:
        new_id = str(json.loads(billPushed.content).values()[0])
        new_url = "https://open-speeches.firebaseio.com/speeches/"+new_id+"/.json"
        new_data = {}
        new_data["id"] = new_id
        billPushed = requests.patch(url = new_url, data = json.dumps(new_data))
        print "success"
    else:
        print "error"
    print "-------------------------------------------"

def getText(a, b):
    print a
    print b
    browser.get(a["link"])
    date = browser.find_elements_by_css_selector(".post-header .post-meta")[0].text
    date_formatted = date.split(" ")[0] + " " +  date.split(" ")[1] + " " + date.split(" ")[2]
    author = date.split(" ")[4]
    content = browser.find_elements_by_css_selector(".post-content")[0].text
    a["dateFormatted"] = date_formatted
    a["author"] = author
    a["text"] = content
    a["index"] = b
    upload(a)

def getSpeeches():
    browser.get("http://lbarberiscanoni.github.io/OpenSpeeches/search/")
    speech_title = browser.find_elements_by_css_selector(".list .name a")
    speech_tags = browser.find_elements_by_css_selector(".list .tags")

    linkList = []
    i = 0
    for el in speech_title:
        tags = speech_tags[i].text
        tags = tags.replace("and", "").replace(" ", "").split(",")
        i += 1
        lol = {"title": el.text, "link": el.get_attribute("href"), "categories": tags}
        linkList.append(lol)

    print "done getting the speeches"
    print "-------------"
    a = 0
    for el in linkList:
        a += 1
        getText(el, a)


getSpeeches()
browser.close()
