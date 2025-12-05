import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { db_addUser } from "../../lib/db/user.js";
import { validateEmail, validatePassword, validateString } from "../../lib/validation.js";

const router = Router();

// ユーザ登録
router.post("/",
    // バリデーションチェック
    validateEmail("email"),
    validateString("name"),
    validatePassword("password"),

    // 登録処理
    async (req: Request, res: Response) => {
        const val = validationResult(req);
        if (!val.isEmpty()) return res.status(400).json({ reason: val.array().map(v => v.msg).join(", ") });



        const { email, name, password } = req.body;


        const result = await db_addUser(email, name, password);

        if (result.ok) return res.status(200).json({});

        if (!result.data) return res.status(400).json({ message: "ユーザの登録に失敗しました" });
        const { code, meta } = result.data;
        const target = meta?.target;
        (code === "P2002" && target && target.includes("email")) ?
            res.status(400).json({ message: "そのメールアドレスは既に使用されています" }) :
            res.status(400).json({ message: "ユーザの登録に失敗しました" });


    }
);

export default router;