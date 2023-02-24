import express from "express";
import path from "path";
import router from "./research_v1/routes/index.js";
import db from "./research_v1/db/DBcon.js";
import dotenv from 'dotenv';


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

export default app;