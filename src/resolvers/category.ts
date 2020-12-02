import {
  IResolvers,
  UserInputError,
  ForbiddenError,
  withFilter,
} from 'apollo-server-express'
import { Request, CategoryDocument } from '../types'
import { Category } from '../models'
import { result } from 'lodash'
import category from '../typeDefs/category'

const resolvers: IResolvers = {
  Query: {
// To get all Category
    categories: async () => {
      try {
        const category = await Category.find()
        return category
      } catch (err) {
        throw err
      }
    },
    
// to get one Category
    category: async (root, args: { id: string }, ctx, info) => {
      try {
        const result = await Category.findById(args.id )
          return result
      } catch (err) {
        throw err
      }
    },
   
//To get the tree of megaMenu
    megaMenu: async (root, args: { parentId: string }, ctx, info) => {
      let arrTree = []
      try {
        async function getAllChild(parentId) {
         
          const result = await Category.find({ parentId: parentId })   
          result.map(category => {
            console.log(category)
            arrTree.push(category)
             getAllChild(category.id)
          })
          
        }
        getAllChild(args.parentId)
        console.log(arrTree)
         return arrTree
      } catch (err) {
        throw err
      }
      return arrTree
    },
  },



  Mutation: {
//To create and update the category
    saveCategory: async (
      root,
      args,
      { req }: { req: Request }
    ): Promise<CategoryDocument | null> => {
      console.log(args)

      let category: any
      try {
        const existingCategory = await Category.findOne({ name: args.name })
        //If category exist already then we will update it
        if (existingCategory) {
          const result = await Category.findByIdAndUpdate(args.id,
            { parentId: args.parentId, name: args.name, users: args.users },
            (err, docs) => {
              if (err) {
                console.log(err)
              } else {
                console.log('Updated User : ', docs)
              }
            }
          )
          return result
        }

        //If category exist already then we will update it
        const existingParent = await Category.find({ parentId: args.parentId })
        if (existingParent) {
          //Parent exists
          const category = new Category({
            name: args.name,
            parentId: args.parentId,
            users: args.users
          })
          const result = await category.save()
          return result
        } else {
          //Parent does not exists
          const category = new Category({
            name: args.name,
            users: args.users
          })
          const result = await category.save()
          return result
        }
      } catch (err) {
        throw err
      }
      return category
    },

//Delete Category via id
    deleteCategory: async (
      root,
      args,
      { req }: { req: Request }
    ): Promise<Boolean> => {
      const category: any = await Category.findByIdAndDelete(args.id)
      if (category) {
        return true
      } else {
        throw new Error('category does not exists ')
      }
    },

//Assign user to the categories
    assignUser: async (root, args, { req }: { req: Request }, info): Promise<CategoryDocument | null> => {
        console.log("reached ")
        console.log(args)
        const result = await Category.findOneAndUpdate(
          { _id: args.id },
          { $set: { users : args.userId } },
          { new: true }
      ) 
      return result
      }
 
  },
}

export default resolvers


//a