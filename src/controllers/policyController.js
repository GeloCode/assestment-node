import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';
import pagination from '../utils/pagination.js';

export const getPolicies = (req, res) => {
  const { user, policies } = req;

  if (!policies) {
    return res.status(HTTP_CODES.NOT_FOUND).send({
      code: HTTP_CODES.NOT_FOUND,
      message: `Policies: ${HTTP_MESSAGES.NOT_FOUND}`
    });
  }

  let policiesList;

  policiesList =
    user.role === 'user'
      ? policiesWithoutClientId(
        policies.filter(policy => policy.clientId === req.user.id)
      )
      : policiesWithoutClientId(policies);

  const limit = req.query.limit ? +req.query.limit : 10;
  const page = req.query.page ? +req.query.page : 1;

  return res.send(pagination(limit, page, policiesList));
};

export const getPolicyById = (req, res) => {
  const { id } = req.params;
  const { user, policies  } = req;


  if (!policies) {
    return res.status(HTTP_CODES.NOT_FOUND).send({
      code: HTTP_CODES.NOT_FOUND,
      message: `Policies: ${HTTP_MESSAGES.NOT_FOUND}`
    });
  }

  const policyById = policies.find(policy => policy.id === id);

  if (!policyById) {
    return res.status(HTTP_CODES.NOT_FOUND).send({
      code: HTTP_CODES.NOT_FOUND,
      message: `For given ID: ${id} Policy ${HTTP_MESSAGES.NOT_FOUND}`
    });
  }

  if (user.role === 'user') {
    return user.id === policyById.clientId
      ? res.send(policyWithoutClientId(policyById))
      : res.status(HTTP_CODES.FORBIDDEN).send({
        code: HTTP_CODES.FORBIDDEN,
        message: `${HTTP_MESSAGES.FORBIDDEN} Policy with ID: ${id}`
      });
  } else {
    return res.send(policyWithoutClientId(policyById));
  }
};

const policiesWithoutClientId = policies => policies.map(policyWithoutClientId);

const policyWithoutClientId = policy => {
  // eslint-disable-next-line
  const { clientId, ...policyWithoutClientId } = policy;
  return policyWithoutClientId;
};
