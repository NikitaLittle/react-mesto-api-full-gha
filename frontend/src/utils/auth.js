const baseUrl = 'https://api.mesto.nomoredomainsmonster.ru';

function checkResStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`${res.status} ${res.statusText}`);
  }
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
    // credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then(checkResStatus)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
    });
}

function getToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // credentials: 'include',
  }).then(checkResStatus);
}

export { register, authentication, getToken };
