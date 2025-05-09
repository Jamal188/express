import { checkSchema, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUser = checkSchema({
	username : {
		isString: true,
		notEmpty: true,
		errorMessage: 'Username is required!',
		trim: true,
		escape: true,
		isLength : {
			options: {min : 3, max: 30},
			errorMessage: 'Username must be between 3-30 characters!'
		}
	},
	email: {
		isEmail: true,
		normalizeEmail: true,
		errorMessage: 'Invalid email address!',
	},
	password: {
  		   isStrongPassword: {
    				options: {
      					minLength: 8,
      					minNumbers: 1, 
      					minSymbols: 0, 
      					minLowercase: 1,
      					minUppercase: 0
    				},
    			errorMessage: 'Your password must be at least 8 characters and contain at least 1 number',
  			}
		}
}); 


export const validateUserUpdate = checkSchema({
	username: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {min : 3, max: 30},
			errorMessage: 'Username must be between 3-30 characters'
		}
	},
	email: {
		optional: true,
		isEmail: true,
		normalizeEmail: true,
		errorMessage: 'Invalid email address'
	},
});


export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
	return;
  }
  next();
};


