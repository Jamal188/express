import express from 'express';
import passport from 'passport';
import helmet from 'helmet';
import xss from 'xss-clean';

import connectDB from './config/database.ts';
import './strategies/local.ts';
import userRoutes from './routes/user.ts';
import './middlewares/auth.ts'; 

const app = express();
const PORT = 3000;


app.use(helmet());
app.use(xss());
app.use(passport.initialize());
app.use(express.json());


app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello TypeScript + Express!');
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});


