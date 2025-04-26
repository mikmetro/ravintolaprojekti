import '../css/profile.css';
import Button from '../components/ui/Button';
import {useNavigate} from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <section className="profile-wrapper">
      <div className="profile-details">
        <img
          className="profile-details-image"
          src="https://placehold.co/96x96"
        />
        <p className="profile-details-name">Antti Koivu</p>
      </div>
      <div className="profile-orders">
        <h2 className="profile-orders-title">Tilaukseni</h2>
      </div>
      <div className="profile-control">
        <Button color="red" className="profile-logout" onClick={logout}>
          Logout
        </Button>
      </div>
    </section>
  );
}
