import { env_config } from "../evn.config.js";
import os from "os";


import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import session from "express-session";


export const app = express();
export const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Attempt Redis connection. Falls back to memory store on failure (for development)
let redisStore: any = undefined;
try {
    if (env_config.REDIS_URL) {
        const redisClient = createClient({url: env_config.REDIS_URL});
        redisClient.on("error", (err) => console.error("[Redis] Connection error:", err));
        await redisClient.connect();
        redisStore = new RedisStore({client: redisClient});
    }
} catch (err) {
    redisStore = undefined;
}

const sessionOptions: any = {
    secret: env_config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "mb_sid",
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    }
};
if (redisStore) sessionOptions.store = redisStore;

app.use(session(sessionOptions));
app.use(passport.authenticate("session"));



server.listen(env_config.PORT);

