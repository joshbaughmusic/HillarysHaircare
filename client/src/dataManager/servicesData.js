const _apiUrl = '/api/services';

export const fetchAllServices = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
