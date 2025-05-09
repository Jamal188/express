import express from 'express';
import { 
  validateUser, 
  validateUserUpdate, 
  handleValidationErrors 
} from '../middlewares/userValidators.ts';
import * as userController from '../controllers/user.ts';
import passport from 'passport';
import { AuthController } from '../controllers/auth.ts';
import { sanitizeAuthInput } from '../middlewares/auth.ts';
import { requireAuth } from '../middlewares/auth.ts';



const router = express.Router();

router.post('/register', validateUser,
	    handleValidationErrors,
	    userController.createUser );


router.post('/login', 
  sanitizeAuthInput,
  AuthController.login
);


router.put('/update', requireAuth, validateUserUpdate,
	   handleValidationErrors,
	   userController.updateUser);

router.post('/logout',
	    requireAuth,	
	    AuthController.logout
);



export default router;
