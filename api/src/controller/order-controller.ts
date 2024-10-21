import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { MidtransClient } from "midtrans-node-client";
import { v4 as uuid } from "uuid";

import { updateOrderStatus } from "../helpers/update-order-status";

const prisma = new PrismaClient();
const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function createOrder(req: Request, res: Response) {
  const { itemId, quantity } = req.body;

  try {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) return res.status(404).json({ ok: false });

    const amount = item.price * Number(quantity);
    const orderId = uuid();
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      item_details: [
        { id: itemId, name: item.name, price: item.price, quantity },
      ],
      customer_details: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@purwadhika.com",
      },
      callbacks: {
        finish: "http://localhost:3000",
      },
    };
    const transaction = await snap.createTransaction(parameter);
    const order = await prisma.order.create({
      data: { id: orderId, amount, quantity, itemId },
    });

    return res.status(201).json({ ok: true, data: { order, transaction } });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}

export async function orderNotification(req: Request, res: Response) {
  const data = req.body;

  try {
    updateOrderStatus(data);
    res.status(200);
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
}
