import React, { useState } from 'react';
import { signIn } from '../Api';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const history = history();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      localStorage.setItem('user', JSON.stringify(response.data));
      history.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;
