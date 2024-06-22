// import { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { UserContext } from '../../Context/UserContext.js';
// import axiosConnect from '../../Token/axios.js';
// import styled from 'styled-components';

// // Styled components for SignIn component
// const SignInWrapper = styled.div`
//   max-width: 340px;
//   margin: auto;
//   padding: 20px;
//   border: 1px solid #e0e0e0;
//   border-radius: 8px;
//   background-color: #ffffff;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   text-align: center;
// `;

// const LogoImage = styled.img`
//   width: 100px; /* Adjust width as needed */
//   margin-bottom: 20px;
// `;

// const SignInTitle = styled.h2`
//   font-size: 22px;
//   font-weight: bold;
//   color: #333333;
//   margin-bottom: 20px;
// `;

// const SignInForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const SignInInput = styled.input`
//   padding: 12px 16px;
//   margin-bottom: 16px;
//   border: 1px solid #e0e0e0;
//   border-radius: 6px;
//   font-size: 16px;
//   color: #333333;
// `;

// const SignInButton = styled.button`
//   padding: 14px 16px;
//   background-color: #ff5a5f;
//   color: #ffffff;
//   border: none;
//   border-radius: 6px;
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover {
//     background-color: #ff4247;
//   }
// `;

// const SignUpLink = styled.p`
//   margin-top: 20px;
//   font-size: 14px;
//   color: #666666;

//   a {
//     color: #ff5a5f;
//     text-decoration: none;

//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { user, signin } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Redirect if user is already logged in
//     if (user) {
//       navigate('/userprofile/places');
//     }
//   }, [user]); // Dependency array ensures this effect runs only when user or navigate changes

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const { data } = await axiosConnect.post('user/signin', {
//         email,
//         password,
//       });

//       signin(data.user); // Update user context state
//       toast.success('Sign-in successful!');
//       navigate('/userprofile/places'); // Navigate to home or another route upon successful sign-in
//     } catch (err) {
//       if (err.response) {
//         const { message } = err.response.data;
//         toast.error(message);
//       } else {
//         toast.error('Network error. Please try again later.');
//       }
//     }
//   }

//   return (
//     <SignInWrapper>
//       <LogoImage src="/airbnb-logo.png" alt="Airbnb Logo" />
//       <SignInTitle>Welcome Back!</SignInTitle>
//       <SignInForm onSubmit={handleSubmit}>
//         <SignInInput
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <SignInInput
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <SignInButton type="submit">Sign In</SignInButton>
//       </SignInForm>
//       <SignUpLink>
//         New around here? <Link to="/signup">Sign Up</Link>
//       </SignUpLink>
//     </SignInWrapper>
//   );
// }

// export default SignIn;

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../Context/UserContext.js';
import { getItemFromLS, setItemsInLS } from '../../Token/script.js';
import UserProfile from './UserProfile.js';
import axiosConnect from '../../Token/axios.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, signin } = useContext(UserContext);

  const navigate = useNavigate();

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

      toast.success('SignIn successfull!');
      setRedirect(true);
    }
    catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.log('Error: ', err.message);
      }
    }
  }

  if (redirect) {
    return navigate("/");
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
            <label className="form-label">Email address</label>
            <input type="email" className="form-control inp-bar" id="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control inp-bar" id="password" placeholder="Password"
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
          </div>
          <div className="btn-login">
            <button type="submit" className="btn-sign">Sign In</button>
          </div>
          <div>
            <div className="dropdown-divider"></div>
            <span className="dropdown-item heading-login App" href="">New around here? <Link className="text-decor" to={"/signup"}> Sign Up</Link></span>
          </div>
        </form>


      </div>
    </div>
  );
}

export default SignIn;
