import { Meteor } from 'meteor/meteor'

readline = require('readline')

import '/lib/collections'
import '/lib/tools'

Meteor.methods({
  async fetchStudentTimestamps(dojo, user, password){
    console.log(dojo, user, password)
    const {Browser, Builder, By, Key, until} = require('selenium-webdriver')
    const {Options, ServiceBuilder} = require('selenium-webdriver/chrome')
    let browser = new Builder().forBrowser('chrome')
    // if(Meteor.isProduction){
      let options = new Options()
    //   options.setChromeBinaryPath(process.env.GOOGLE_CHROME_BIN)
      options.addArguments("--headless");
      options.addArguments("--disable-gpu");
      options.addArguments("--no-sandbox");
      const serviceBuilder = new ServiceBuilder(process.env.CHROMEDRIVER_PATH || require('chromedriver').path)
      browser = browser
      .setChromeOptions(options)
      .setChromeService(serviceBuilder)
    // }
    browser = browser.build()
    
    try{
      await browser.get('https://dojo.code.ninja')
      await browser.wait(until.elementLocated(By.css('#signInName')))
      await browser.findElement(By.css('#signInName')).sendKeys(user)
      await browser.findElement(By.css('#password')).sendKeys(password)
      await browser.findElement(By.css('#next')).click()
      await browser.wait(until.urlIs('https://dojo.code.ninja/students/cn-ut-lehi/'), 5000, 'login failed')
      console.log('logged in')
      await browser.get('https://dojo.code.ninja/students/codetreksredirect/redirecttosenseigrading/')
      await browser.wait(until.urlIs('https://gdp.code.ninja/Grading'))
      await browser.get(`https://gdp.code.ninja/Grading/?pageNum=1&pageSize=999999&includeGraded=true&slug=${dojo}&searchCriteria=All`)
      let page = await browser.findElement(By.css('.games-table>tbody')).getAttribute('innerText')
      browser.quit()
      return page
    }catch(err){
      if(err.message.includes('login failed')){
        err.message = (await Promise.all((await browser.findElements(By.css('.error[style="display: block;"]'))).map(a=>a.getText())))
        console.log('login failed')
      }else{
        console.log(err)
      }
      browser.quit()
      throw new Meteor.Error(err.message ? err.message.join('\n').toLowerCase() : JSON.stringify(err))
    }
  }
})

Meteor.onConnection(connection=>{
  console.log('New Client Connection:', connection.clientAddress)
})
