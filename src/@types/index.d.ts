import { IsoCodeType } from "./types/types.common";

// Add custom queries to
declare global {
   namespace Express {
      interface Request {

         // Params
         lang_id: number;
         param_id: id;
         iso_code: IsoCodeType;
         slug: string;

         // Queries
         options: QueryOptions
      }
   }
}
