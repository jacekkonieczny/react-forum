import { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "wszystkie pola sa wymagane" });
        return;
    }

    try {
        const [emailCheck]: any = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (emailCheck.length > 0) {
            res.status(400).json({message: "uzyttkownik z takim adresem email juz istnieje"});
            return;
        }

        const [usernameCheck]: any = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        if (usernameCheck.length > 0) {
            res.status(400).json({message: "uzytkownik z taka nazwa juz istnieje"});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "rejestracja zakonczona pomyslnie" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "blad serwera" });
    }
};

