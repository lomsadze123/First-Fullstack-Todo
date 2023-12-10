const handleErrorResponse = (response, error, statusCode = 500) => {
  console.log(error);
  response.status(statusCode).send("Internal Server Error");
};

export default handleErrorResponse;
