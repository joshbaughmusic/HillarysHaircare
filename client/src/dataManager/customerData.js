const _apiUrl = '/api/customers';

export const fetchAllCustomers = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
