import express from "express";
import {getAllThreads, getThreadsByCategory, getThreadById, createThread, deleteThread} from "../controllers/threadsController";
import {authenticate, isModOrAdmin} from "../middleware/authMiddleware";


const router = express.Router();

router.get("/", getAllThreads);
router.get("/category/:category", getThreadsByCategory);
router.get("/:id", getThreadById);
router.post("/", authenticate, createThread);
router.delete("/:id", authenticate, isModOrAdmin, deleteThread);

export default router;