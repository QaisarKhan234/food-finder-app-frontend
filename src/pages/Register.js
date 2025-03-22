import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Store specific errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      await register({ email, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.log("Backend Error Response:", error.response?.data);

      if (error.response) {
        const data = error.response.data;

        if (data.errors) {
          setErrors(data.errors); // Handle field-specific errors
        } else if (data.error) {
          setErrors({ general: data.error }); // Handle general error
        }
      } else {
        setErrors({ general: 'Registration failed! Please try again.' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {errors.general && <div className="alert alert-danger">{errors.general}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;

