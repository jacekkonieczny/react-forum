import { Request, Response } from "express";
import db from "../config/db";
import { RowDataPacket } from "mysql2";

export const getAllThreads = async (req: Request, res: Response): Promise<void> => {
    try {
        const [rows] = await db.query("SELECT * FROM threads ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania watkow", error: err });
    }
};

export const getThreadsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM threads WHERE category_id = ?", [category]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "blad podczas pobierania watkow w danej kategorii", error: err });
    }
};

export const getThreadById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM threads WHERE id = ?", [id]) as [RowDataPacket[], any];
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
