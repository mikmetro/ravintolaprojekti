import '../css/profile.css';
import Button from '../components/ui/Button';
import useUserContext from '../hooks/contextproviders/useUserContext';
import {useEffect, useState} from 'react';
import Input from '../components/ui/Input.jsx';
import {useOrder} from "../hooks/useOrder.js";
import ProfileAddressItem from "../components/ProfileAddressItem.jsx";

export default function Profile() {
  const {user, handleLogout, handleUpdateUser, handleGetAddresses, handleAddAddress, handleUpdateAddress, handleDeleteAddress} = useUserContext();
  console.log(user);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setEditData({...editData, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    console.log('Saving User data...\n', editData);
    handleUpdateUser(editData, user.id);
  };

  const isUnchanged =
    editData.name === user.name &&
    editData.email === user.email &&
    editData.phone === user.phone;

  const handleCancel = () => {
    setEditData({name: user.name, email: user.email, phone: user.phone});
    setIsEditing(false);
  };


  // Addresses
  const [saving, setSaving] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  useEffect(() => {
    handleGetAddresses(user.id).then((addresses) => {
      setUserAddresses(addresses || []);
    });
  }, [handleGetAddresses, user.id]);
  console.log('userAdresses: ', userAddresses);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editAddressData, setEditAddressData] = useState({
    country: '',
    city: '',
    postalcode: '',
    street: '',
    doorCode: '',
  });
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditAddressData(userAddresses[index]);
  };

  const handleSaveAddress = async () => {
    const updatedAddresses = [...userAddresses];
    let success = false;
    setSaving(true);

    try {
      if (editingIndex === userAddresses.length) {
        const response = await handleAddAddress(editAddressData, user.id)
        if (response && response.statusCode === 201) {
          console.log("RESPONSE ID: " + response.id)
          const newAddress = {
            id: response.id,
            ...editAddressData,
          }
          updatedAddresses.push(newAddress);
          success = true;
        }
      } else {
        console.log('EDITING ADDRESS:', editAddressData);
        const response = await handleUpdateAddress(editAddressData, user.id);
        if (response && (response.statusCode === 200 || response.statusCode === 204)) {
          updatedAddresses[editingIndex] = editAddressData;
          success = true;
        }
      }
    } catch (error) {
      console.error('Error saving address:', error);
    }

    if (success) {
      setUserAddresses(updatedAddresses);
      setEditingIndex(null);
    } else {
      alert('Failed to save address. Please try again.');
    }
    setSaving(false);
  };

  const handleAddNewAddress = () => {
    setEditAddressData({
      country: '',
      city: '',
      postalcode: '',
      street: '',
      doorCode: '',
    });
    setEditingIndex(userAddresses.length);
  };
  const handleAddressDelete = (index) => {
    const updatedAddresses = userAddresses.filter((_, i) => i !== index);
    setUserAddresses(updatedAddresses);

    handleDeleteAddress(user.id, userAddresses[index].id);
  };

  // Orders

  const {getMyOrders} = useOrder();
  useEffect(() => {
    getMyOrders(user.id).then((orders) => {
      console.log('Orders: ', orders);
    });
  })

  const ORDERS_PER_PAGE = 4;
  // Mock data for orders
  const orders = [
    { id: 0, items: [{ id: 1, name: 'Product 1', quantity: 2, price: 20 }], totalPrice: 40 },
    { id: 1, items: [{ id: 2, name: 'Product 2', quantity: 1, price: 15 }, { id: 1, name: 'Product 1', quantity: 2, price: 20 }], totalPrice: 55 },
    { id: 2, items: [{ id: 3, name: 'Product 3', quantity: 3, price: 10 }], totalPrice: 30 },
    { id: 3, items: [{ id: 4, name: 'Product 4', quantity: 1, price: 25 }], totalPrice: 25 },
    { id: 4, items: [{ id: 5, name: 'Product 5', quantity: 2, price: 12 }], totalPrice: 24 },
    { id: 5, items: [{ id: 1, name: 'Product 1', quantity: 1, price: 20 }, { id: 6, name: 'Product 6', quantity: 2, price: 18 }], totalPrice: 56 },
    { id: 6, items: [{ id: 7, name: 'Product 7', quantity: 4, price: 8 }, { id: 8, name: 'Product 8', quantity: 1, price: 22 }], totalPrice: 54 },
    { id: 7, items: [{ id: 2, name: 'Product 2', quantity: 3, price: 15 }], totalPrice: 45 },
    { id: 8, items: [{ id: 9, name: 'Product 9', quantity: 5, price: 6 }, { id: 4, name: 'Product 4', quantity: 1, price: 25 }], totalPrice: 55 },
    { id: 9, items: [{ id: 10, name: 'Product 10', quantity: 2, price: 30 }], totalPrice: 60 },
    { id: 10, items: [{ id: 3, name: 'Product 3', quantity: 1, price: 10 }, { id: 7, name: 'Product 7', quantity: 2, price: 8 }, { id: 6, name: 'Product 6', quantity: 1, price: 18 }], totalPrice: 44 },
    { id: 11, items: [{ id: 5, name: 'Product 5', quantity: 3, price: 12 }, { id: 9, name: 'Product 9', quantity: 2, price: 6 }], totalPrice: 48 },
    { id: 12, items: [{ id: 8, name: 'Product 8', quantity: 1, price: 22 }], totalPrice: 22 },
    { id: 13, items: [{ id: 1, name: 'Product 1', quantity: 2, price: 20 }, { id: 10, name: 'Product 10', quantity: 1, price: 30 }], totalPrice: 70 },
    { id: 14, items: [{ id: 2, name: 'Product 2', quantity: 4, price: 15 }], totalPrice: 60 },
    { id: 15, items: [{ id: 3, name: 'Product 3', quantity: 2, price: 10 }, { id: 4, name: 'Product 4', quantity: 1, price: 25 }], totalPrice: 45 },
    { id: 16, items: [{ id: 5, name: 'Product 5', quantity: 1, price: 12 }, { id: 6, name: 'Product 6', quantity: 2, price: 18 }], totalPrice: 48 },
    { id: 17, items: [{ id: 7, name: 'Product 7', quantity: 3, price: 8 }, { id: 8, name: 'Product 8', quantity: 1, price: 22 }], totalPrice: 46 },
    { id: 18, items: [{ id: 9, name: 'Product 9', quantity: 2, price: 6 }, { id: 10, name: 'Product 10', quantity: 1, price: 30 }], totalPrice: 42 },
    { id: 19, items: [{ id: 1, name: 'Product 1', quantity: 1, price: 20 }, { id: 2, name: 'Product 2', quantity: 2, price: 15 }], totalPrice: 50 },
    { id: 20, items: [{ id: 3, name: 'Product 3', quantity: 1, price: 10 }, { id: 4, name: 'Product 4', quantity: 1, price: 25 }], totalPrice: 35 },
    { id: 21, items: [{ id: 5, name: 'Product 5', quantity: 2, price: 12 }, { id: 6, name: 'Product 6', quantity: 1, price: 18 }], totalPrice: 42 },
    { id: 22, items: [{ id: 7, name: 'Product 7', quantity: 4, price: 8 }, { id: 8, name: 'Product 8', quantity: 1, price: 22 }], totalPrice: 54 },
    { id: 23, items: [{ id: 9, name: 'Product 9', quantity: 3, price: 6 }, { id: 10, name: 'Product 10', quantity: 1, price: 30 }], totalPrice: 48 },
    { id: 24, items: [{ id: 1, name: 'Product 1', quantity: 2, price: 20 }, { id: 2, name: 'Product 2', quantity: 1, price: 15 }], totalPrice: 55 },
  ];
  const [visibleOrders, setVisibleOrders] = useState(orders.slice(0, ORDERS_PER_PAGE));
  const [orderOffset, setOrderOffset] = useState(ORDERS_PER_PAGE);
  const handleLoadMore = () => {
    const nextOffset = orderOffset + ORDERS_PER_PAGE;
    const newVisible = orders.slice(0, nextOffset);
    setVisibleOrders(newVisible);
    setOrderOffset(nextOffset);
  };

  return (
    <section className="profile-wrapper">
      <div className="profile-details">
        {isEditing ? (
          <>
            <div className="profile-details-info">
              <p>Name</p>
              <Input
                name="name"
                value={editData.name}
                minLength={3}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="profile-details-info">
              <p>Email</p>
              <Input
                name="email"
                value={editData.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="profile-details-info">
              <p>Phone Number</p>
              <Input
                name="phone"
                value={editData.phone}
                type="tel"
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="profile-details-info">Name</p>
              <p className="profile-details-item">{user.name}</p>
            </div>
            <div>
              <p className="profile-details-info">Email</p>
              <p className="profile-details-item">{user.email}</p>
            </div>
            <div>
              <p className="profile-details-info">Phone Number</p>
              <p className="profile-details-item">{user.phone}</p>
            </div>
          </>
        )}
      </div>
      <div className="profile-edit">
        {isEditing ? (
          <>
            <Button
              color="red"
              onClick={handleCancel}
              className="profile-cancel-button"
            >
              Cancel
            </Button>
            <Button
              color="green"
              disabled={isUnchanged}
              onClick={handleSave}
              className="profile-save-button"
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Button
              color="black"
              onClick={() => setIsEditing(true)}
              className="profile-edit-button"
            >
              Edit Profile
            </Button>
          </>
        )}
      </div>
      <div className="profile-addresses">
        <h2 className="profile-addresses-title">Addresses</h2>
        <div className="address-list">
          {userAddresses.map((address, index) => (
            <ProfileAddressItem
              key={index}
              address={editingIndex === index ? editAddressData : address}
              isEditing={editingIndex === index}
              onChange={(updated) => setEditAddressData(updated)}
              onEdit={() => handleEditClick(index)}
              onDelete={() => handleAddressDelete(index)}
              onSave={handleSaveAddress}
              onCancel={() => setEditingIndex(null)}
              saving={saving}
            />
          ))}
          {editingIndex === userAddresses.length && (
            <ProfileAddressItem
              address={editAddressData}
              isEditing
              isNew
              onChange={(updated) => setEditAddressData(updated)}
              onSave={handleSaveAddress}
              onCancel={() => setEditingIndex(null)}
              saving={saving}
            />
          )}
          {editingIndex === null && (
            <Button color="green" onClick={handleAddNewAddress}>
              Add Address
            </Button>
          )}
        </div>
      </div>
      <div className="profile-control">
        <Button color="red" className="profile-logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="profile-orders">
        <h2 className="profile-orders-title">Tilaukseni</h2>
        <br/>
        <div className="order-list">
          {visibleOrders.map((order) => (
            <div key={order.id} className="order-card">
              <p>Order ID: {order.id}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} (x{item.quantity}) - €{item.price}
                  </li>
                ))}
              </ul>
              <p>Total Price: €{order.totalPrice}</p>
            </div>
          ))}
        </div>
        {visibleOrders.length < orders.length && (
          <div className="load-more-button">
            <Button onClick={handleLoadMore} color="yellow">
              Load More Orders
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
