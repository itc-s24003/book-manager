import { Router } from "express";

import bookListRoute from "./list/[page].js";
import bookDetailRoute from "./detail/[isbn].js";

import { requirePermission } from "../../lib/app/user.js";

import rentalRoute from "./rental.js";
import returnRoute from "./return.js";


const router = Router();

router.use("/list", bookListRoute);
router.use("/detail", bookDetailRoute);


router.use(requirePermission("user"));


router.use("/rental", rentalRoute);
router.use("/return", returnRoute);



export default router;