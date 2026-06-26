require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRoute = require("./Routes/AuthRoute");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3001",
    "http://localhost:3002",
    "https://stock-trading-platform-eta.vercel.app",
    "https://stock-trading-platform-nfb3.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Hit server!`);
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post('/newOrder', async (req, res) => {
  let neworder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await neworder.save();
  res.send("Order Saved");
});

mongoose.connect(url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
