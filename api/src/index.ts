import express from "express";
import cors from "cors";

import itemRoutes from "./routes/item-route";
import orderRoutes from "./routes/order-route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  return res.status(200).json({ ok: true, message: "Welcome!" });
});

app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/orders", orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
