import express from "express";
import AuthController from "../../../controllers/auth.js";
import { check, body } from 'express-validator';
import { validationResult } from "express-validator";



const { Router }= express;
const router = Router({ mergeParams: true });
import verifyToken from "../../../middleware/auth.js";
router.use(express.json());

export const signupValidation = [
    check('lastname').not().isEmpty().withMessage("Lastname is requied"),
    check('firstname').not().isEmpty().withMessage("Firstname is requied"),
    check('username').not().isEmpty().withMessage("Username is requied"),
    check('Phone_number').not().isEmpty().withMessage("Phone number is requied"),
    check('Phone_number').isLength({ min: 10 }).withMessage("Phone number must be 10 or more characters"),
    check('email').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage("Please include a valid email"),
    check('password').isLength({ min: 5 }).withMessage("Password must be 5 or more characters")
];
router.post("/login-professor1", AuthController.proLogin1);
router.post("/login-professor", AuthController.proLogin);
router.post("/login-admin", AuthController.adminLogin);
router.post('/register-user', signupValidation ,AuthController.userRegister);
router.post('/login-user', AuthController.userLogin);
router.post('/reset-password', AuthController.resetpassword);
router.post('/change-password',verifyToken, AuthController.changepassword);

export default router;
