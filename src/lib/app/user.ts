import { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.isAdmin) return next();

    res.status(403).json({message: "管理者権限が必要です"});
}



type PermissionErrorResponseOptions = {
    /** Function to customize response when not logged in */
    notLoggedInResponse?: (res: Response) => void;
    /** Function to customize response when permission is insufficient */
    insufficientPermissionResponse?: (res: Response) => void;
}


/**
 * Returns a user permission check function for use as Express middleware
 * @param level 
 * @returns 
 */
export function requirePermission(level: "user" | "admin", options: PermissionErrorResponseOptions = {}) {
    const {
        notLoggedInResponse = (res: Response) => res.status(401).json({ message: "ログインが必要です" }),
        insufficientPermissionResponse = (res: Response) => res.status(403).json({ message: "権限が不足しています" })
    } = options;


    return async (req: Request, res: Response, next: NextFunction) => {
        const sessionUser = req.user;
        if (!sessionUser) return notLoggedInResponse(res);

        if (level === "user") return next();

        if (sessionUser?.isAdmin) return next();

        return insufficientPermissionResponse(res);
    }
}
