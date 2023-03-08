const { expressjwt } = require("express-jwt");

module.exports = expressjwt({
  secret: "sharedkey",
  algorithms: ["HS256"],
}).unless({ path: ["/user/login"] });
