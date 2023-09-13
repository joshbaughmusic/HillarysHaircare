const _apiUrl = '/api/appointments';

export const fetchAllAppointments = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
