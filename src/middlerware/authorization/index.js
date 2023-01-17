const jwt = require('jsonwebtoken');

function getToken(authHeader) {
  let splitHeader;

  try {
    splitHeader = authHeader.split(' ');
  } catch (error) {
    console.log(error);
    return null;
  }

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization !== undefined && typeof authorization !== 'string') {
    return null;
  }

  let token = getToken(authorization);

  let payload;
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  } catch (error) {
    return res.status(401).json({message :'unauthorized'});
  }

  req.user = {
    id: payload.id,
    email: payload.email,
    name: payload.name,
    phone_number: payload.phone_number
  };

  next();
};

module.exports = authorized;