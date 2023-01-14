// Helper Module - copied from auth0 ===> DELETE THIS FILE IF NOT USED IN FUTURE ANYWHERE

const errorHandler = (error, request, response, next) => {
  if (error.statusCode === 401 && error.message === "Unauthorized") {
    // defining the HTTP status code
    const statusCode = 401;
    // standard HTTP 401 error message
    const message = "Unauthorized";
    // link to hosted version of the "how-to-handle-authentication" HTML page you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authentication.html`;

    // implementing a custom error response on 401 errors matching the GitHub error response format
    response.status(statusCode).json({
      message: message,
      documentationLink: documentationLink,
    });
    return;
  }

  if (
    error.statusCode === 401 &&
    error.code === "invalid_token" &&
    error.message === "Permission denied"
  ) {
    // defining the HTTP status code
    const statusCode = 403;
    // standard HTTP 403 error message
    const message = "Forbidden";
    // link to hosted version of the "how-to-handle-authorization" HTML page you can find in the /docs folder
    const authority = `${request.protocol}://${request.hostname}:${process.env.PORT}`;
    const documentationLink = `${authority}/docs/how-to-handle-authorization.html`;
    // implementing a custom error response on 403 errors matching the GitHub error response format
    response.status(statusCode).json({
      message: message,
      documentationLink: documentationLink,
    });
    return;
  }
  const statusCode = error.statusCode || error.code || 500;
  const message = error.message || "internal error";
  response.status(statusCode).json({ message });
};
export { errorHandler };
