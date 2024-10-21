import { Router } from "express";

import { createItem } from "../controller/item-controller";

const router = Router();

router.route("/").post(createItem);

export default router;
