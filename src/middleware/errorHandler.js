const ERROR_HANDLERS = {
  CastError: (res) => res.status(400).send({ error: 'El id no es valido' }),

  ValidationError: (res, error) =>
    res.status(409).json({ error: error.message }),

  JsonWebTokenError: (res, error) =>
    res.status(401).json({ error: error.message }),

  DefaultError: (res, error) => res.status(500).send({ error: error.message }),
};

module.exports = (error, req, res, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.DefaultError;

  handler(res, error);
};
