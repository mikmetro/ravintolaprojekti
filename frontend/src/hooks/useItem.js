const useItem = () => {
  async function fetchItemData(endpoint, options = {}) {
    const response = await fetch(
      `${import.meta.env.VITE_ITEMS_API}${endpoint}`,
      options
    );
    const data = await response.json();
    const json = {
      statusCode: response.status,
      data,
    };
    return json;
  }

  const getItems = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    };
    const items = await fetchItemData('/', fetchOptions);
    return items;
  };
  const getAllItems = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    };
    const items = await fetchItemData('/all', fetchOptions);
    return items;
  };

  const getItemById = async (id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    };
    const item = await fetchItemData('/' + id, fetchOptions);
    return item;
  };

  const postItem = async (props) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/', fetchOptions);
    return postResult;
  };
  const deleteItem = async (id) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
    };
    const item = await fetchItemData('/' + id, fetchOptions);
    return item;
  };
  const putItem = async (props, id) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/' + id, fetchOptions);
    return postResult;
  };

  const getCategories = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    };
    const items = await fetchItemData('/categories', fetchOptions);
    return items;
  };
  const putCategory = async (props, id) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/categories/' + id, fetchOptions);
    return postResult;
  };

  return {
    getItems,
    getAllItems,
    getItemById,
    postItem,
    deleteItem,
    putItem,
    getCategories,
    putCategory,
  };
};

export {useItem};
