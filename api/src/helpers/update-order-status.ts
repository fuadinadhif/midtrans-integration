import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function updateOrderStatus(data: any) {
  const hash = crypto
    .createHash("sha512")
    .update(
      `${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (data.signature_key !== hash) {
    return { status: "error", message: "Invalid signature key" };
  }

  let transactionStatus = data.transaction_status;
  let fraudStatus = data.fraudStatus;

  if (transactionStatus === "capture") {
    if (fraudStatus === "accept") {
      await prisma.order.update({
        where: { id: data.order_id },
        data: { status: "PAID" },
      });
    }
  } else if (transactionStatus === "settlement") {
    await prisma.order.update({
      where: { id: data.order_id },
      data: { status: "PAID" },
    });
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "deny" ||
    transactionStatus === "expire" ||
    transactionStatus === "failure"
  ) {
    await prisma.order.update({
      where: { id: data.order_id },
      data: { status: "CANCELED" },
    });
  } else if (transactionStatus === "pending") {
    await prisma.order.update({
      where: { id: data.order_id },
      data: { status: "PENDING" },
    });
  }
}
