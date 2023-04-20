export const responseHandler = <T extends unknown>(
   result: boolean,
   data: T | Error
) => {
   return {
      success: result,
      data: data,
   };
};
