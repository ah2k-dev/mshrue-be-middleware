import express from "express";
import wix from "./wix.js";

const router = express.Router();

router.use("/middleware", wix);

export default router;
