import { Router } from "express";

import { createOrder, orderNotification } from "../controller/order-controller";

const router = Router();

router.route("/").post(createOrder);
router.route("/notification").post(orderNotification);

export default router;
