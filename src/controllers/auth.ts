import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.ts';
import { AuthService } from '../services/auth.ts';
import { SafeUser } from '../models/User.ts';



interface AuthResult {
  user: SafeUser;
  token: string;
}
export class AuthController {
  static async login(req: Request, res: Response<AuthResult | { error: string }>, next: NextFunction) {
    passport.authenticate('local', 
      { session: false }, 
      (err: Error | null, data: { user: SafeUser, token: string } | false, info: { message?: string }) => {
        if (err) return next(err);
        if (!data) return res.status(401).json({ error: info?.message || 'Login failed' });
        
        
        res.json({
          user: data.user, 
          token: data.token
        });
      }
    )(req, res, next);
  }  
  static async logout(req: Request, res: Response) {
    res.json({ message: 'Logout successful. Please discard your token.' });
  }
}
