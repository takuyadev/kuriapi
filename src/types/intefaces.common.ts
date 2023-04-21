import { Translations, ObtainType, Ph, Size, Speed, Temperature, Type } from "./types.common";

// Interface for custom class ApiError
export interface ApiError extends Error {
   success: boolean;
   message: string;
   statusCode: number;
   data: [] | {};
}

// Interface for all available query string options
export interface QueryOptions {
   limit: number;
   offset: number;
   sort: string;
   order: string;
   search: string;
}

// Interface for Ability
export interface Ability {
   id: number;
   name: string;
   description: string;
   slug: string;
}

// Interface for basic Kin data, mostly used for mass data query
export interface Kin {
   id: any;

   // Bacteria information
   slug: string;
   name: Translations | string;
   ability: string;
   description: Translations | string;
   img: string;
   type: {
      name: Type;
      img: string;
   };

   // Extra details
   saying: Translations | string;
   obtain: ObtainType;

   // Stats
   hp: number;
   attack: number;
   defense: number;
   attack_speed: number;
   growth_speed: number;
   speed: Speed;
   size: Size;

   // Other info
   temperature: Temperature;
   ph: Ph;
}
