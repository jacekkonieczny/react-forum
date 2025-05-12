import express from "express";
import {getAllUsers, searchUsers, updateUserRole, deleteUser, getRoles} from "../controllers/adminController";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/search", searchUsers);
router.put("/users/:userId/role", updateUserRole);
router.delete("/users/:userId", deleteUser);
router.get("/roles", getRoles);

export default router;