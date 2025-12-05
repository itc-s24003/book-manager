import { Router } from "express";

import { requirePermission } from "../../lib/app/user.js";
import authorRoute from "./author.js";
import bookRoute from "./book.js";
import publisherRoute from "./publisher.js";

const router = Router();

router.use(requirePermission("admin"));


router.use("/author", authorRoute);
router.use("/book", bookRoute);
router.use("/publisher", publisherRoute);


export default router;