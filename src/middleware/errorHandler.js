module.exports = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({
      error: 'El id no es valido',
    });
  } else {
    res.status(500).send({
      error: error.message,
    });
  }
};
