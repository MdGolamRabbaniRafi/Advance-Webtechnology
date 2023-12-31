import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import HeaderForPage from './Layout/Header';
import FooterForPage from './Layout/footer';
import NavigationBar from './Layout/navbar';
import { useAuth } from '../pages/utils/authentication';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address');
      return;
    }

    setError('');

    try {
      const chckUser = await axios.get(
        `http://localhost:3000/Doctor/searchUser/${email}`
      );
      if (chckUser.data === 'Doctor') {
        try {
          const response = await axios.post(
            `http://localhost:3000/Doctor/signin/`,
            {
              email,
              password,
            },
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              withCredentials: true,
            }
          );

          console.log('Backend Response:', response.data);

          if (response.data === 'Login successful') {
            console.log("Logoooooooo cookieeeeeeee :"+document.cookie)
            // Fetch the userRole from the response or set it based on your logic
           // const userRole = response.data.userRole; // Adjust this line

            login(email, document.cookie);
            router.push('../Doctor/LoggedinPage');
            // if (userRole === 'Admin') {
            //   router.push('../Admin/Admin_LoggedinPage');
            // } else if (userRole === 'Doctor') {
            //   router.push('../Doctor/LoggedinPage');
            // } else if (userRole === 'Patient') {
            //   router.push('../Patient/Patient_LoggedinPage');
            // }
          } else if (
            response.data === 'Already logged in an account. Please log out first.'
          ) {
            setError('Already logged in an account. Please log out first.');
          //  router.push('./Doctor/LoggedinPage')
          } else {
            setError('Incorrect Password or Email');
          }
        } catch (error) {
          console.error('Login Failed:', error);
          setError(
            'An error occurred during login. Please check your email and password again.'
          );
        }
      }
      else if(chckUser.data === 'Patient')
      {
        try {
          const response = await axios.post(
            `http://localhost:3000/Patient/signin/`,
            {
              email,
              password,
            },
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              withCredentials: true,
            }
          );

          console.log('Backend Response:', response.data);

          if (response.data === 'Login successful') {
            // Fetch the userRole from the response or set it based on your logic
         //   const userRole = response.data.userRole; // Adjust this line

            login(email, document.cookie);
            //router.push('../Doctor/LoggedinPage');
            // if (userRole === 'Admin') {
            //   router.push('../Admin/Admin_LoggedinPage');
            // } else if (userRole === 'Doctor') {
            //   router.push('../Doctor/LoggedinPage');
            // } else if (userRole === 'Patient') {
               router.push('../Patient/Patient_LoggedinPage');
            // }
          } else if (
            response.data === 'Already logged in an account. Please log out first.'
          ) {
            setError('Already logged in an account. Please log out first.');
          } else {
            setError('Incorrect Password or Email');
          }
        } catch (error) {
          console.error('Login Failed:', error);
          setError(
            'An error occurred during login. Please check your email and password again.'
          );
        }



      }
      else if(chckUser.data == 'Admin')
      {
        try {
          const response = await axios.post(
            `http://localhost:3000/Admin/signin/`,
            {
              email,
              password,
            },
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              withCredentials: true,
            }
          );

          console.log('Backend Response:', response.data);

          if (response.data === 'Login successful') {
            // Fetch the userRole from the response or set it based on your logic
            const userRole = response.data.userRole; // Adjust this line

            login(email, document.cookie);
            //router.push('../Doctor/LoggedinPage');
            // if (userRole === 'Admin') {
               router.push('../Admin/Admin_LoggedinPage');
            // } else if (userRole === 'Doctor') {
            //   router.push('../Doctor/LoggedinPage');
            // } else if (userRole === 'Patient') {
              // router.push('../Patient/Patient_LoggedinPage');
            // }
          }
          else if (
            response.data === 'Already logged in an account. Please log out first.'
          ) {
            setError('Already logged in an account. Please log out first.');
          } else {
            setError('Incorrect Password or Email');
          }
        } catch (error) {
          console.error('Login Failed:', error);
          setError(
            'An error occurred during login. Please check your email and password again.'
          );
        }




    }
    else if(chckUser.data=='Not found')
    {
      setError('User Not found')
    }
  }
     catch (error) {
      console.error('Login Failed:', error);
      setError(
        'An error occurred during login. Please check your email and password again.'
      );
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };
  return (
    <>
      <title>Sign In</title>
    
      <div className="hero min-h-screen bg-slate-900">
        <div className="hero-content flex-col lg:flex-row-reverse">
        
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
           
            <form onSubmit={handleSubmit} className="card-body">
              <center>
            <HeaderForPage></HeaderForPage>
           
            <h1 className="text-xl font-bold">Doctor's Portal</h1>
            </center>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  value={password}
                  onChange={handleChangePassword}
                />
                <label className="label">
{/*                   
                <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="Login" />
              </div> */}

                
                </label>
              </div>
              <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="Login" />
              </div>
              <NavigationBar></NavigationBar>

            </form>
            <center>
             {error && <p>{error}</p>}
             </center>
             
            
          </div> 
         
          
        
        </div>
       

        
        
        
      </div>
      <FooterForPage></FooterForPage>
     



    </>
  );
}
