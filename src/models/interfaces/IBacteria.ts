export interface IBacteria {
  _id?: string
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
