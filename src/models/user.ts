import mongoose, { Schema } from 'mongoose'
import { UserDocument } from '../types'

const { ObjectId } = Schema.Types
var schemaOptions = {
  toObject: { getters: true },
  toJSON: { getters: true },
  versionKey: false,
  timestamps: true,
}
const userSchema = new Schema(
  {
    name: String,
    categories: [{ type: ObjectId, ref: 'Category' }],
   },
  schemaOptions
)


export const User = mongoose.model<UserDocument>(
  'User',
  userSchema
)
