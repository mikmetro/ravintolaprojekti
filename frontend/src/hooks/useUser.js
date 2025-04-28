async function fetchUsersData(endpoint, options = {}) {
  const response = await fetch(
    `${import.meta.env.VITE_USERS_API}${endpoint}`,
    options
  );
  const json = await response.json();
  json.statusCode = response.status;
  return json;
}

async function registerUser(credentials) {
  const fetchOptions = {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({...credentials}),
  };
  const registerResult = await fetchUsersData('/', fetchOptions);
  return registerResult;
}

export {registerUser};
