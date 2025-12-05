import { app } from "./server/index.js";
import { env_config } from "./evn.config.js";
import type { Request, Response, NextFunction } from "express";

// Routes
import userRoute from "./routes/user/index.js";
import adminRoute from "./routes/admin/index.js";
import bookRoute from "./routes/book/index.js";
import searchRoute from "./routes/search/index.js";

// Middleware
import { logRequest } from "./lib/development/requestLogger.js";

// Request logging
app.use(logRequest);

// API Routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/book", bookRoute);
app.use("/search", searchRoute);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: "Not Found",
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// centralized error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";

    if (env_config.SHOW_DB_ERRORS) {
        console.error(`[Error] ${status} - ${message}`, err);
    }

    const payload: any = {
        success: false,
        error: message,
        status,
        timestamp: new Date().toISOString()
    };

    if (env_config.SHOW_DB_ERRORS && err?.stack) {
        payload.stack = err.stack.split('\n').slice(0, 5);
    }

    res.status(status).json(payload);
});



