import express from "express";
import adminController from "../../../../controllers/admin/admin.js";
import verifyToken from "../../../../middleware/auth.js";


const { Router } = express;
const router = Router({ mergeParams: true });

try {
    router.get('/get-data', adminController.getlistadmin);
    router.post('/settime',verifyToken, adminController.settimescrap);
    router.get('/get-timescrap',verifyToken,adminController.gettimescrap)
    router.get('/get-databyid',verifyToken ,adminController.getdataadmin);
} catch (error) {
    console.log(error)
}



router.post('/welcome' , verifyToken , (req,res)=> {
    res.status(200).send({Title :"welcome",data: req.user })
})

export default router;