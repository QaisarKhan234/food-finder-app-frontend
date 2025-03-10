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
//       // localStorage.setItem('token', data.accesstoken);
//       // console.log('Saved token:', localStorage.getItem('token'))
//       navigate('/favorites');
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
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginUser } = useContext(AuthContext); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      console.log('API Response:', data); // Double-check the API response

      if (data && data.accesstoken) {
        loginUser(data); // Save token to AuthContext and localStorage
        console.log('Saved token:', localStorage.getItem('token')); // Verify token is saved
        navigate('/');
      } else {
        console.error('No access token received.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
