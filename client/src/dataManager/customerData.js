const _apiUrl = '/api/customers';

export const fetchAllCustomers = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSingleCustomer = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
