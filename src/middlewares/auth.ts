import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { AuthService } from '../services/auth.ts';
import User from '../models/User.ts';
import { config } from '../config/env.ts';


export const sanitizeAuthInput = (req: Request, res: Response, next: NextFunction) => {
  req.body.email = req.body.email?.trim().toLowerCase();
  req.body.password = req.body.password?.trim();
  next();
};

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
          res.status(401).json({ error: 'Authentication required' });
	  return;
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
    req.user = { _id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
