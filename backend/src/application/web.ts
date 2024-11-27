import express from "express";
import { publicRouter } from "../router/public-api";
import { middlewareError } from "../middleware/middleware-error";
import cors from "cors";

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(publicRouter);
app.use(middlewareError);

app.listen(5000, () => console.log("Server Running"));
