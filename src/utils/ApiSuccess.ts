export class ApiResponse<T> extends Error {
   statusCode: number;
   message: string;
   data: T;

   constructor(data: T, statusCode: number, message: string) {
      super()
      this.message = message;
      this.statusCode = statusCode;
      this.data = data
   }

   error(){
      return {
         success: false,
         message: this.message,
         data: this.data
      }
   }

   success(){
      return {
         success: true,
         data: this.data
      }
   }
}
