import { Request, Response } from 'express';
import * as userService from '../services/userService.ts';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({"great!": "User created"});
  } catch (error) {
    res.status(500).json({ error: `Server error : ${error}` });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
