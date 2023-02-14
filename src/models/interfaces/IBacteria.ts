import { Model, Document } from "mongoose"
import { IPaginationOptions } from "./IPaginate"

export interface IBacteria {
  _id?: any
  game_index: number
  slug: string

  name: {
    romanji_name: string
    japanese_name: string
  }

  desc: {
    english_desc: string
    japanese_desc: string
  }

  type: "edge" | "veil" | "solid"
  ability: {
    _id?: string
    name: {
      english_name: string
      japanese_name: string
    }
  }

  size: "s" | "m" | "l"
  ph: "acid" | "neutral" | "alkaline"
  temperature: "low" | "medium" | "high"

  stats: {
    hp: number
    attack: number
    defense: number
    attackSpeed: number
    growthSpeed: number
    speed: "slow" | "moderate" | "fast" | "fastest"
  }

  obtain: "primeval" | "new" | "unique"
  saying: {
    english_saying: string
    japanese_saying: string
  }
}

export interface IBacteriaDocument extends IBacteria, Document {}

export interface IBacteriaModel extends Model<IBacteria> {
  paginate(query: any, options: IPaginationOptions): any
  slugify(): any
}
