import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from './utils/connection';
import { authRouter } from "./routes/User";
// import { client, connectDB } from './utils/connection';

const port = 8000;
const app = express();

app.use(express.json());

app.use(cors())

dotenv.config();

app.use("/hello", (_req,res) => {
    res.json({ message: "Hello World" });

})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use("/user", authRouter);
