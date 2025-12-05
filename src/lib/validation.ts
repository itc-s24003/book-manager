import { body, param } from "express-validator";
import { env_config } from "../evn.config.js";

export function validateEmail(fields: string) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`)
        .isEmail().withMessage(`${fields} はメールアドレス形式である必要があります`)
}


export function validateString(fields: string) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`)
        .isString().withMessage(`${fields} は文字列である必要があります`)
}


export function validatePassword(fields: string) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`).isString()
        .withMessage(`${fields} は文字列である必要があります`)
        .isLength({ min: env_config.APP_USER_PASS_MIN_LENGTH }).withMessage(`${fields} は最低${env_config.APP_USER_PASS_MIN_LENGTH}文字必要です`)
}


export function validateUUID(fields: string) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`)
        .isUUID().withMessage(`${fields} はUUIDである必要があります`)
}


export function validateISBN(fields: string) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`)
        .not().isString().withMessage(`${fields} は数値である必要があります`)
        .isInt().withMessage(`${fields} は整数である必要があります`)
        .isLength({ min: 13, max: 13 }).withMessage(`${fields} は13桁である必要があります`)
}


export function validateInt(fields: string, options?: { min?: number; max?: number }) {
    return body(fields)
        .notEmpty().withMessage(`${fields} は必須です`)
        .not().isString().withMessage(`${fields} は数値である必要があります`)
        .isInt(options).withMessage(`${fields} は整数${options ? `(${options.min ?? ""}..${options.max ?? ""})` : ``}である必要があります`)
}





export function validateParamISBN(fields: string) {
    return param(fields)
        .isInt().withMessage(`${fields} は整数である必要があります`)
        .isLength({ min: 13, max: 13 }).withMessage(`${fields} は13桁である必要があります`)
}

export function validateParamInt(fields: string, options?: { min?: number; max?: number }) {
    return param(fields)
        .isInt(options).withMessage(`${fields} は整数${options ? `(${options.min ?? ""}..${options.max ?? ""})` : ``}である必要があります`)
}