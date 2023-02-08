import { IBacteria } from "../models/interfaces/IBacteria"

export const DUMMY_BACTERIA: IBacteria = {
  game_index: 1,

  name: {
    romanji_name: "Kurikin",
    japanese_name: "くりきん",
  },

  desc: {
    english_desc: "Dummy",
    japanese_desc: "Dummy",
  },

  ph: "neutral",
  temperature: "medium",
  type: "edge",
  size: "s",
  ability: {
    english_ability: "Attackimin",
    japanese_ability: "セメルミン",
  },

  stats: {
    hp: 76,
    attack: 53,
    attackSpeed: 67,
    defense: 11,
    speed: "fastest",
    growthSpeed: 236,
  },

  obtain: "primeval",
  saying: {
    english_saying: "A New Self",
    japanese_saying: "新しい自分",
  },
}
