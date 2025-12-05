import { Router } from "express";
import { validationResult } from "express-validator";
import { validateString } from "../../lib/validation.js";
import { db_renameUser } from "../../lib/db/user.js";

const router = Router();


router.put("/",
    validateString("name"),
    
    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ reason: val.array().map(v => v.msg).join(", ") });
        
        const user = req.user;

        const db_data = await db_renameUser(user!.id, req.body.name);
        if (!db_data.ok) {
            if (db_data.data?.code === "P2025") return res.status(404).json({ message: "存在しないユーザーです" });
            return res.status(500).json({ message: "サーバーエラーが発生しました" });
        }

        res.json({ message: "更新しました" });
    }
)



export default router;