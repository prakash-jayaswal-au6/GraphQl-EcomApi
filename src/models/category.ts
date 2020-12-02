import mongoose, { Schema } from 'mongoose'
import { CategoryDocument } from '../types'

const { ObjectId } = Schema.Types
var schemaOptions = {
  toObject: { getters: true },
  toJSON: { getters: true },
  versionKey: false,
  timestamps: true,
}
const categorySchema = new Schema(
  {
    name: String,
    parentId: {
      type: ObjectId,
      ref: 'Category'
    },
    users: [{ type: ObjectId, ref: 'User' }],
   },
  schemaOptions
)


export const Category = mongoose.model<CategoryDocument>(
  'Category',
  categorySchema
)
