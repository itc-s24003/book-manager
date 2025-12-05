import { Router } from "express";
import { validationResult } from "express-validator";
import prisma from "../../lib/db.js";
import { db_addAuthor, db_deleteAuthor, db_renameAuthor } from "../../lib/db/author.js";
import { validateString, validateUUID } from "../../lib/validation.js";

const router = Router();


router.post("/", // Register author
    validateString("name"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });


        // Registration process
        const { name } = req.body;

        const db_data = await db_addAuthor(name);

        if (!db_data.ok) {
            if (!db_data.data) return res.status(400).json({ message: "作者の登録に失敗しました" });
            const { code, meta } = db_data.data;
            const target = meta?.target;
            if (code === "P2002" && target && target.includes("name")) return res.status(400).json({ message: "同名の著者が既に存在します" });

            return res.status(400).json({ message: "著者の登録に失敗しました" });
        }

        const author = db_data.data;
        return res.status(200).json({
            id: author.id,
            name: author.name
        });
    }


).put("/", // Update author name
    validateUUID("id"),
    validateString("name"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const { id, name } = req.body;

        // Update process
        const db_data = await db_renameAuthor(id, name);

        if (!db_data.ok) {
            if (db_data.data?.code === "P2025") return res.status(400).json({ message: "存在しない著者です" });
            return res.status(400).json({ message: "著者の更新に失敗しました" });
        }
        
        const author = db_data.data;
        return res.status(200).json({
            id: author.id,
            name: author.name
        });
    }


).delete("/", // Delete author
    validateUUID("id"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const { id } = req.body;

        // Delete process
        const db_data = await db_deleteAuthor(id);

        if (!db_data.ok) {
            if (db_data.data?.code === "P2025") return res.status(400).json({ message: "存在しない著者です" });
            return res.status(400).json({ message: "著者の削除に失敗しました" });
        }


        return res.status(200).json({ message: "削除しました" });
    }


);

export default router;
