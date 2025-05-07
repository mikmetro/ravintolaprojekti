// Was 100% made by Deepseek R1.
import fetch from 'node-fetch';

// --- Configuration ---
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api/v1'; // Adjust if your API runs elsewhere
const uniqueId = Date.now();
const testUser = {
  email: `testuser_${uniqueId}@example.com`,
  password: `password_${uniqueId}`,
  name: `Test User ${uniqueId}`,
  phone: `+1-555-${String(uniqueId).slice(-7)}`, // Generate a somewhat valid phone
};
const testAddress = {
  country: 'Testland',
  city: 'Testville',
  postalcode: '12345',
  street: '123 Test Street',
  doorCode: 'Apt 4B',
};

let authToken = null;
let currentUserId = null;
let createdAddressId = null;
let firstItemId = null;
let firstItemInfo = null;

// --- Helper Functions ---
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  console.log(`\nSending ${method} request to ${API_BASE_URL}${endpoint}`);
  if (body) console.log('Request body:', JSON.stringify(body, null, 2));

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  const responseBody = await response.json().catch(() => ({})); // Gracefully handle empty/non-JSON responses

  console.log('Response Status:', response.status);
  console.log('Response Body:', JSON.stringify(responseBody, null, 2));

  if (!response.ok) {
    const errorMsg = responseBody.error?.message || responseBody.message || `API request failed with status ${response.status}`;
    console.error('API Error:', errorMsg);
    throw new Error(errorMsg);
  }
  return responseBody;
}

// --- Main Flow ---
async function runTestFlow() {
  try {
    // 1. Create User
    // Note: The current /api/v1/users endpoint creates an admin user.
    // If a customer role is needed, the API or this script might need adjustment.
    console.log('--- 1. Creating User ---');
    const createUserResponse = await apiRequest('/users', 'POST', testUser);
    currentUserId = createUserResponse.id;
    console.log(`User created with ID: ${currentUserId}`);

    // 2. Login User
    console.log('--- 2. Logging In User ---');
    const loginResponse = await apiRequest('/auth/login', 'POST', {
      email: testUser.email,
      password: testUser.password,
    });
    authToken = loginResponse.token;
    // currentUserId = loginResponse.user.id; // ID is also in loginResponse.user.id
    console.log(`User logged in. Token received. User ID: ${loginResponse.user.id}`);

    // 3. Fetch Menu Items
    console.log('--- 3. Fetching Menu Items ---');
    const menuItemsResponse = await apiRequest('/items', 'GET', null, authToken);
    // Find the first available item
    const categories = Object.keys(menuItemsResponse);
    if (categories.length > 0 && menuItemsResponse[categories[0]].length > 0) {
      firstItemInfo = menuItemsResponse[categories[0]][0];
      firstItemId = firstItemInfo.id;
      console.log(`Selected item for order: ${firstItemInfo.name} (ID: ${firstItemId})`);
    } else {
      console.error('No items found in the menu. Cannot proceed with creating an order.');
      return;
    }

    // 4. Add Address for User
    console.log('--- 4. Adding Address for User ---');
    const addAddressResponse = await apiRequest(`/users/${currentUserId}/addresses`, 'POST', testAddress, authToken);
    createdAddressId = addAddressResponse.id;
    console.log(`Address added with ID: ${createdAddressId}`);

    // 5. Create Order
    console.log('--- 5. Creating Order ---');
    const orderPayload = {
      address: createdAddressId, // Required for 'delivery' type
      type: 'delivery',
      items: {
        [firstItemId]: { // Dynamic key for item ID
          quantity: 1,
          info: firstItemInfo, // Send full item info as per API_ENDPOINTS.md example
        },
      },
    };
    const createOrderResponse = await apiRequest('/orders', 'POST', orderPayload, authToken);
    console.log(`Order placed with ID: ${createOrderResponse.orderId}`);

    // 6. Check User's Orders
    console.log("--- 6. Checking User's Orders ---");
    const myOrdersResponse = await apiRequest('/orders/my-orders', 'GET', null, authToken);
    console.log('User orders retrieved. Count:', myOrdersResponse.length);
    if (myOrdersResponse.length > 0) {
        console.log('Last order details:', JSON.stringify(myOrdersResponse[0], null, 2));
    }

    console.log('\n--- Test Flow Completed Successfully ---');

  } catch (error) {
    console.error('\n--- Test Flow Failed ---');
    console.error('Error:', error.message);
    if (error.response && error.response.data) {
      console.error('Error Details:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

runTestFlow();
