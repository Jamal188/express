import mongoose from 'mongoose';
import User from './User.ts';



export interface IProduct extends mongoose.Document {
  name: string;
  brand: string;
  description?: string;
  price: number;
  user: mongoose.Schema.Types.ObjectId;
}

export interface IProductModel extends mongoose.Model<IProduct> {
  createProduct(productData: Omit<IProduct, keyof mongoose.Document> & {
		user: mongoose.Schema.Types.ObjectId}
	       ): Promise<IProduct>;
}

const ProductSchema = new mongoose.Schema<IProduct, IProductModel>(
  {
    name: { 
      type: String, 
      required: [true, 'Product name is required'],
      trim: true
    },
    brand: { 
      type: String, 
      required: [true, 'Brand is required'],
      trim: true 
    },
    description: { 
      type: String, 
      required: false 
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be positive']
    },
    user: {
	    type: mongoose.Schema.Types.ObjectId,
	    required: true,
	    ref: 'User'
    }
  },
  {
    timestamps: true, 
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

ProductSchema.pre<IProduct>('save', async function(next) {
  const user = await User.exists({_id: this.user});
  if (!user) throw new Error("Login required!");

  if (this.isModified('price') && this.price <= 0) {
    throw new Error('Price must be positive');
  }
  next();
});

ProductSchema.statics.createProduct = async function(productData: Omit<IProduct, keyof mongoose.Document> & {
  user: mongoose.Schema.Types.ObjectId }) 
  {
  	const product = new this(productData);
  	return await product.save();
};

const Product = mongoose.model<IProduct, IProductModel>('Product', ProductSchema);
export type UseProduct = Pick<IProduct, '_id' | 'name' | 'brand' | 'price' | 'description'>;
export default Product;

