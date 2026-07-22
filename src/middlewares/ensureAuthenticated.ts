import { type Request, type Response, type NextFunction } from 'express';
import jwt from "jsonwebtoken";

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({
            error: "Token não enviado"
        })
    }

    const [ scheme, token ] = authorizationHeader.split(' ');

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            error: "Token inválido."
        });
    }

    const secretKey = process.env.JWT_SECRET

    if (!secretKey) {
        return res.status(500).json({
            error: "JWT_SECRET não configurado."
        })
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const { sub } = decoded as { sub: string };

        req.user = {
            id: sub
        }

        return next();
    } catch {
        return res.status(401).json({
            error: 'Token inválido'
        });
    }

    next();
}