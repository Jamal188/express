import Product, { IProduct, IProductModel } from '../models/Product.ts';
import {Types} from 'mongoose';
import mongoose from 'mongoose';
export const createProduct = async (
  productData: Omit<IProduct, keyof mongoose.Document> & { user: Types.ObjectId }
): Promise<IProduct> => {
  return await Product.createProduct(productData);
};


export const getAllProducts = async (userId?: Types.ObjectId): Promise<IProduct[]> => {
  const query = userId ? { user: userId } : {};
  return await Product.find(query).populate('user', 'name email'); // Include user details
};

export const getProductById = async (
  productId: string,
  userId?: Types.ObjectId
): Promise<IProduct | null> => {
  const query: any = { _id: productId };
  if (userId) query.user = userId; // Only fetch if user owns it
  return await Product.findOne(query).populate('user', 'name email');
};


export const updateProduct = async (
  productId: string,
  updateData: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findOneAndUpdate(
    { _id: productId },
    updateData,
    { new: true } 
  );

};


export const deleteProduct = async (
  productId: string,
  userId: Types.ObjectId
): Promise<IProduct | null> => {
  return await Product.findOneAndDelete({ _id: productId, user: userId });
};





