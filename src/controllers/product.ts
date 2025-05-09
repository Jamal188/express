import {Request, Response} from 'express';
import * as productService from '../services/productService.ts';
import {SafeUser} from '../models/User.ts';



export const createProduct = async (req: Request, res: Response) => {
	try {
		const product = await productService.createProduct(req.body);
		if (!product) {res.status(500).json({error: "Internal error, product not created"});}
		res.status(201).json({"success" : "Product Created"});
	} catch (error) {
		res.status(500).json({error: `${error}`});
	}

};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {

	try {
		const productId = req.params.id; 
    		const updateData = req.body;
		const product = await productService.updateProduct(
			productId, updateData);
		if (!product) { res.status(404).json({ error: 'Product not found' }); return; }
		res.json(product);

	} catch (error) {
		res.status(500).json({ error: 'Server error' });
	}

}
