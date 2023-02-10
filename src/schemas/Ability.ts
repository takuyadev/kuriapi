import { model, Schema } from "mongoose"
import { IAbility } from "../models/interfaces/IAbility"

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
})

export default model("Ability", AbilitySchema)
