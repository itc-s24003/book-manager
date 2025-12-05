import { Router } from "express";

import authorRoute from "./author.js";
import publisherRoute from "./publisher.js";


const router = Router();


router.use("/author", authorRoute);
router.use("/publisher", publisherRoute);



export default router;