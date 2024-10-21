import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export async function createItem(req: Request, res: Response) {
  const { name, price } = req.body;
  try {
    const item = await prisma.item.create({
      data: { id: uuid(), name, price },
    });
    return res.status(201).json({ ok: true, data: item });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}
