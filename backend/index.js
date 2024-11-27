const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./db/dbConnection");

dotenv.config();

connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/nests", require("./routes/nestRoutes"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
