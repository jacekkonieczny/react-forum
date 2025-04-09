import jwt from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET as string;

interface JwtPayload {
    id: number;
    username: string;
    email: string;
    role_id: number;
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
