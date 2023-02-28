import pageScraper from "./pageScraper.js";
// import db from "../db/DBcon.js";

class Scrapcontroller {
    static keyword =[
        "Akara Prayote",
        "Luepol Pipanmekaporn",
        "Tanapat Anusasamornkul",
        "Prachyaporn Liangsutthisakon",
        "Suwatchai Kamonsantiroj",
        "Khantharat Anekboon",
        "Nikorn Sutthisangiam",
        "Nontakorn Sathitanon",
        "Gridaphat Sriharee",
        "Kobkiat Saraubon",
        "Porawat Visutsak",
        "Benchaphon Limthanmaphon",
        "Chiabwoot Ratanavilisagul",
        "Sathit Prasomphan",
        "Earn Suriyachay",
        "Nuttawut Sroidokson",
        "Anusorn Wongsanit",
        "Yonchanok khaokaew",
        "San Ratanasanya",
        "Thattapon Surasak",
        "Nattagit Jiteurtragool",
        "Apisit Rattanatranurak"
    ];
    static scrapeScholar = async function (browserInstance , keyword){
        let browser;
        try{
            browser = await browserInstance;
            await pageScraper.scrapScholar1(browser,keyword );
            await browser.close();
        }
        catch(err){
            console.log("Could not resolve the browser instance => ", err);
        }
    }
    static scrapeScopus = async function (browserInstance , keyword){
        let browser;
        try{
            browser = await browserInstance;
            await pageScraper.scrapScopus(browser,keyword);
            await browser.close();
        }
        catch(err){
            console.log("Could not resolve the browser instance => ", err);
        }
    }
}

// export default (browserInstance) => scrapeAll(browserInstance)
export default Scrapcontroller;