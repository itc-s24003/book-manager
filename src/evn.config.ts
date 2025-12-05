import crypto from "crypto";

const {
    DATABASE_URL, SESSION_SECRET,
    //--------------------------------------------------------
    REDIS_URL, PORT, SHOW_REQUEST_LOG, SHOW_DB_ERRORS, DB_SESSION_INTERVAL,
    //--------------------------------------------------------
    APP_USER_PASS_MIN_LENGTH, APP_DUE_DAYS
} = process.env;

// Check required environment variables
if (!DATABASE_URL) throw new Error("ENV: DATABASE_URL is not defined.");
if (!SESSION_SECRET) throw new Error("ENV: SESSION_SECRET is not defined.");

// Optional environment variables
// Warning messages removed - default values set below

export type EnvConfig = {
    DATABASE_URL: string;
    SESSION_SECRET: string;
    REDIS_URL?: string;
    SERVER_SESSION: string;
    PORT: number;
    SHOW_REQUEST_LOG: boolean;
    SHOW_DB_ERRORS: boolean;
    DB_SESSION_INTERVAL: number;
    APP_USER_PASS_MIN_LENGTH: number;
    APP_DUE_DAYS: number;
}

export const env_config: EnvConfig = {
    // Database & Auth
    DATABASE_URL,
    SESSION_SECRET,
    REDIS_URL: REDIS_URL ?? undefined,

    // Server Config
    SERVER_SESSION: crypto.randomUUID(),
    PORT: PORT ? Number(PORT) : 3000,

    // Debug & Logging
    SHOW_REQUEST_LOG: SHOW_REQUEST_LOG === "true",
    SHOW_DB_ERRORS: SHOW_DB_ERRORS === "true",

    // Session & Business Logic
    DB_SESSION_INTERVAL: DB_SESSION_INTERVAL ? Number(DB_SESSION_INTERVAL) : 0,
    APP_USER_PASS_MIN_LENGTH: APP_USER_PASS_MIN_LENGTH ? Number(APP_USER_PASS_MIN_LENGTH) : 8,
    APP_DUE_DAYS: APP_DUE_DAYS ? Number(APP_DUE_DAYS) : 7
}