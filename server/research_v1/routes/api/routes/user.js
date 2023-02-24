import express from "express";
import UserController from "../../../controllers/User.js";
import verifyToken from "../../../middleware/auth.js";
const { Router } = express;
const router = Router({ mergeParams: true });

router.post('/update-data',verifyToken, UserController.updatedata);



export default router;

