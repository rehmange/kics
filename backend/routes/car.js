import express from "express";
import { car} from "../controllers/car.js";

const router = express.Router();

router.post("/new", car)

export default router