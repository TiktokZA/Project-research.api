import express from 'express';
import professorRoute from './professor.js';
import adminRoute from './admin/admin.js';
import authRoute from './auth.js';
import userRoute from './user.js';
import researchRoute from './research.js';


const { Router } = express;
const router = Router();

router.use('/professor', professorRoute);
router.use('/admin', adminRoute);
router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/search', researchRoute);


export default router;