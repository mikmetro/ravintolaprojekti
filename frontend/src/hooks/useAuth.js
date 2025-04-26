async function fetchAuthData(endpoint, options = {}) {
  const response = await fetch(
    `${import.meta.env.VITE_AUTH_API}${endpoint}`,
    options
  );
  const json = await response.json();
  json.statusCode = response.status;
  return json;
}

async function isTokenValid() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const fetchOptions = {
    headers: {
      authorization: `Bearer: ${token}`,
    },
  };
  const tokenResult = await fetchAuthData('/me', fetchOptions);
  console.log(tokenResult);
  return tokenResult.statusCode === 200;
}

async function loginUser(credentials) {
  const fetchOptions = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({...credentials}),
  };
  const loginResult = await fetchAuthData('/login', fetchOptions);
  return loginResult;
}

export {isTokenValid, loginUser};
