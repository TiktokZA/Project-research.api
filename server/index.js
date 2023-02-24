import express from "express";
import path from "path";
import router from "./research_v1/routes/index.js";
import db from "./research_v1/db/DBcon.js";
import dotenv from 'dotenv';
import cron from 'node-cron';
import AutoScrap from "./research_v1/scrapping/index.js";


dotenv.config();
const app = express();

const PORT = process.env.API_PORT || 4000 ;

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


// let i=0;
// cron.schedule("0 */1 * * * *", () =>{
//     console.log("Layer 1---------------------");
//     ;
//     cron.schedule("*/1 * * * * *",()=>{
//         i++;
//         console.log("Layer 2---------------------", i);
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



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})


AutoScrap.setTime();

export default app;