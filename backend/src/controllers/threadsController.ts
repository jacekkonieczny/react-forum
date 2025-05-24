import { Request, Response } from "express";
import db from "../config/db";

export const getAllThreads = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await db.query("SELECT threads.*, users.username FROM threads JOIN users ON threads.user_id = users.id ORDER BY threads.created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania watkow", error: err });
    }
};

export const getThreadsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;
    try {
        const [rows] = await db.query("SELECT threads.*, users.username FROM threads JOIN users ON threads.user_id = users.id JOIN categories ON threads.category_id = categories.id WHERE categories.title = ? ORDER BY threads.created_at DESC", [category]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania watkow w danej kategorii", error: err });
    }
};

export const getThreadById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [rows]: any = await db.query("SELECT * FROM threads WHERE id = ?", [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: "nie znaleziono watku" });
            return;
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania watku", error: err });
    }
};

export const createThread = async (req: Request, res: Response): Promise<void> => {
    const {title, content, category} = req.body;
    const user_id = (req as any).user?.id;

    if (!title || !content || !category) {
        res.status(400).json({ message: "wszystkie pola sa wymagane" });
        return;
    }

    try {
        const [result] = await db.query(
            "INSERT INTO threads (title, content, category_id, user_id) VALUES (?, ?, ?, ?)",
            [title, content, category, user_id]
        );
        res.status(201).json({ message: "utworzono watek", threadId: (result as any).insertId });
    } catch (err) {
        res.status(500).json({ message: "blad podczas tworzenia watku", error: err });
    }
};

export const deleteThread = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    try {
        const [threadRows]: any = await db.query("SELECT * FROM threads WHERE id = ?", [id]);
        if (threadRows.length === 0) {
            res.status(404).json({message: "nie znaleziono watku"});
            return;
        }
        await db.query("DELETE FROM threads WHERE id = ?", [id]);
        res.json({message: `watek o id ${id} zostal usuniety przez uzytkownika ${userId} (${userRole})`});
    } catch (err) {
        res.status(500).json({message: "blad podczas usuwania watku", error: err});
    }
};

