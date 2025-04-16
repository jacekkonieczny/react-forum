import express from "express";
import {getAllThreads, getThreadsByCategory, getThreadById, createThread} from "../controllers/threadsController";
import {authenticate} from "../middleware/authMiddleware";


const router = express.Router();

router.get("/", getAllThreads);
router.get("/category/:category", getThreadsByCategory);
router.get("/:id", getThreadById);
router.post("/", authenticate, createThread);

export default router;