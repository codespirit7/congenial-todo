import React, { useState, ChangeEvent, FormEvent } from 'react';

import './Login.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    
  const [email, setEmail] = useState<string>('');
  
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/login`, {
        method: 'POST',
        credentials: 'include',
        
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        window.location.replace('http://localhost:3000/tasks');
      } else {
        console.log('Error', response.statusText);
      }
    } catch (err) {
      console.log('Error:', err);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <div className="login-section">
        <div className="login-wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-field">
              <input
                type="text"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
              <label>Enter your email</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
              <label>Enter your password</label>
            </div>

            <button type="submit" className='login-btn'>Login</button>
            <div className="login">
              <p>
                Don't have an account?
                <Link to = "/" className='link'>
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
