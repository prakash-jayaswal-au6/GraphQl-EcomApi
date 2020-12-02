import { Document } from 'mongoose'
import { UserDocument } from './user';

export interface CategoryDocument extends Document {
  name: string
  parentId: string
  users: UserDocument['_id']

}
