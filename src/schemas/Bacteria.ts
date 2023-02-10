import mongoose, { model, Model, Schema, Document } from "mongoose"
import Ability from "./Ability"
import { IBacteria } from "../models/interfaces/IBacteria"
import { IPaginationOptions } from "../models/interfaces/IPaginate"
import { IAbility } from "../models/interfaces/IAbility"
import { paginate } from "../middlewares/paginate"

// Establish methods on the model
export interface IBacteriaModel extends Model<IBacteria> {
  paginate(query: any, options: IPaginationOptions): any
  slugify(): any
}

const BacteriaSchema: Schema = new Schema<IBacteria>({
  game_index: {
    type: Number,
  },

  name: {
    romanji_name: {
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

  desc: {
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

  type: {
    type: String,
    enum: ["edge", "veil", "solid"],
  },

  ability: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ability",
      required: true,
    },
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
  },

  size: {
    type: String,
    enum: ["s", "m", "l"],
  },

  ph: {
    type: String,
    enum: ["acid", "neutral", "alkaline"],
  },

  temperature: {
    type: String,
    enum: ["low", "medium", "high"],
  },

  stats: {
    hp: {
      type: Number,
      required: true,
      max: 255,
    },
    attack: {
      type: Number,
      required: true,
      max: 255,
    },
    defense: {
      type: Number,
      required: true,
      max: 255,
    },
    attackSpeed: {
      type: Number,
      required: true,
      max: 255,
    },
    growthSpeed: {
      type: Number,
      required: true,
      max: 255,
    },
    speed: {
      type: String,
      enum: ["slow", "moderate", "fast", "fastest"],
    },
  },

  obtain: {
    type: String,
    enum: ["primeval", "new", "unique"],
  },

  saying: {
    english_saying: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 24,
    },
    japanese_saying: {
      type: String,
      required: true,
      minlength: 0,
      maxlength: 18,
    },
  },
})

// Update slug whenever name changes or updates
BacteriaSchema.pre<IBacteria & Document>("save", async function (next) {
  if (!this.isModified("name")) {
    next()
  }
  this.slug = this.name.romanji_name.toLowerCase()
})

// Update ability based on newly provided ability ID reference
BacteriaSchema.pre<IBacteria & Document>("save", async function (next) {
  // If ability is not modified, move onto next middleware
  if (!this.isModified("ability")) {
    next()
  }

  // Find ability on new id, and add only name to ability
  const ability: IAbility | null = await Ability.findById(this.ability._id)
  if (ability) {
    this.ability = ability
  }
})

// Set pagination method for Bacteria
BacteriaSchema.statics.paginate = async function (
  query,
  options: IPaginationOptions
) {
  return await paginate.bind(this)(query, options)
}

export default model<IBacteria & Document, IBacteriaModel>(
  "Bacteria",
  BacteriaSchema
)
