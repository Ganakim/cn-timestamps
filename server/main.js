import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

readline = require('readline')

import '/lib/collections'
import '/lib/tools'
import { Options } from 'selenium-webdriver/edge'

const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://cn-reports-access:YPGDrwzTW46PLHo9@cluster0.dgqif.mongodb.net/CN-DB?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

Meteor.startup(()=>{
  
})

Meteor.methods({
  serverDebug(){
    return debug
  },
  checkGDP(userID){
    const user = Meteor.users.findOne(userID)
    const createProgram = Programs.findOne({gdpCreate:true})
    if(createProgram._id && user.grades?.[createProgram._id]?.active && Object.keys(user.grades[createProgram._id].projects || {}).length){
      const userName = `${user.fName.trim()}${user.mName.trim() ? ` ${user.mName.trim()}` : ''} ${user.lName.trim()}`.toLowerCase()
      const dojoName = Dojos.findOne(user.dojo).location.replace(' ', '-').toLowerCase()
      const driverPath = require('chromedriver').path
      const {Browser, Builder, By, Key, until} = require('selenium-webdriver');
      const {Options, ServiceBuilder} = require('selenium-webdriver/chrome');
      let browser = new Builder().forBrowser(Browser.CHROME, '94')
      if(Meteor.isProduction){
        let options = new Options()
        options.setChromeBinaryPath(process.env.GOOGLE_CHROME_BIN);
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--no-sandbox");
        const serviceBuilder = new ServiceBuilder(process.env.CHROMEDRIVER_PATH);
        browser = browser
        .setChromeOptions(options)
        .setChromeService(serviceBuilder)
      }
      browser = browser.build();
  
      browser.get('https://dojo.code.ninja')
      .then(()=>browser.wait(until.elementLocated(By.css('#signInName'))))
      .then(()=>browser.findElement(By.css('#signInName')))
      .then(usernameBox=>usernameBox.sendKeys(process.env.gradingEmail))
      .then(()=>browser.findElement(By.css('#password')))
      .then(passwordBox=>passwordBox.sendKeys(process.env.gradingPwd))
      .then(()=>browser.findElement(By.css('#next')))
      .then(signInBtn=>signInBtn.click())
      .then(()=>console.log('Successfully signed into the dojo!'))
      .then(()=>browser.wait(until.elementLocated(By.css('.logout-area>#logoutForm'))))
      .then(()=>browser.get('https://dojo.code.ninja/students/codetreksredirect/redirecttosenseigrading/'))
      .then(()=>browser.wait(until.elementLocated(By.css('#grading-section'))))
      .then(()=>browser.get(`https://gdp.code.ninja/Grading/?pageNum=1&pageSize=99999&includeGraded=true&slug=cn-ut-${dojoName}&searchCriteria=All&searchTerm=${userName}`))
      .then(()=>browser.wait(until.elementLocated(By.css('.games-table>tbody'))))
      .then(async ()=>{
        const grades = Object.entries(user.grades[createProgram._id].projects).map(([belt, projects])=>Object.entries(projects).map(([projectID, grade])=>{
          let projectData = Projects.findOne(projectID)
          let beltName = createProgram.delimiters[belt].name
          let project = {
            name: '',
            gdpName: projectData.gdpName,
            status: grade.status,
            note: grade.note
          }
          if(!project.gdpName){
            project.name = `^${belt ? `${beltName} v\\d - ` : `the fundamentals - `}`
            if(belt == 1 || (belt == 2 && projectData.type != 'proveYourself')){
              project.name += '\\d\\d-\\d\\d '
            }
            if(belt && [1, 2, 5].includes(belt) && projectData.type == 'proveYourself'){
              project.name += 'prove yourself - '
            }
            if(belt == 6 && projectData.type == 'proveYourself'){
              project.name += 'py - '
            }
            project.name += `${projectData.name.replace(/pt\. (\d)/, 'part $1').replace('?', '\\?')}$`
          }
          if(!project.note){
            delete project.note
          }
          if(!project.name){
            delete project.name
          }
          if(!project.gdpName){
            delete project.gdpName
          }
          return project
        })).flat()
        var elements = await browser.findElements(By.css('.games-table>tbody>tr'))
        audit(0)
        async function audit(i){
          let e = elements[i]
          let name = (await e.findElement(By.css('td:nth-child(3)')).getAttribute('textContent')).trim()
          let graded = (await e.getAttribute('class')).includes('graded')
          let status = (await e.findElement(By.css('.col-stars-earned i:nth-child(3)')).getAttribute('class')).includes('fa-star-o') ? 'incomplete' : 'complete'
          let uts = await e.getAttribute('data-uts')
          let newGrade = grades.find(g=>g.gdpName ? g.gdpName == name : new RegExp(g.name, 'i').test(name))
          if(newGrade){
            console.log('Auditing:', name)
            if(newGrade.status == 'complete'){
              if(!graded || status == 'incomplete'){
                try{
                  gradeComplete(e)
                }catch(err){
                  console.log('Could not mark project:', name, 'complete:', err)
                }
              }else{
                console.log('already good')
              }
            }else{
              if(status == 'complete'){
                console.log('Already marked complete:', name, uts)
              }else if(!graded){
                try{
                  gradeIncomplete(e, newGrade.note)
                }catch(err){
                  console.log('Could not mark project:', name, 'incomplete:', err)
                }
              }else{
                console.log('already incomplete and good')
              }
            }
            setTimeout(()=>{
              if(elements[i+1]){
                audit(i+1)
              }else{
                console.log('Done!')
                browser.close()
              }
            }, 1500)
          }else{
            if(elements[i+1]){
              audit(i+1)
            }else{
              console.log('Done!')
              browser.close()
            }
          }
        }
        function gradeComplete(element){
          element.click()
          .then(()=>{
            setTimeout(()=>{
              browser.executeScript(`
                document.getElementById("IsIncomplete").value = false;
                document.getElementById("StarsEarned").value = 3;
                document.getElementById("GradingNotes").value = "";
                document.querySelectorAll("#grade-form>button[type='submit']")[0].click();
              `)
              .catch(err=>{
                throw err
              })
            }, 1000)
          })
          .catch(err=>{
            throw err
          })
        }
        function gradeIncomplete(element, note){
          element.click()
          .then(()=>{
            setTimeout(()=>{
              browser.executeScript(`
                document.getElementById("IsIncomplete").value = true;
                document.getElementById("GradingNotes").value = "${note}";
                document.querySelectorAll("#grade-form>button[type='submit']")[0].click();
              `)
              .catch(err=>{
                throw err
              })
            }, 1000)
          })
          .catch(err=>{
            throw err
          })
        }
        function grade(i){
          var project = info.projects[i]
          var found = false
          var j = 0
          for(var gdpProject of scrubbedProjects){
            var regexName = `^${project.delimiter ? `${project.delimiterName} v\\d - ` : `the fundamentals - `}`
            if(project.delimiter == 1 || (project.delimiter == 2 && project.type != 'proveYourself')){
              regexName += '\\d\\d-\\d\\d '
            }
            if(project.delimiter && [1, 2, 5].includes(project.delimiter) && project.type == 'proveYourself'){
              regexName += 'prove yourself - '
            }
            if(project.delimiter == 6 && project.type == 'proveYourself'){
              regexName += 'py - '
            }
            regexName += `${project.name.replace(/pt\. (\d)/, 'part $1').replace('?', '\\?')}$`
            if(project.gdpName ? project.gdpName == gdpProject.project : new RegExp(regexName, 'i').test(gdpProject.project)){
              found = true
              console.log(i, j, project, gdpProject.uts, new RegExp(regexName, 'i'), gdpProject)
              projects[j].click()
              .then(()=>{
                setTimeout(()=>{
                  console.log('Executing grading script')
                  browser.executeScript(project.status == 'complete' ? `
                    document.getElementById("IsIncomplete").value = false;
                    document.getElementById("StarsEarned").value = 3;
                    document.getElementById("GradingNotes").value = "";
                    document.querySelectorAll("#grade-form>button[type='submit']")[0].click();
                    ` : `
                    document.getElementById("IsIncomplete").value = true;
                    document.getElementById("GradingNotes").value = "${project.note}";
                    document.querySelectorAll("#grade-form>button[type='submit']")[0].click();
                  `)
                  .then(()=>browser.sleep(1000))
                  .catch(err=>{
                    console.log('Could not execute script on target:', err)
                  })
                  .finally(()=>{
                    console.log('Grade Submitted!')
                    browser.quit()
                  })
                }, 1000)
              })
              .catch(()=>{
                console.log('Could not open project:', gdpProject)
                browser.quit()
              })
            }
            j++
          }
          if(!found){
            console.log('Could not find project:', project.gdpName || project.name, 'for:', user)
          }
        }
      })
      .catch(err=>{
        console.log('Error ', err, ' occurred!')
      })
    }
  },
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
      throw new Meteor.Error(err.message.join('\n').toLowerCase())
    }
  }
})

Meteor.onConnection(connection=>{
  console.log('New Client Connection:', connection.clientAddress)
})
