const baseUrl = 'http://localhost:4000';

function checkResStatus(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`);
}

function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResStatus);
}

function authentication(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResStatus);
}

function getToken(jwt) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResStatus);
}

export { register, authentication, getToken };
