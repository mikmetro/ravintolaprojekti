import {NavLink, useNavigate} from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import '../css/auth.css';
import {useState} from 'react';
import {loginUser} from '../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormInput = (key, value) =>
    setFormFields({...formFields, [key]: value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginResult = await loginUser(formFields);
    if (loginResult.statusCode !== 200 && loginResult.error)
      setErrorMessage('Invalid credentials!');
    else if (loginResult.statusCode === 200) {
      localStorage.setItem('token', loginResult.token);
      navigate('/profile');
    }
  };

  return (
    <section className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="auth-item">
          <p>Email</p>
          <Input
            type="email"
            onChange={(e) => handleFormInput('email', e.target.value)}
          />
        </div>
        <div className="auth-item">
          <p>Password</p>
          <Input
            type="password"
            minLength={8}
            onChange={(e) => handleFormInput('password', e.target.value)}
          />
        </div>
        {errorMessage && <p className="auth-error">{errorMessage}</p>}
        <Button color="green">Login</Button>
        <span>
          Eikö sinulla ole vielä tiliä?{' '}
          <NavLink to="/register">Rekisteröi tästä</NavLink>
        </span>
      </form>
    </section>
  );
}
