import { model, Schema, Model, Document } from "mongoose"
import { IAbility } from "../models/interfaces/IAbility"
import { IPaginationOptions } from "../models/interfaces/IPaginate"
import { paginate } from "../middlewares/paginate"

export interface IAbilityModel extends Model<IAbility> {
  paginate(query: any, options: IPaginationOptions): any
}

const AbilitySchema = new Schema<IAbility>({
  name: {
    english_name: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 24,
    },
    japanese_name: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 12,
    },
  },

  description: {
    english_desc: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 128,
    },
    japanese_desc: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 64,
    },
  },
  slug: String,
})

// Update slug whenever name changes or updates
AbilitySchema.pre<IAbility & Document>("save", async function (next) {
  if (!this.isModified("name")) {
    next()
  }
  this.slug = this.name.english_name.toLowerCase()
})

// Set pagination method for Ability
AbilitySchema.statics.paginate = async function (
  query,
  options: IPaginationOptions
) {
  return await paginate.bind(this)(query, options)
}

export default model<IAbility & Document, IAbilityModel>(
  "Ability",
  AbilitySchema
)
