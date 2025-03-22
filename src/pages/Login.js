// import React, { useState } from 'react';
// import { login } from '../api/api';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login({ email, password });
//       console.log(data)
//       localStorage.setItem('token', data.accesstoken);
//       console.log('Saved token:', localStorage.getItem('token'))
//       navigate('/');
//     } catch (error) {
//       alert('Login failed! Please check your credentials.');
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input 
//             type="email" 
//             className="form-control" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input 
//             type="password" 
//             className="form-control" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>

//       <p className="mt-3">
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from 'react';
import { login } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Store specific errors
  const navigate = useNavigate();
  const { login: loginUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const data = await login({ email, password });
      console.log('API Response:', data);

      if (data && data.accesstoken) {
        loginUser(data); // Save token to AuthContext and localStorage
        navigate('/');
      }
    } catch (error) {
      console.log('Backend Error Response:', error.response?.data);

      if (error.response) {
        const data = error.response.data;

        if (data.errors) {
          setErrors(data.errors); // Handle field-specific errors
        } else if (data.error) {
          setErrors({ general: data.error }); // Handle general error
        }
      } else {
        setErrors({ general: 'Login failed! Please try again.' });
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* General Error Message */}
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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
