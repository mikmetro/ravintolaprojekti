import {NavLink, useNavigate} from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {useState} from 'react';
import useUserContext from '../hooks/contextproviders/useUserContext';

export default function Register() {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();
  const {handleRegister, user} = useUserContext();

  const handleFormInput = (key, value) =>
    setFormFields({...formFields, [key]: value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerResult = await handleRegister(formFields);
    if (registerResult.statusCode === 200) {
      navigate('/profile');
    }
  };

  return (
    <section className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="auth-item">
          <p>Name</p>
          <Input
            minLength={3}
            maxLength={100}
            onChange={(e) => handleFormInput('name', e.target.value)}
          />
        </div>
        <div className="auth-item">
          <p>Email</p>
          <Input
            type="email"
            onChange={(e) => handleFormInput('email', e.target.value)}
          />
        </div>
        <div className="auth-item">
          <p>Phone number</p>
          <Input
            type="tel"
            onChange={(e) => handleFormInput('phone', e.target.value)}
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
        <Button color="green">Register</Button>
        <span>
          Onko sinulla jo tili? <NavLink to="/login">Kirjaudu tästä</NavLink>
        </span>
      </form>
    </section>
  );
}
