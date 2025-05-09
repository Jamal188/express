import {checkSchema, validationResult} from 'express-validator';
import {Request, Response, NextFunction} from 'express';



export const validateProduct = checkSchema({
	name: {
		isString: true,
		notEmpty: true,
		errorMessage: 'Product name is required!',
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Product name cannot exceed 30 characters!'
		}
	},
	
	brand: {
		isString: true,
		notEmpty: true,
		errorMessage: 'Brand name is required!',
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Brand name cannot exceed 30 characters!'
		}
	},

	description: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 300},
			errorMessage: 'Product description cannot exceed 300 characters!'
		}
	},
        price: {
		isFloat: {
			options : {min: 0.01},
			errorMessage: 'Product price cannot be negative!'
		},
		toFloat: true,

	},
});



export const validateProductUpdate = checkSchema({
	name: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Product name cannot exceed 30 characters!'
		}
	},
	
	brand: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 30},
			errorMessage: 'Brand name cannot exceed 30 characters!'
		}
	},

	description: {
		optional: true,
		isString: true,
		trim: true,
		escape: true,
		isLength: {
			options: {max: 300},
			errorMessage: 'Product description cannot exceed 300 characters!'
		}
	},
        price: {
		optional: true,
		isFloat: {
			options : {min: 0.01},
			errorMessage: 'Product price cannot be negative!'
		},
		toFloat: true,

	},
});


