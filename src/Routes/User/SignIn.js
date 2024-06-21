import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext.js';
import { getItemFromLS, setItemsInLS } from '../../Token/script.js';
import UserProfile from './UserProfile.js';
import axiosConnect from '../../Token/axios.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signin } = useContext(UserContext);
  const navigate = useNavigate();

  // useEffect to redirect if user is already signed in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axiosConnect.post('user/signin', {
        email,
        password,
      });

      signin(data.user);
      setItemsInLS('token', data.token);
      axiosConnect.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${getItemFromLS('token')}`;

      toast.success('Sign-in successful!');
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
  }

  if (user) {
    return <UserProfile />;
  }

  return (
    <div>
      <h2 className="App heading-login">Welcome Back!</h2>

      <div className="main-card-style">
        <form className="px-4 py-3" onSubmit={handleSubmit}>
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
              Sign In
            </button>
          </div>
          <div>
            <div className="dropdown-divider"></div>
            <span className="dropdown-item heading-login App">
              New around here?{' '}
              <Link className="text-decor" to={'/signup'}>
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;