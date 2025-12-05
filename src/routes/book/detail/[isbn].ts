import { Router } from "express";
import prisma from "../../../lib/db.js";
import { param, validationResult } from "express-validator";
import { validateParamISBN } from "../../../lib/validation.js";
import { db_getBookDetail } from "../../../lib/db/book.js";

const router = Router();

router.get("/:isbn",
    validateParamISBN("isbn"),
    
    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });


        const isbn = parseInt(req.params!.isbn);
        
        const db_data = await db_getBookDetail(isbn);

        if (!db_data.ok) return res.status(500).json({ message: "サーバーエラーが発生しました" });
        if (!db_data.data) return res.status(404).json({ message: "書籍が見つかりません" });

        const book = db_data.data;
        return res.status(200).json({
            isbn: Number(book.isbn),
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publication_year_month: `${book.publicationYear}-${String(book.publicationMonth).padStart(2, '0')}`
        });
    }
);



export default router;