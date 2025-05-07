async function fetchAuthData(endpoint, options = {}) {
  const response = await fetch(
    `${import.meta.env.VITE_AUTH_API}${endpoint}`,
    options
  );
  let json = {};
  try {
    json = await response.json();
  } catch {}
  json.statusCode = response.status;
  return json;
}

async function checkCurrentToken() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const fetchOptions = {
    headers: {
      authorization: `Bearer: ${token}`,
    },
  };
  const tokenResult = await fetchAuthData('/me', fetchOptions);
  return tokenResult;
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

export {checkCurrentToken, loginUser};
