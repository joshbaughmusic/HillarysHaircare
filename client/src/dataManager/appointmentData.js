const _apiUrl = '/api/appointments';

export const fetchAllAppointments = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSingleAppointment = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const postAppointment = (appointment) => {
  return fetch(`${_apiUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  }).then((res) => res.json());
};

export const updateAppointment = (appointment, id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  })
};

export const cancelAppointment = (id) => {
  return fetch(`${_apiUrl}/${id}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
};