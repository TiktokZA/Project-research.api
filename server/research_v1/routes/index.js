import express from "express";
import routes from "./api/routes/index.js";

const { Router } = express;
const router = Router({ mergeParams: true });

router.use(
    '/api',
    (req, res, next) => {
		console.log(`REQ: ${req.method} ${req.url}`);
		next();
	},
	routes
);

export default router;