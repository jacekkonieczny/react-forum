import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    console.log("naglowek authorization:", req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "brak tokenu autoryzacyjnego" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: number, role_id: number};
        (req as any).user = {id: decoded.id, role_id: decoded.role_id};
        next();
    } catch (error) {
        res.status(401).json({ message: "nieprawidłowy token" });
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || user.role_id !== 3) {
        res.status(403).json({ message: "brak uprawnien - wymagane uprawnienia administratora" });
        return;
    }

    next();
};

export const isModOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || user.role_id !== 3 && user.role_id !== 2) {
        res.status(403).json({ message: "brak uprawnien - wymagane uprawnienia administratora lub moderatora" });
        return;
    }

    next();
};




