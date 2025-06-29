import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient();

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// Login
export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ message: "Enter All Fields" });
      return;
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "No user exists" });
      return;
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ message: "Password did not match" });
      return;
    }
    
    const token = generateToken(user.id);
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

// Register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      res.status(400).json({ message: "Enter all fields" });
      return;
    }
    
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    
    const token = generateToken(newUser.id);
    res.status(201).json({
      message: "User registered",
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.userId;
    const user = await prisma.user.findUnique({ where: { id } });
    
    if (!user) {
      res.status(400).json({
        message: "user does not exist"
      });
      return;
    }
    
    res.status(200).json({
      user: {
        username: user.username, // Fixed: was userName, should be username
        email: user.email
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
}