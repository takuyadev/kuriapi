interface Response<T> {
   success: boolean;
   data: T;
   message?: string;
}

export const responseHandler = <T extends unknown>(result: boolean, data: T, message?: string | undefined) => {
   const response: Response<T> = {
      success: result,
      data: data,
   };

   if (message) {
      response.message = message;
   }

   return response;
};
