import { IsoCodeType } from "./types/types.common";

// Add custom queries to
declare global {
   namespace Express {
      interface Request {
         limit: number;
         offset: number;
         iso_code: IsoCodeType;
         lang_id: number;
      }
   }
}