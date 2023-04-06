import browserObject from "./browser.js";
import Scrapcontroller from "./pageController.js";
import { CronJob } from "cron";

var job;
var job1 ;
var time ;
const AutoScrap = {
    async Timescrap(indext){
        let i=0;
        time = indext;
        const keyword = Scrapcontroller.keyword;
        
        
        let strtime = [
            // "*/1 * * * *",
            //ทุก 3 ชม index 0
            "0 */3 * * *",
            //At 00:00 on every day-of-month. index 1
            "0 0 */1 * *",
            //At 00:00 on every 3rd day-of-month. index 2
            "0 0 */3 * *",
            //At 00:00 on Sunday. index 3
            "0 0 * * 7",
            //ทุกๆ15วัน index 4
            "0 0 */15 * *",
            //วันที่1ของทุกเดือน index 5
            "0 0 1 */1 *",
            //วันที่1ของทุก 3 เดือน index 6
            "0 0 1 */3 *",

        ];

        if (job || indext == 10) {
            job.stop();
        }
        job = new CronJob(strtime[indext],()=>{
            console.log("Time counting.....");
            job1 = new CronJob("*/2 * * * *",async ()=>{
                if(i < keyword.length){
                    let browserInstance1 = browserObject.startBrowser();
                    await Scrapcontroller.scrapeScholar(browserInstance1, keyword[i] , i);
                    let browserInstance2 = browserObject.startBrowser();
                    await Scrapcontroller.scrapeScopus(browserInstance2, keyword[i] , i);
                    i++;
                }else{
                    job1.stop();
                }
            });
            job1.start();
            i=0;
        });
        job.start();
        console.log("update time job....");

        // let j=0;
        // let strtime1 = [
        //     "0 */1 * * * *",
        //     "0 */2 * * * *",
        //     "*/30 * * * * *",
        // ];
        // if (job) {
        //     job1.stop();
        //     job.stop();
        // }
        // job = new CronJob(strtime1[indext], () =>{
        //     console.log("Layer 1---------------------",i);
        //     i++;
        //     job1 =new CronJob("*/1 * * * * *", ()=>{
        //         if(j < 20){
        //             console.log("Layer 2---------------------",j);
        //             j++;
                    
        //         }else{
                    
        //             job1.stop();
        //         }
                
        //     });
        //     job1.start();
        //     j=0;
        // });
        // job.start()
        // console.log("update time job....")
    }
}
export function gettimescrap() {
    let msg = "";
    console.log("time => ",time)
    // if(time == 0 )
    switch (time) {
        case 0:
          msg ="At minute 0 past every 3rd hour."
          break;
        case 1:
            msg ="At 00:00 on every day-of-month"

          break;
        case 2:
            msg ="At 00:00 on every 3rd day-of-month"

          break;
        case 3:
            msg ="At 00:00 on Sunday"

          break;
        case 4:
            msg ="At 00:00 on every 15th day-of-month."

          break;
        case 5:
            msg ="At 00:00 on day-of-month 1 in every month."

            break;
        case 6:
            msg ="At 00:00 on day-of-month 1 in every 3rd month."

            break;
        default:
          msg=""
          break;
    }
    return msg;  
}


export default AutoScrap;

// let browserInstance1 = browserObject.startBrowser();
// let i=1;
// const keyword = Scrapcontroller.keyword;
// await Scrapcontroller.scrapeScholar(browserInstance1, keyword[i] ,i);
// let browserInstance2 = browserObject.startBrowser();
// await Scrapcontroller.scrapeScopus(browserInstance2, keyword[i]);

// let browserInstance2 = browserObject.startBrowser();
// await Scrapcontroller.scrapeCIS(browserInstance2);

