import { Router } from "express";
import { validateString } from "../../lib/validation.js";
import { validationResult } from "express-validator";
import { db_getAuthorsByNameKeyword } from "../../lib/db/author.js";

const router = Router();


router.get("/",
    validateString("keyword"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const { keyword } = req.body;

        const db_data = await db_getAuthorsByNameKeyword(keyword);

        if (!db_data.ok) return res.status(400).json({ message: "著者の検索に失敗しました" });

        const authors = db_data.data;
        return res.status(200).json({ authors });
    }
);


export default router;
