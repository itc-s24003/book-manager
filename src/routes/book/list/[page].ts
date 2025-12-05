import { Router } from "express";
import prisma from "../../../lib/db.js";
import { db_getBooks } from "../../../lib/db/book.js";
import { validateParamInt } from "../../../lib/validation.js";
import { validationResult } from "express-validator";

const router = Router();

router.get("/:page",
    validateParamInt("page", { min: 1 }),
    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const page = parseInt(req.params!.page);
        const itemsPerPage = 5;
        const skip = (page - 1) * itemsPerPage;

        // Get total book count
        const totalBooks = await prisma.book.count({
            where: { isDeleted: false }
        }).catch(() => NaN);
        const lastPage = Math.ceil(totalBooks / itemsPerPage);

        const db_data = await db_getBooks(skip, itemsPerPage);

        if (!db_data.ok) return res.status(500).json({ message: "サーバーエラーが発生しました" });
        if (!db_data.data) return res.status(404).json({ message: "書籍が見つかりません" });

        // Format response
        const response = {
            current: page,
            last_page: lastPage,
            books: db_data.data.map(book => ({
                isbn: Number(book.isbn),
                title: book.title,
                author: {
                    name: book.author.name
                },
                publication_year_month: `${book.publicationYear}-${String(book.publicationMonth).padStart(2, '0')}`
            }))
        };

        return res.status(200).json(response);
    }
);



export default router;