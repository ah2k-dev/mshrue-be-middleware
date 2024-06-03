import express from "express";
import wix from "../controllers/wix.js";
const router = express.Router();

router.post("/file", wix.createFile);

export default router;
