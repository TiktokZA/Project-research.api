import express from "express";
import researchController from "../../../controllers/research.js";
import verifyToken from "../../../middleware/auth.js";

const { Router } = express;
const router = Router({ mergeParams: true });

router.get('/get-all', researchController.getallresearch);
router.get('/get-all-orderbyyear', researchController.getallresearchorderyear);
router.post('/search-keyword', researchController.searchkeyword);
router.post('/search-keyword-professor', researchController.searchkeywordprofessor);
router.post('/search-keyword-research', researchController.searchkeywordresearch);
router.post('/getresearch' ,researchController.getresearch);
router.get('/getskill' ,researchController.getallskill);
router.post('/getresearch-idpro',researchController.getresearchbyidpro);
router.post('/getresearchbypro',researchController.getresearchbypro);
router.post('/del-researchbypro',verifyToken,researchController.deleteresearchbyidpro);
router.post('/insert-researchbypro',verifyToken,researchController.insertresearchbyidpro)
export default router;
