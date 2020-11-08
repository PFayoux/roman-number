const Clients = {
  list: [],

  push: (c) => {
    Clients.list.push(c);
  },

  remove: (c) => {
    Clients.list = Clients.list.filter((client) => client.id !== c.id);
  },

  find: (clientId) => {
    return Clients.list.find((client) => client.id === clientId);
  },
};

export default Clients;
