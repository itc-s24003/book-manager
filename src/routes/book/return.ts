import { Router } from "express";
import { validateUUID } from "../../lib/validation.js";
import { validationResult } from "express-validator";
import { db_updateRentalLog, db_getRentalLogById, db_returnRentalLog } from "../../lib/db/rentalLog.js";

const router= Router();


router.put("/",
    validateUUID("id"),

    async (req, res) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ message: val.array().map(v => v.msg).join(", ") });

        const user = req.user!;
        
        const { id } = req.body;

        const db_rental = await db_getRentalLogById(id);

        if (!db_rental.ok) return res.status(500).json({ message: "サーバーエラーが発生しました" });
        const rental = db_rental.data;
        if (!rental) return res.status(400).json({ message: "存在しない貸出記録です" });
        if (rental.userId !== user.id) return res.status(403).json({ message: "他のユーザの貸出書籍です" });
        if (rental.returnedDate) return res.status(409).json({ message: "既に返却済みの貸出記録です" });


        const db_data = await db_returnRentalLog(id, user.id);
        if (!db_data.ok) return res.status(400).json({ message: "返却処理に失敗しました" });

        return res.status(200).json({
            id: db_data.data.id,
            returned_date: db_data.data.returnedDate
        });
    }   
);




export default router;