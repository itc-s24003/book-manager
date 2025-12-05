import { Router } from "express";

import registerRoute from "./register.js";
import loginRoute from "./login.js";
import historyRoute from "./history.js";
import changeRoute from "./change.js";
import { requirePermission } from "../../lib/app/user.js";

const router = Router();


router.use("/register", registerRoute);
router.use("/login", loginRoute);

router.use(requirePermission("user"));

router.use("/history", historyRoute);
router.use("/change", changeRoute);



export default router;