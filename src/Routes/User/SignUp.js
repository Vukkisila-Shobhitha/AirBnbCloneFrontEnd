import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosConnect from '../../Token/axios.js';

function SignUp() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();

    try {
      await axiosConnect.post('user/signup', {
        username,
        email,
        password,
      });
      toast.success('Registration successful. Now you can sign in.');
      setRedirect(true);
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error('Network error. Please try again later.');
      } else {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  if (redirect) {
    return navigate('/signin');
  }

  return (
    <div>
      <h2 className="App heading-login">Sign Up</h2>

      <div className="main-card-style">
        <form className="px-4 py-3" onSubmit={signupUser} action="POST">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control inp-bar"
              id="username"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control inp-bar"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control inp-bar"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-login">
            <button type="submit" className="btn-sign">
              Sign Up
            </button>
          </div>
          <div className="dropdown-divider"></div>
          <span className="dropdown-item heading-login App">
            Already have an account?{' '}
            <Link className="text-decor" to={'/signin'}>
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;