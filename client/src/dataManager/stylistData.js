const _apiUrl = '/api/stylists';

export const fetchAllStylists = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchAllActiveStylists = () => {
  return fetch(`${_apiUrl}/active`).then((res) => res.json());
};

export const fetchSingleStylist = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};