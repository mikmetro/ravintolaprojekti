import '../css/profile.css';
import Button from '../components/ui/Button';
import useUserContext from '../hooks/contextproviders/useUserContext';
import {useState} from "react";
import Input from "../components/ui/Input.jsx";

export default function Profile() {
  const {user, handleLogout} = useUserContext();
  console.log(user);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO Send the updated user data to backend
    console.log("Saving data...\n", editData);
  };

  const isUnchanged = (
    editData.name === user.name &&
    editData.email === user.email &&
    editData.phone === user.phone
  );

  const handleCancel = () => {
    setEditData({ name: user.name, email: user.email, phone: user.phone });
    setIsEditing(false);
  };

  return (
    <section className="profile-wrapper">
      <div className="profile-details">
        {isEditing ? (
          <>
            <div className="auth-item">
              <p>Name</p>
              <Input
                name="name"
                value={editData.name}
                minLength={3}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="auth-item">
              <p>Email</p>
              <Input
                name="email"
                value={editData.email}
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="auth-item">
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
            <Button color="green" disabled={isUnchanged} onClick={handleSave} className="profile-save-button">
              Save
            </Button>
            <Button color="red" onClick={handleCancel} className="profile-cancel-button">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button color="black" onClick={() => setIsEditing(true)} className="profile-edit-button">
              Edit Profile
            </Button>
          </>
        )}
      </div>
      <div className="profile-orders">
        <h2 className="profile-orders-title">Tilaukseni</h2>
      </div>
      <div className="profile-control">
        <Button color="red" className="profile-logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </section>
  );
}
