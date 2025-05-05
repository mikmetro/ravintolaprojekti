import '../css/home.css';
import {useEffect, useState} from 'react';
import {useHSL} from '../hooks/useHSL';
import Timeline from '../components/Timeline';
import Button from '../components/ui/Button';
import {useNavigate} from 'react-router-dom';
export default function Home() {
  const {getRoute} = useHSL();
  const [route, setRoute] = useState();
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  // Function to load the route based on coordinates
  const loadRoute = async (latitude, longitude) => {
    const routeData = await getRoute(latitude, longitude);
    setRoute(routeData);
  };

  // Function to get the user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setUserLocation({latitude, longitude});
        },
        (error) => {
          console.log('Error getting location: ', error);
          // Fallback location (e.g., Helsinki) in case of error
          setUserLocation({
            latitude: 60.17192819570898,
            longitude: 24.94142314643349,
          });
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      // Fallback location if geolocation is not supported
      setUserLocation({
        latitude: 60.17192819570898,
        longitude: 24.94142314643349,
      });
    }
  };

  useEffect(() => {
    if (userLocation) {
      loadRoute(userLocation.latitude, userLocation.longitude);
    } else {
      getUserLocation();
    }
  }, [userLocation]);

  return (
    <section className="home-main">
      <div className="home-welcome">
        <h1 className="home-title">Tervetuloa!</h1>

        <div className="home-actions">
          <Button color="green" onClick={() => navigate('/menu')}>
            Avaa ruokalista
          </Button>
        </div>
      </div>
      <div className="home-timeline">
        {route ? (
          <>
            <h2>Nopeasti meille julkisilla juuri sieltä missä olet!</h2>
            <Timeline route={route.data.data.plan.itineraries[0]} />
          </>
        ) : null}
      </div>
    </section>
  );
}
