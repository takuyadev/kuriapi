import {
   Translations,
   ObtainType,
   Ph,
   Size,
   Speed,
   Temperature,
   Type,
} from "./types.common";

// Interface for Ability
export interface Ability {
   id: number;
   name: Translations;
   description: Translations;
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
   type: Type;
}

// Interface for detailed information about a kin
export interface KinDetailed extends Kin {

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

// export interface PaginationResult<T> {
//    data?: T[];
//    previous?: {
//       page: number;
//       limit: number;
//    };
//    next?: {
//       page: number;
//       limit: number;
//    };
// }
