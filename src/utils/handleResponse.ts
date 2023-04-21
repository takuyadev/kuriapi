interface Response<T> {
   success: boolean;
   data: T;
   message?: string;
}

export const handleResponse = <T extends unknown>(result: boolean, data: T, message?: string | undefined) => {

   // Setup response for return
   const response: Response<T> = {
      success: result,
      data: data,
   };

   // If message was provided, then add property with message
   if (message) {
      response.message = message;
   }

   return response;
};
