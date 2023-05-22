export const getLgbtratio = () => {
  return fetch("/couchdb/lgbt-couples").then((res) => res.json());
};

export const getLgbtliving = () => {
  return fetch("/couchdb/couples-living").then((res) => res.json());
};

export const getStops = () => {
  return fetch("/couchdb/transport-stops").then((res) => res.json());
};

export const getLgbtTwit = () => {
  return fetch("/couchdb/twitter-lgbt").then((res) => res.json());
};

export const getRentTwit = () => {
  return fetch("/couchdb/twitter-rent").then((res) => res.json());
};

export const getTransTwit = () => {
  return fetch("/couchdb/twitter-transport").then((res) => res.json());
};

export const getRentWeekly = () => {
  return fetch("/couchdb/weekly-rent").then((res) => res.json());
};

export const getTransMast = () => {
  return fetch("/couchdb/mastodon-transport").then((res) => res.json());
};

export const getLgbtMast = () => {
  return fetch("/couchdb/mastodon-lgbt").then((res) => res.json());
};

export const getRentMast = () => {
  return fetch("/couchdb/mastodon-rent").then((res) => res.json());
};

export const getTransSenti = () => {
  return fetch("/couchdb/trans-combined").then((res) => res.json());
};

export const getLgbtSenti = () => {
  return fetch("/couchdb/lgbt-combined").then((res) => res.json());
};

export const getRentSenti = () => {
  return fetch("/couchdb/rent-combined").then((res) => res.json());
};
