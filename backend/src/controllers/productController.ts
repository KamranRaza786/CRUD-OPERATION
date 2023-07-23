import { Request, Response } from 'express';
import { customAlphabet } from 'nanoid';
import Product from '../models/Product';

const nanoid = customAlphabet('1234567890', 10);

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price, description } = req.body;
  try {
    const product = await Product.create({
      id: nanoid(),
      name,
      price,
      description,
    });
    res.status(201).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
      },
      { new: true }
    );
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
