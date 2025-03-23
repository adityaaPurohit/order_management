import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from 'src/schemas/product.schema';
import { ObjectId } from 'bson';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}
  async createProduct(payload) {
    try {
      let saveProduct = await this.productModel.create(payload);
      return { message: 'Product Created Successfully', data: saveProduct };
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(_id, payload) {
    try {
      let updateProduct = await this.productModel.findByIdAndUpdate(
        new ObjectId(_id),
        payload,
        { new: true },
      );
      if (!updateProduct) throw new Error('Can not find product!!');
      return { message: 'Product Updated Successfully', data: updateProduct };
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      let products = await this.productModel.find()
      return { message: 'Products fetched Successfully', data: products };
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id) {
    try {
      let product = await this.productModel.findById(new ObjectId(id))
      return { message: 'Product fetched Successfully', data: product };
    } catch (error) {
      throw error;
    }
  }
}
