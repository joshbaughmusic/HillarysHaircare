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

export const postStylist = (stylist) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify(stylist)
  }).then((res) => res.json())
}

export const deactivateStylist = (id) => {
  return fetch(`${_apiUrl}/${id}/deactivate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
};