const _apiUrl = '/api/appointments';

export const fetchAllAppointments = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSingleAppointment = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};
