import { Document } from 'mongoose'
import { CategoryDocument } from './'

export interface UserDocument extends Document {
  name: string
  categories: CategoryDocument['_id']

}
