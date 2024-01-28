import { Request, Response } from 'express';
import User from "../model/user.todo.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json('Invalid Email');
      return;
    }

    const validatedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatedPassword) {
       res.status(400).json('Invalid Password');
       return;
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET as string
    );
    res.cookie("token", token);
    res.status(200).json({ msg : "login succesful" });
  } catch (err) {
    res.status(400).json(err);
  }
};

export { register, login };
