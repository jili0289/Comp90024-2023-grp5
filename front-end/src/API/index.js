export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
export const getHealth = () => {
  return fetch("http://127.0.0.1:8000/couchdb/health").then((res) => res.json());
};
export const getSample = () => {
  return fetch("http://127.0.0.1:8000/couchdb/sample").then((res) => res.json());
};

export const getLgbt1 = () => {
  return fetch("http://127.0.0.1:8000/couchdb/lgbt-couples").then((res) => res.json());
};
