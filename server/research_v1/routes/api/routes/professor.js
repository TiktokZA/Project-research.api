import express from "express";
import professorController from "../../../controllers/professor.js";
import verifyToken from "../../../middleware/auth.js";
const { Router } = express;
const router = Router({ mergeParams: true });


router.get('/get-data',verifyToken, professorController.getdata);
router.get('/delete-data', verifyToken, professorController.deletedata);
router.post('/add-professor',  professorController.creatdata);
router.post('/update-professor',verifyToken, professorController.updatedata);


export default router;