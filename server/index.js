import express from "express";
import path from "path";
import router from "./research_v1/routes/index.js";
import db from "./research_v1/db/DBcon.js";
import dotenv from 'dotenv';
import nodeMailer from "nodemailer";
import AutoScrap from "./research_v1/scrapping/index.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.API_PORT || 8000 ;
// app.use((req ,res ,next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin , X-Requested-With, Content-Type, Accept');
//     next();

// })
app.use(
    express.json({
        limit: "50mb",
    })
);
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);
app.use(cors())
// let i=0;
// cron.schedule("0 */1 * * * *", () =>{
//     console.log("Layer 1---------------------");
//     ;
//     cron.schedule("*/1 * * * * *",()=>{
//         i++;
//         if(i<20){
//            console.log("Layer 2---------------------", i); 
//         }
//         else{
//             stop();
//         }
//     })
//     i=0
// })


//homepage
app.get('/' ,(req, res)=> {
    
    return res.send({ 
        error: false, 
        massage: 'Welcome to Projectresearch',
        written_by: 'Wichan'
    })
})
app.use(router);
// let transporter = await nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     }
// });
// let mailOption = {
//     from: process.env.GMAIL_USER,
//     to: 'wichansakai@gmail.com , sutita.bowwy@gmail.com',
//     subject: 'test auto send !!!',
//     html: `You got a message from 
//     Email : ${process.env.GMAIL_USER}
//     Name: AAAAAA
//     Message: dwadwadwa`,
//   };
// transporter.sendMail(mailOption, function(err, data) {
// if (err) {
//     console.log("Error " + err);
// } else {
//     console.log("Email sent successfully");
// }
// });

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
AutoScrap.Timescrap(4);

export default app;