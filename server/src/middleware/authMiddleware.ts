import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../model/user.todo.js"
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

const authMiddleware = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const authToken = req.headers['authorization'] as string;
    
    const token = authToken.split(' ')[1];

    
    if (!token) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    

    const decoded = jwt.verify(token, JWT_SECRET || '');
    
    const user = await User.findOne({ email: (decoded as any).email }); 
    

    if (user) {
        req.user = user._id;
        
        next();
        return;
    } else {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
  } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
  }
};

export { authMiddleware };
