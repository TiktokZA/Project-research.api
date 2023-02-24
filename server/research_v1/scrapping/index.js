import browserObject from "./browser.js";
import Scrapcontroller from "./pageController.js";
import cron from 'node-cron';

const AutoScrap = {
    async setTime(){
        let i=0;
        const keyword = Scrapcontroller.keyword;
        console.log("Time counting.....");
        cron.schedule("0 0 */15 * *",()=>{
            cron.schedule("*/2 * * * *",()=>{
                if(i < keyword.length){
                    let browserInstance = browserObject.startBrowser();
                    Scrapcontroller.scrapeScholar(browserInstance, keyword[i]);
                    Scrapcontroller.scrapeScopus(browserInstance, keyword[i]);
                    i++;
                    browserInstance.close();
                }
            });
            i=0;
        });
    }
}


export default AutoScrap;



