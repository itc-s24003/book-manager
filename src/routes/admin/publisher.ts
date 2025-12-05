import { Router } from "express";
import { validationResult } from "express-validator";
import prisma from "../../lib/db.js";
import { db_addPublisher, db_deletePublisher, db_renamePublisher } from "../../lib/db/publisher.js";
import { validateString, validateUUID } from "../../lib/validation.js";

const router = Router();

// Register publisher
router.post("/",
    validateString("name"),

    async (req, res) => {

        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const { name } = req.body;

        const db_data = await db_addPublisher(name);
        
        if (!db_data.ok) return res.status(400).json({ message: "出版社の登録に失敗しました" });

        return res.status(200).json({
            id: db_data.data.id,
            name: db_data.data.name
        });
    }


).put("/",
    validateUUID("id"),
    validateString("name"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const { id, name } = req.body;

        const db_data = await db_renamePublisher(id, name);

        if (!db_data.ok) {
            if (db_data.data?.code === "P2025") return res.status(400).json({ message: "存在しない出版社です" });
            return res.status(400).json({ message: "出版社の更新に失敗しました" });
        }

        return res.status(200).json({
            id: db_data.data.id,
            name: db_data.data.name
        });
    }


).delete("/",
    validateUUID("id"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });


        const { id } = req.body;

        const db_data = await db_deletePublisher(id);

        if (!db_data.ok) {
            if (db_data.data?.code === "P2025") return res.status(400).json({ message: "存在しない出版社です" });
            return res.status(400).json({ message: "出版社の削除に失敗しました" });
        }

        return res.status(200).json({ message: "出版社を削除しました" });
    }
);

export default router;
