export class ApiError extends Error {
   statusCode: number;
   error: unknown
 
   constructor(statusCode: number, message: string) {
     super(message);
     this.statusCode = statusCode;
   }
 }