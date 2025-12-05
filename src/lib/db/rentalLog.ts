import { env_config } from "../../evn.config.js";
import prisma from "../db.js";
import { toDBResponse } from "./_response.js";

export async function db_getRentalLogById(id: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.rentalLog.findUnique({
            where: { id }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}


export async function db_getRentalLogByUserId(userId: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.rentalLog.findMany({
            where: { userId },
            select: {
                id: true,
                book: {
                    select: {
                        isbn: true,
                        title: true
                    }
                },
                checkoutDate: true,
                dueDate: true,
                returnedDate: true
            },
            orderBy: {
                checkoutDate: "desc"
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}


export async function db_addRentalLog(userId: string, isbn: number) {
    const now = new Date();
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + env_config.APP_DUE_DAYS);
    const data = await prisma.$transaction(async (tx) => (
        tx.rentalLog.create({
            data: {
                userId,
                bookIsbn: isbn,
                checkoutDate: now,
                dueDate: dueDate
            }
        })
    )).catch((e: Error) => e);


    return toDBResponse<typeof data>(data);
}


type UpdateParams = {
    returnedDate?: Date | null
}
export async function db_updateRentalLog(id: string, params: UpdateParams) {
    const data = await prisma.$transaction(async (tx) => (
        tx.rentalLog.update({
            where: { id },
            data: {
                ...params,
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}



export async function db_returnRentalLog(id: string, userId: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.rentalLog.update({
            where: {
                id,
                userId,
                returnedDate: null
            },
            data: {
                returnedDate: new Date()
            },
            select: {
                id: true,
                returnedDate: true
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}