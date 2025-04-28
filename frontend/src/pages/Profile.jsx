import '../css/profile.css';
import Button from '../components/ui/Button';
import useUserContext from '../hooks/contextproviders/useUserContext';

export default function Profile() {
  const {user, handleLogout} = useUserContext();
  console.log(user);

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
        <Button color="red" className="profile-logout" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </section>
  );
}
