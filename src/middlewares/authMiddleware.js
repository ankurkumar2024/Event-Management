const { decodeJwtAccessToken } = require('../utils/jwt');

/**
 * The function `validateToken` checks the validity of a bearer token in the request headers and
 * decodes the token to extract user information.
 * @param req - The `req` parameter in the `validateToken` function stands for the request object. It
 * contains information about the HTTP request that is being made, such as headers, parameters, body,
 * etc. In this function, `req.headers.authorization` is used to extract the authorization token from
 * the request headers
 * @param res - The `res` parameter in the `validateToken` function is the response object that is used
 * to send a response back to the client making the request. In this function, it is used to send
 * different HTTP responses with appropriate status codes and messages based on the validation of the
 * authorization token.
 * @param next - The `next` parameter in the `validateToken` function is a callback function that is
 * used to pass control to the next middleware function in the request-response cycle. When called, it
 * tells Express to move on to the next middleware in the chain. In this context, `next()` is called
 * after
 * @returns The `validateToken` function is returning different responses based on the conditions met
 * during token validation:
 * 1. If the `authorization` header is missing, it returns a 401 status with a message 'Unauthorized:
 * Token is missing'.
 * 2. If the token format is invalid (missing token after 'Bearer'), it returns a 401 status with a
 * message 'Unauthorized: Invalid token format'.
 * 3. If
 */
async function validateToken(req, res, next) {
  const bearerAuthorizationToken = req.headers.authorization;
  if (!bearerAuthorizationToken) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Token is missing',
    });
  }
  const fetchedToken = bearerAuthorizationToken.split(' ')[1];
  if (!fetchedToken) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Invalid token format',
    });
  }
  try {
    const decodedUserInformation = await decodeJwtAccessToken(fetchedToken);
    if (
      decodedUserInformation.exp &&
      Date.now() >= decodedUserInformation.exp * 1000
    ) {
      return res.status(401).json({
        status: false,
        message: 'Unauthorized: Token has expired',
      });
    }
    req.user = decodedUserInformation;
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized: Invalid token',
    });
  }
  next();
}

module.exports = { validateToken };
