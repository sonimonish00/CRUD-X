const httpStatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  REDIRECT: 303,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
};

// CRUD Operations
/*
  POST (Create) : 201 created [Erros - 400]
  GET (Read All) : 200 success/ok [Errors - 404]
  GET (Read byID) : 200 success/ok [Errors - 404]
  PUT (Update) : 200,201,204 (Recommended 204) [Errors - 404,400]
  DELETE (delete) : 200,204 (Recommended 204) [Errors - 404]
*/

export { httpStatusCodes };
