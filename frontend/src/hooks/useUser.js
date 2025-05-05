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

const getUsers = async () => {
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer: ${token}`,
    },
  };
  const usersResult = await fetchUsersData('/', fetchOptions);
  return usersResult;
};

const putUser = async (props, id) => {
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer: ${token}`,
    },
    body: JSON.stringify({...props}),
  };
  const postResult = await fetchUsersData('/' + id, fetchOptions);
  return postResult;
};

const deleteUser = async (id) => {
  const token = localStorage.getItem('token');
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer: ${token}`,
    },
  };
  const postResult = await fetchUsersData('/' + id, fetchOptions);
  return postResult;
};

export {registerUser, getUsers, putUser, deleteUser};
