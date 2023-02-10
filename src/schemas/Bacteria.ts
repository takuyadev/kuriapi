import mongoose, { model, Schema, Document } from "mongoose"
import Ability from "./Ability"
import { IBacteria } from "../models/interfaces/IBacteria"
import { IAbility } from "../models/interfaces/IAbility"

const BacteriaSchema = new Schema<IBacteria>({
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

BacteriaSchema.pre<IBacteria>("save", async function (next) {
  const ability: IAbility | null = await Ability.findById(this.ability._id)
  if (ability) {
    this.ability = ability
  }
  next()
})

export default model<IBacteria & Document>("Bacteria", BacteriaSchema)
