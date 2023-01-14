// Middleware function to centrally handle error
// Usage app.use(errorHandler OR errorMiddleware) in index.js & Call async fn. via `return next(error)`
const errorHandler = (error, req, res, next) => {
  return res.status(400).json({ error: error.message });
};

export { errorHandler };
