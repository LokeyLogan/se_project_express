const BAD_REQUEST = 400;
const UNAUTHORIZED = 401; // used when auth token is missing/invalid or login fails
const FORBIDDEN = 403; // used when user lacks permission (e.g. deleting someone else's item)
const NOT_FOUND = 404;
const CONFLICT = 409; // used for duplicate email during signup
const SERVER_ERROR = 500;

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
};
