import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});

console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log(`server is running in the port: - http://localhost:3000`);
  connectDB();
});
