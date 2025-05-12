import { Request, Response } from "express";
import db from "../config/db";


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await db.query(
            "SELECT id, username, email, role_id, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?",
            [limit, offset]
        );

        const [[{ count }]]: any = await db.query("SELECT COUNT(*) as count FROM users");

        res.json({
            data: rows,
            currentPage: page,
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania uzytkownikow", error: err });
    }
};

export const searchUsers = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await db.query(
            "SELECT id, username, email, role_id, created_at FROM users WHERE username LIKE ? OR email LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            [`%${query}%`, `%${query}%`, limit, offset]
        );

        const [[{ count }]]: any = await db.query(
            "SELECT COUNT(*) as count FROM users WHERE username LIKE ? OR email LIKE ?",
            [`%${query}%`, `%${query}%`]
        );

        res.json({
            data: rows,
            currentPage: page,
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
        });
    } catch (err) {
        res.status(500).json({ message: "blad podczas wyszukiwania uzytkowsnikow", error: err });
    }
};


export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { roleId } = req.body;

    if (!userId || !roleId) {
        res.status(400).json({ message: "wymagane jest id uzytkownika oraz id roli" });
        return;
    }

    try {
        const [userExists]: any = await db.query(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );
        if (userExists.length === 0) {
            res.status(404).json({ message: "nie znaleziono uzytkownika" });
            return;
        }

        const [roleExists]: any = await db.query(
            "SELECT id FROM roles WHERE id = ?",
            [roleId]
        );
        if (roleExists.length === 0) {
            res.status(404).json({ message: "nie znaleziono roli" });
            return;
        }

        await db.query(
            "UPDATE users SET role_id = ? WHERE id = ?",
            [roleId, userId]
        );

        res.json({ message: "rola uzytkownika zostala zaaktualizowana" });
    } catch (err) {
        res.status(500).json({ message: "blad podczas aktualizacji roli uzytkownika", error: err });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ message: "wymagane jest id uzytkownika" });
        return;
    }

    try {
        const [userExists]: any = await db.query(
            "SELECT id FROM users WHERE id = ?",
            [userId]
        );
        if (userExists.length === 0) {
            res.status(404).json({ message: "nie znaleziono uzytkownika" });
            return;
        }

        await db.query(
            "DELETE FROM users WHERE id = ?",
            [userId]
        );

        res.json({ message: "uzytkownik zostal usuniety" });
    } catch (err) {
        res.status(500).json({ message: "blad podczas usuwania uzytkownika", error: err });
    }
};

export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await db.query("SELECT * FROM roles");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania rol", error: err });
    }
};