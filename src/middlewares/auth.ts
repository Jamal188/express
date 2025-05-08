import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AuthService } from '../services/auth.ts';
import User from '../models/User.ts';

export const sanitizeAuthInput = (req: Request, res: Response, next: NextFunction) => {
  req.body.email = req.body.email?.trim().toLowerCase();
  req.body.password = req.body.password?.trim();
  next();
};

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
};


