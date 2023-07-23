import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  id: string;
  name: string;
  price: string;
  description: string;
}

const productSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
