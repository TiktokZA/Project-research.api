import express from "express";
import researchController from "../../../controllers/research.js";

const { Router } = express;
const router = Router({ mergeParams: true });

router.get('/get-all', researchController.getallresearch);
router.post('/search-keyword', researchController.searchkeyword);
router.post('/search-keyword-professor', researchController.searchkeywordprofessor);
router.post('/search-keyword-research', researchController.searchkeywordresearch);

export default router;
