exports.notFound = (req, res) => res.status(404).json({ message: `Not found: ${req.originalUrl}` });
exports.errorHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
