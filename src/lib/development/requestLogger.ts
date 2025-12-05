import { NextFunction, Request, Response } from "express";
import { env_config } from "../../evn.config.js";

export async function logRequest(req: Request, res: Response, next: NextFunction) {
    next();
}