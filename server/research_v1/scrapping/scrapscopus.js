import puppeteer from "puppeteer";

// class Scrapping {


// }
const scholarscrap = async () =>{
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({headless : false});
        const page = await browser.newPage();
        await page.goto('https://scholar.google.com/',{waitUntil: 'networkidle2'});
        await page.type('#gs_hdr_tsi.gs_in_txt.gs_in_ac', 'Sathit Prasomphan');
        await page.keyboard.press('Enter');
        await page.waitForNavigation();


        
        // await page.click('#gs_hdr_tsb');
        // await page.waitForNavigation();
        // await page.screenshot({path: 'cat1.png'});
        // await page.type('input.gLFyf', 'Sathit Prasomphan');
        // await page.keyboard.press('Enter');
        // await page.click('input.gNO89b');
        // await page.waitForSelector('#gs_res_ccl_mid > div:nth-child(1)');
        await page.waitForNavigation();
        await page.screenshot({path: 'cat1.png'});





        // await browser.close();
    } catch (error) {
        console.log("Could not create a browser instance => : ", error);
    }
    
}

scholarscrap();