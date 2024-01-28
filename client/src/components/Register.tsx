import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from "react-router-dom";
import './Register.css';

const Register: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        window.location.replace('http://localhost:3000/login');
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
      <div className="reg-section">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
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

            <button type="submit" className='reg-btn'>Register</button>
            <div className="register">
              <p>
                Already have an account?
                <Link to = "/login" >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
