import '../css/profile.css';
import Button from '../components/ui/Button';
import useUserContext from '../hooks/contextproviders/useUserContext';
import {useEffect, useState} from 'react';
import Input from '../components/ui/Input.jsx';
import {useOrder} from '../hooks/useOrder.js';
import ProfileAddressItem from '../components/ProfileAddressItem.jsx';
import {useNavigate} from 'react-router-dom';

export default function Profile() {
  const {
    user,
    handleLogout,
    handleUpdateUser,
    handleGetAddresses,
    handleAddAddress,
    handleUpdateAddress,
    refreshUser,
    handleDeleteAddress,
  } = useUserContext();
  const navigate = useNavigate();

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
    handleUpdateUser(editData, user.id).then(() => {
      setIsEditing(false);
      refreshUser();
    });
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
      if (addresses && Array.isArray(addresses)) {
        const mappedAddresses = addresses.map((address) => ({
          ...address,
          doorCode: address.door_code, // Backend sends door_code
        }));
        setUserAddresses(mappedAddresses);
      } else {
        setUserAddresses([]);
      }
    });
  }, [handleGetAddresses, user.id]);

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
        const response = await handleAddAddress(editAddressData, user.id);
        if (response && response.statusCode === 201) {
          const newAddress = {
            id: response.id,
            ...editAddressData,
          };
          updatedAddresses.push(newAddress);
          success = true;
        }
      } else {
        const response = await handleUpdateAddress(editAddressData, user.id);
        if (
          response &&
          (response.statusCode === 200 || response.statusCode === 204)
        ) {
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
  const ORDERS_PER_PAGE = 4;
  const {getMyOrders} = useOrder();
  const [orders, setOrders] = useState([]);
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [orderOffset, setOrderOffset] = useState(ORDERS_PER_PAGE);

  useEffect(() => {
    getMyOrders(user.id).then((orders) => {
      if (orders && orders.data.length > 0) {
        setOrders(orders.data);
      } else {
        console.log('No orders found');
      }
    });
  }, []);

  useEffect(() => {
    setVisibleOrders(orders.slice(0, ORDERS_PER_PAGE));
    setOrderOffset(ORDERS_PER_PAGE);
  }, [orders]);

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
              <p>Nimi</p>
              <Input
                name="name"
                value={editData.name}
                minLength={3}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="profile-details-info">
              <p>Sähköposti</p>
              <Input
                name="email"
                value={editData.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="profile-details-info">
              <p>Puhelinnumero</p>
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
              <p className="profile-details-info">Nimi</p>
              <p className="profile-details-item">{user.name}</p>
            </div>
            <div>
              <p className="profile-details-info">Sähköposti</p>
              <p className="profile-details-item">{user.email}</p>
            </div>
            <div>
              <p className="profile-details-info">Puhelinnumero</p>
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
              Peruuta
            </Button>
            <Button
              color="green"
              disabled={isUnchanged}
              onClick={handleSave}
              className="profile-save-button"
            >
              Tallenna
            </Button>
          </>
        ) : (
          <>
            <Button
              color="black"
              onClick={() => setIsEditing(true)}
              className="profile-edit-button"
            >
              Muokkaa profiilia
            </Button>
          </>
        )}
      </div>
      <div className="profile-addresses">
        <h2 className="profile-addresses-title">Osoitteet</h2>
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
              Lisää osoite
            </Button>
          )}
        </div>
      </div>
      <div className="profile-control">
        <Button color="red" className="profile-logout" onClick={handleLogout}>
          Kirjaudu ulos
        </Button>
      </div>
      <div className="profile-orders">
        <h2 className="profile-orders-title">Tilaukseni</h2>
        <br />
        <div className="order-list">
          {visibleOrders.map((order) => (
            <div key={order.id} className="order-card">
              <p>Tilauksen numero: {order.id}</p>
              <p>Tila: {order.status}</p>
              <p>Kokonaishinta: €{order.total}</p>
              <Button
                color="green"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                Mene tilaukseen
              </Button>
            </div>
          ))}
        </div>
        {visibleOrders.length < orders.length && (
          <div className="load-more-button">
            <Button onClick={handleLoadMore} color="yellow">
              Lataa lisää tilauksia
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
