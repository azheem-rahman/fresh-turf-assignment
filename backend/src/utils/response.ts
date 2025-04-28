// format success reponse
export const successResponse = (data: object, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify({
      success: true,
      data,
    }),
  };
};

// format error response
export const errorResponse = (
  statusCode: number,
  error: string,
  message: string,
  details?: any
) => {
  return {
    statusCode,
    body: JSON.stringify({
      success: false,
      error,
      message,
      ...(details && { details }),
    }),
  };
};
