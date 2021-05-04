module.exports = {
  TOKEN: { EXPIRES_IN: 900, TYPE: 'Bearer' },
  HTTP_CODES: {
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    FORBIDDEN: 403
  },
  HTTP_MESSAGES: {
    UNAUTHORIZED: `Unauthorized, be sure you've correct credentials to execute this operation.`,
    BAD_REQUEST: 'Bad request for the provided url',
    NOT_FOUND: 'Not found',
    SERVER_ERROR: 'Something went wrong try it again later.',
    WRONG_TOKEN: `Unauthorized, be sure you're using Bearer authentication, otherwise it won't work`,
    FORBIDDEN: `Access forbidden for this`
  },
  DEFAULT_MESSAGE_VIABLE_URLS: `Node Assestment, viable urls: '/login'`
};
