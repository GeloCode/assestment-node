import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';
import pagination from '../utils/pagination.js';
import filterByQuery from '../utils/filterByQuery.js';

export const getClients = (req, res) => {
  const { name } = req.query;
  const { user, clients, policies } = req;

  let clientsList;

  if (user.role === 'user') {
    clientsList = clientWithPolicies(
      clients.find(client => client.id === user.id),
      policies
    );
  } else {
    clientsList = name
      ? clientsWithPolicies(filterByQuery(name, 'name', clients), policies)
      : clientsWithPolicies(clients, policies);
  }

  if (clientsList.id || clientsList.length === 1) {
    return res.send(clientsList);
  }

  const limit = req.query.limit ? +req.query.limit : 10;
  const page = req.query.page ? +req.query.page : 1;

  return res.send(pagination(limit, page, clientsList));
};

export const getClientById = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;

  const requiredClient = clients.find((client) => client.id === id);
  if (requiredClient) {
    if (user.role === 'user') {
      if (user.id === requiredClient.id) {
        return res.send(clientWithPolicies(requiredClient, policies))
      }
      return res.status(HTTP_CODES.FORBIDDEN).send({
        code: HTTP_CODES.FORBIDDEN,
        message: `${HTTP_MESSAGES.FORBIDDEN} user`,
    });
    } else {
      return res.send(clientsWithPolicies([requiredClient], policies));
    }
  }
  return res.status(HTTP_CODES.NOT_FOUND).send({
    code: HTTP_CODES.NOT_FOUND,
    message: `Client for this ID: ${id} ${HTTP_MESSAGES.NOT_FOUND}`,
  });
};

const clientWithPolicies = (client, policies) => {
  let policiesByClientId = policies.find(policy => policy.clientId === client.id);
  client.policies = {};
  if (policiesByClientId) {
    client.policies = policyWithoutClientId(policiesByClientId);
  }
  return client;
};

const clientsWithPolicies = (clients, policies) => clients.map(client => clientWithPolicies(client, policies));

const policyWithoutClientId = policy => {
  // eslint-disable-next-line
  const { clientId, ...policyWithoutClientId } = policy;
  return policyWithoutClientId;
};
