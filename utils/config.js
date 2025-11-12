// JWT secret used for signing and verifying tokens
const { JWT_SECRET = "dev-secret-key" } = process.env;

module.exports = {
  JWT_SECRET,
};
