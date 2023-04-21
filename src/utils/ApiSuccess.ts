export class ApiSuccess<T> {
   success: boolean;
   message?: string;
   data: T;

   constructor(data: T, message: string) {
      this.success = true;
      this.data = data;

      if (message) {
         this.message = message;
      }
   }
}
