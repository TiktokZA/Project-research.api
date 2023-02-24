import browserObject from "./browser.js";
import scrapeAll from "./pageController.js";
// import db from "../db/DBcon.js";

let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller


scrapeAll(browserInstance);

