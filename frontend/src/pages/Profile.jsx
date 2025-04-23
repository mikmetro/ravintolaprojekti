import '../css/profile.css';

export default function Profile() {
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
    </section>
  );
}
