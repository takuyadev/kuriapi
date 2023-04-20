import { IsoCodeType } from "./types/types.common";

// Add custom queries to
declare global {
   namespace Express {
      interface Request {
         lang_id: number;
         param_id: id;
         iso_code: IsoCodeType;
         slug: string;

         options: QueryOptions
      }
   }
}
