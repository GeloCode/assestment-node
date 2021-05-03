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

  const clientById = clients.find((client) => client.id === id);
  if (clientById) {
    if (user.role === 'user') {
      if (user.id === clientById.id) {
        return res.send(clientWithPolicies(clientById, policies))
      }
      return res.status(HTTP_CODES.FORBIDDEN).send({
        code: HTTP_CODES.FORBIDDEN,
        message: `${HTTP_MESSAGES.FORBIDDEN} user`,
    });
    } else {
      return res.send(clientsWithPolicies([clientById], policies));
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

export const getClientPoliciesById = (req, res) => {
  const { id } = req.params;
  const { user, clients, policies } = req;

  const clientById = clients.find((client) => client.id === id);
  if (clientById) {
    const policiesList = policies.filter(policy => policy.clientId === id);

    if (user.role === 'user') {
      if (user.id === clientById.id) {
        return res.send(policiesWithoutClientId(policiesList))
      }
      return res.status(HTTP_CODES.FORBIDDEN).send({
        code: HTTP_CODES.FORBIDDEN,
        message: `${HTTP_MESSAGES.FORBIDDEN} client's policies`,
      });
    } else {
      return res.send(policiesWithoutClientId(policiesList));
    }
}
  return res.status(HTTP_MESSAGES.NOT_FOUND).send({
    code: HTTP_MESSAGES.NOT_FOUND,
    message: `${HTTP_MESSAGES.NOT_FOUND} this client with ID: ${id}`,
  });
};

const clientsWithPolicies = (clients, policies) => clients.map(client => clientWithPolicies(client, policies));

const policiesWithoutClientId = (policies) => policies.map(policyWithoutClientId);

const policyWithoutClientId = policy => {
  // eslint-disable-next-line
  const { clientId, ...policyWithoutClientId } = policy;
  return policyWithoutClientId;
};
