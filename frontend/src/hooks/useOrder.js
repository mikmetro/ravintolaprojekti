const useOrder = () => {
  async function fetchItemData(endpoint, options = {}) {
    const response = await fetch(
      `${import.meta.env.VITE_ORDERS_API}${endpoint}`,
      options
    );
    const data = await response.json();
    const json = {
      statusCode: response.status,
      data,
    };
    return json;
  }

  const getActiveOrders = async () => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
    };
    const items = await fetchItemData('/active', fetchOptions);
    return items;
  };

  const updateOrder = async (props, orderId) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({...props}),
    };
    const postResult = await fetchItemData('/' + orderId, fetchOptions);
    return postResult;
  };

  const placeOrder = async (props) => {
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

  const getOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
    };
    const items = await fetchItemData('/' + orderId, fetchOptions);
    return items;
  };

  const getMyOrders = async () => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer: ${token}`,
      },
    };
    const items = await fetchItemData('/my-orders', fetchOptions);
    return items;
  };

  return {
    getActiveOrders,
    updateOrder,
    placeOrder,
    getOrder,
    getMyOrders,
  };
};

export {useOrder};
