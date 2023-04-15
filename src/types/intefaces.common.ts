import { Translations, ObtainType, Ph, Size, Speed, Temperature, Type } from "./types.common";

// Interface for Ability
export interface Ability {
  id: number;
  name: Translations;
  description: Translations;
  slug: string;
}

// Interface for single bacteria
export interface Bacteria {
  id: any;
  ability_id: number;

  // Bacteria information
  slug: string;
  name: Translations;
  description: Translations;
  obtain_type: ObtainType;
  saying: Translations;

  // Stats
  hp: number;
  attack: number;
  defense: number;
  attackSpeed: number;
  growthSpeed: number;
  speed: Speed;

  // Other info
  type: Type;
  size: Size;
  temperature: Temperature;
  ph: Ph;
}

export interface PaginationOptions {
  currentPage?: number;
  limitPerPage?: number;
}

export interface PaginationResult<T> {
  data?: T[];
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
}
