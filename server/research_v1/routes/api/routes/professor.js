import express from "express";
import professorController from "../../../controllers/professor.js";
import verifyToken from "../../../middleware/auth.js";
const { Router } = express;
const router = Router({ mergeParams: true });
try {
    router.post('/get-databyadmin',verifyToken, professorController.getdatabyadmin);
    router.get('/get-data',verifyToken, professorController.getdata);
    router.post('/delete-data', verifyToken, professorController.deletedata);
    router.post('/add-professor',  professorController.creatdata);
    router.post('/update-professor',verifyToken, professorController.updatedata);
    router.get('/get-all-data',professorController.getalldata);
    router.get('/get-all-databyadmin',professorController.getalldatabyadmin);
    router.post('/get-data-not-verify', professorController.getdatanotverify);
    router.post('/getskillbyidpro',professorController.getskill);
    router.get('/get-all-skill' ,professorController.getAllskill);
    router.post('/get-qulificationbyidpro', professorController.getqualification);
    router.post('/insert-qulificationbyidpro',verifyToken,professorController.insertqualification);
    router.post('/insert-skillbypro',verifyToken,professorController.insertskill);
    router.post('/del-studtbyidpro',verifyToken,professorController.deletequalificationbyid);
    router.post('/del-skillbyidpro',verifyToken,professorController.deleteskillbyid);
    router.post('/getskilllistbyidskill', professorController.getskilllistbyidskill);
} catch (error) {
    console.log(error)
}



export default router;