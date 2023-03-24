import pageScraper from "./pageScraper.js";
// import db from "../db/DBcon.js";
import nodeMailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

const transporter = await nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
});
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
    static email =[
        'akara.p@sci.kmutnb.ac.th',
        'luepol.p@sci.kmutnb.ac.th',
        'tanapat.a@sci.kmutnb.ac.th',
        'prachyaporn.l@sci.kmutnb.ac.th',
        'suwatchai.k@sci.kmutnb.ac.th',
        'khantharata@kmutnb.ac.th',
        'nikorn.s@sci.kmutnb.ac.th',
        'nontakorn.s@sci.kmutnb.ac.th',
        'gridaphat.s@sci.kmutnb.ac.th',
        'kobkiat.s@sci.kmutnb.ac.th',
        'porawat.v@sci.kmutnb.ac.th',
        'benchaphon.l@sci.kmutnb.ac.th',
        'chaibwoot.r@sci.kmutnb.ac.th',
        'sathit.p@sci.kmutnb.ac.th',
        'earn.s@sci.kmutnb.ac.th',
        'nuttawut.s@sci.kmutnb.ac.th',
        'anusorn.w@sci.kmutnb.ac.th',
        'yonchanok.k@sci.kmutnb.ac.th',
        'san.r@sci.kmutnb.ac.th',
        'thattapon.s@sci.kmutnb.ac.th',
        'nattagit.j@sci.kmutnb.ac.th',
        'apisit.r@sci.kmutnb.ac.th'
    ];
    static scrapeScholar = async function (browserInstance , keyword , i){
        let browser;
        try{
            browser = await browserInstance;
            let data = await pageScraper.scrapScholar1(browser,keyword );
            // console.log("data=>", data.data)
            let DATA = data[0].data;
            let transporter = await nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
            });
            let message = (
                '<table style="border: 1px solid black;">' +
                '<thead>' +
                '<th> Title</th>' +
                '<th> Publication_date </th>'  +
                '<th> Conference&Jornal </th>'  +
                '<th> Type </th>'  +
                '<th> Citation </th>'  +
                '<th> Author </th>'  +
                '<th> Link </th>'  +
                '</thead>'
            ); 
            for(let i=0;i< DATA.length;i++) {
                message += (
                  '<tr>' +
                   '<td>' + DATA[i].Title + '</td>' +
                   '<td>' + DATA[i].Publication_date + '</td>' +
                   '<td>' + DATA[i].Conference + '</td>' +
                   '<td>' + DATA[i].Type + '</td>' +
                   '<td>' + DATA[i].Citation + '</td>' +
                   '<td>' + DATA[i].Author + '</td>' +
                   '<td>' + DATA[i].article + '</td>' +
                 '</tr>'
                );
            }
            message +=  '</table>';

            let mailOption = {
                from: process.env.GMAIL_USER,
                to: `${email[i]}`,
                subject: 'auto scraping we can scraping you research',
                html: `You got a message from 
                Email : ${process.env.GMAIL_USER}
                Name Keyword: ${keyword}<br>
                DATA : ${message}
                `,
            };
            transporter.sendMail(mailOption, function(err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });
           
        }
        catch(err){
            let transporter = await nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                }
                });

                let mailOption = {
                    from: process.env.GMAIL_USER,
                    to: `${email[i]}`,
                    subject: 'test auto send !!!',
                    html: `You got a message from 
                    Email : ${process.env.GMAIL_USER}
                    Name Keyword: ${keyword} <br><br>
                    <h3 style="color:red;">Scraping error!!</h3>
                    
                    `,
                };
                transporter.sendMail(mailOption, function(err, data) {
                    if (err) {
                        console.log("Error " + err);
                    } else {
                        console.log("Email sent successfully");
                    }
                });
            console.log("Could not resolve the browser instance => ", err);
        }
        await browser.close();
    }
    static scrapeScopus = async function (browserInstance , keyword){
        let browser;
        try{
            browser = await browserInstance;
            let data = await pageScraper.scrapScopus(browser,keyword);
            let DATA = data[0].data;
            let transporter = await nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
            });
            let message = (
                '<table style="border: 1px solid black;">' +
                '<thead>' +
                '<th> Title</th>' +
                '<th> Publication_date </th>'  +
                '<th> Conference&Jornal </th>'  +
                '<th> Type </th>'  +
                '<th> Citation </th>'  +
                '<th> Link </th>'  +
                '</thead>'
            ); 
            for(let i=0;i< DATA.length;i++) {
                message += (
                  '<tr>' +
                   '<td>' + DATA[i].Title + '</td>' +
                   '<td>' + DATA[i].Year + '</td>' +
                   '<td>' + DATA[i].Conference + '</td>' +
                   '<td>' + DATA[i].Type + '</td>' +
                   '<td>' + DATA[i].Citation + '</td>' +
                   '<td>' + DATA[i].Link + '</td>' +
                 '</tr>'
                );
            }
            message +=  '</table>';

            let mailOption = {
                from: process.env.GMAIL_USER,
                to: `${email[i]}`,
                subject: 'auto scraping we can scraping you research',
                html: `You got a message from 
                Email : ${process.env.GMAIL_USER}
                Name Keyword: ${keyword}<br>
                DATA : ${message}
                `,
            };
            transporter.sendMail(mailOption, function(err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });
        }
        catch(err){
            let transporter = await nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                }
                });

                let mailOption = {
                    from: process.env.GMAIL_USER,
                    to: `${email[i]}`,
                    subject: 'test auto send !!!',
                    html: `You got a message from 
                    Email : ${process.env.GMAIL_USER}
                    Name Keyword: ${keyword} <br><br>
                    <h3 style="color:red;">Scraping error!!</h3>
                    
                    `,
                };
                transporter.sendMail(mailOption, function(err, data) {
                    if (err) {
                        console.log("Error " + err);
                    } else {
                        console.log("Email sent successfully");
                    }
                });
            console.log("Could not resolve the browser instance => ", err);
        }
        await browser.close();
    }
    static scrapeCIS = async function (browserInstance){
        let browser;
        try{
            browser = await browserInstance;
            await pageScraper.scrapCIS(browser);
            await browser.close();
        }
        catch(err){
            console.log("Could not resolve the browser instance => ", err);
        }
    }
}

// export default (browserInstance) => scrapeAll(browserInstance)
export default Scrapcontroller;