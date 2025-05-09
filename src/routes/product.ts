import express from 'express';
import { updateProduct } from '../services/productService.ts';
import { requireAuth } from '../middlewares/auth.ts';
import { validateProduct, validateProductUpdate } from '../middlewares/productValidators.ts';
import { handleValidationErrors } from '../middlewares/userValidators.ts';
import * as productController from '../controllers/product.ts';
const router = express.Router();

router.patch('/:id',
		requireAuth,
		validateProductUpdate,
		handleValidationErrors,
		productController.updateProduct
);
