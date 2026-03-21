import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { getDashboardOverview } from '../controllers/dashboard.controller.js';

const dashboardRouter = express.Router();

dashboardRouter.get("/" , authMiddleware , getDashboardOverview);

export default dashboardRouter;