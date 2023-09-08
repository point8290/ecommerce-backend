const admin = require("../config/firebase-config");
class Middleware {
  async decodeToken(req, res, next) {
    const token =
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ") == 2
        ? req.headers.authorization.split(" ")[1]
        : null;

    try {
      const decodedValue = await admin.auth().verifyIdToken(token);
      if (decodedValue) {
        return next();
      }

      return res.json({
        message: "Not Authorized",
        statusCode: 404,
      });
    } catch (error) {
      return res.json({
        message: "Internal Server Error",
        statusCode: 500,
      });
    }
  }
}

module.exports = new Middleware();
