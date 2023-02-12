import { model, Schema, Model, Document } from "mongoose"
import { IAbility } from "../models/interfaces/IAbility"
import { IPaginationOptions } from "../models/interfaces/IPaginate"
import { paginate } from "../utils/modules/paginate"
import Bacteria from "./Bacteria"
import { slugify } from "../utils/modules/slugify"

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
AbilitySchema.pre<IAbility & Document>(
  ["update", "updateOne"],
  async function (next) {
    const { _id } = this.getQuery()
    const updatedData = this.getUpdate()

    // Set new slug with new name
    this.set("slug", slugify(updatedData.name.english_name))

    // Update all bacteria with the same id
    await Bacteria.updateMany(
      { "ability._id": _id },
      {
        ability: {
          _id: _id,
          name: updatedData.name,
        },
      }
    )
    next()
  }
)

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
