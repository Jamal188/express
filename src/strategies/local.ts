import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthService } from '../services/auth.ts';
import { PassportStrategy } from '@nestjs/passport';
import { config } from '../config/env.ts';
import User, { SafeUser } from '../models/User.ts';


interface AuthResult {
  user: SafeUser;
  token: string;
}


passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email: string, password: string, done: (err: any, result?: false | AuthResult, info?: { message: string }) => void) =>
    {
    try {
      const user = await AuthService.validateUser(email, password);
      
      if (!user) return done(null, false, { message: "Invalid Username or Password"});

      const payload = { 
        id: user._id,
        email: user.email 
      };
      
      const secret: string = config.JWT_SECRET;
      const options: SignOptions = { 
        expiresIn: '1h'
      };

      const token = jwt.sign(payload, secret, options);


      return done(null, {user, token});
    
    } catch (err) {
      return done(err);
    }
  }
));
