const notFoundHandler = (req, res, next) => {
  const error = new Error("Endpoint tidak ditemukan");

  error.status = 404;

  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (
    err instanceof SyntaxError &&
    err.status === 400 &&
    err.body !== undefined
  ) {
    return res.status(400).json({
      status: "error",
      message: "JSON request tidak valid",
      data: null,
    });
  }

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Terjadi kesalahan pada server",
    data: null,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};