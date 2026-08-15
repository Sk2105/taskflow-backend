function errorHandler(err, req, res, next) {
  console.error(err);

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const message =
      err.errors?.map((e) => e.message).join(", ") || "Validation failed";
    return res.status(400).json({ error: message });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res
      .status(400)
      .json({ error: "Invalid reference to a related record" });
  }

  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong. Please try again." });
}

module.exports = errorHandler;
