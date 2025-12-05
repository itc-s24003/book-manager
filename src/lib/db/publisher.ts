import prisma from "../db.js";
import { toDBResponse } from "./_response.js";

export async function db_addPublisher(name: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.publisher.create(
            {
                data: {
                    name
                }
            }
        )
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}


export async function db_getPublishersByNameKeyword(keyword: string) {
    const data = await prisma.$transaction(async (tx) =>(
        tx.publisher.findMany({
            where: {
                isDeleted: false,
                name: {
                    contains: keyword
                }
            },
            select: {
                id: true,
                name: true
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}


export async function db_renamePublisher(id: string, name: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.publisher.update({
            where: {
                id,
                isDeleted: false
            },
            data: {
                name: name
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}


export async function db_deletePublisher(id: string) {
    const data = await prisma.$transaction(async (tx) => (
        tx.publisher.update({
            where: {
                id,
                isDeleted: false
            },
            data: {
                isDeleted: true
            }
        })
    )).catch((e: Error) => e);

    return toDBResponse<typeof data>(data);
}