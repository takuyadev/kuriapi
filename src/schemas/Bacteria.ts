import mongoose, { model, Model, Schema, Document } from "mongoose"
import Ability from "./Ability"
import {
  IBacteria,
  IBacteriaDocument,
  IBacteriaModel,
} from "../models/interfaces/IBacteria"
import { IPaginationOptions } from "../models/interfaces/IPaginate"
import { IAbility } from "../models/interfaces/IAbility"
import { paginate } from "../utils/modules/paginate"
import { slugify } from "../utils/modules/slugify"

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

  slug: {
    type: String,
    index: true,
  },

  type: {
    type: String,
    enum: ["edge", "veil", "solid"],
  },

  ability: {
    _id: {
      index: true,
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
BacteriaSchema.pre<IBacteriaDocument>("save", async function (next) {
  if (!this.isModified("name")) {
    next()
  }
  this.slug = slugify(this.name.romanji_name.toLowerCase())
})

// Update ability based on newly provided ability ID reference
BacteriaSchema.pre<IBacteriaDocument>("save", async function (next) {
  // If not modified, go to next middleware
  if (!this.isModified("ability")) {
    next()
  }
  // Find ability on new id, and add only name to ability
  const ability: IAbility | null = await Ability.findById(this.ability._id)
  if (ability) {
    this.ability = ability
  }
})

// Update ability based on newly provided ability ID reference
BacteriaSchema.pre<IBacteriaDocument>(
  ["updateOne", "update"],
  async function () {
    // @ts-ignore : Maybe it is a bug as there is no reference of .getUpdate()
    const update = this.getUpdate()

    // Find ability on new id, and add only name to ability
    const ability: IAbility | null = await Ability.findById(
      // @ts-ignore
      this.getUpdate().ability._id
    )

    if (ability) {
      this.set("ability", ability)
    }
  }
)

// If delete is chosen, then delete all other ability refs with same ID

// Set pagination method for Bacteria
BacteriaSchema.statics.paginate = async function (
  query,
  options: IPaginationOptions
) {
  return await paginate.bind(this)(query, options)
}

export default model<IBacteriaDocument, IBacteriaModel>(
  "Bacteria",
  BacteriaSchema
)
