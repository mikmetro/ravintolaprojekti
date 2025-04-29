const useItem = () => {
  async function fetchItemData(endpoint, options = {}) {
    const response = await fetch(
      `${import.meta.env.VITE_ITEMS_API}${endpoint}`,
      options
    );
    const json = await response.json();
    json.statusCode = response.status;
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

  const getItemById = async (id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    };
    const item = await fetchItemData('/' + id, fetchOptions);
    return item;
  };

  const postItem = async (props) => {
    const fetchOptions = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/', fetchOptions);
    return postResult;
  };
  const deleteItem = async (id) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    };
    const item = await fetchItemData('/' + id, fetchOptions);
    return item;
  };
  const putItem = async (props, id) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/' + id, fetchOptions);
    return postResult;
  };

  return {getItems, getItemById, postItem, deleteItem, putItem};
};

export {useItem};
