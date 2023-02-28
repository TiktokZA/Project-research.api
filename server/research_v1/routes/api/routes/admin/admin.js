import express from "express";
import adminController from "../../../../controllers/admin/admin.js";
import verifyToken from "../../../../middleware/auth.js";


const { Router } = express;
const router = Router({ mergeParams: true });

router.get('/get-data', adminController.getlistadmin);
router.post('/settime',verifyToken, adminController.settimescrap);
router.post('/welcome' , verifyToken , (req,res)=> {
    res.status(200).send({Title :"welcome",data: req.user })
})

export default router;