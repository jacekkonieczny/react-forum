import express from "express";
import {getAllUsers, searchUsers, updateUserRole, deleteUser, getRoles} from "../controllers/adminController";
import {authenticate, isAdmin} from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", authenticate, isAdmin, getAllUsers);
router.get("/users/search", authenticate, isAdmin, searchUsers);
router.put("/users/:userId/role", authenticate, isAdmin, updateUserRole);
router.delete("/users/:userId", authenticate, isAdmin, deleteUser);
router.get("/roles", authenticate, isAdmin, getRoles);

export default router;