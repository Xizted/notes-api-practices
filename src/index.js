const app = require('./app');

const PORT = process.env.NODE_ENV === 'test' ? 0 : process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = {
  app,
  server,
};
