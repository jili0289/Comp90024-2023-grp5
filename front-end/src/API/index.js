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

export const getLgbtratio = () => {
  return fetch("http://127.0.0.1:8000/couchdb/lgbt-couples").then((res) => res.json());
};

export const getLgbtliving = () => {
  return fetch("http://127.0.0.1:8000/couchdb/couples-living").then((res) => res.json());
};

export const getStops = () => {
  return fetch("http://127.0.0.1:8000/couchdb/transport-stops").then((res) => res.json());
};

export const getLgbtTwit = () => {
  return fetch("http://127.0.0.1:8000/couchdb/twitter-lgbt").then((res) => res.json());
};

export const getRentTwit = () => {
  return fetch("http://127.0.0.1:8000/couchdb/twitter-rent").then((res) => res.json());
};

export const getTransTwit = () => {
  return fetch("http://127.0.0.1:8000/couchdb/twitter-transport").then((res) => res.json());
};

export const getRentWeekly = () => {
  return fetch("http://127.0.0.1:8000/couchdb/weekly-rent").then((res) => res.json());
};

