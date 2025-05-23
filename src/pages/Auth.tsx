import React, { useEffect, useState } from 'react';
import { Facebook, Mail, Lock, User2, X } from 'lucide-react';
import clsx from 'clsx';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


type AuthMode = 'login' | 'signup';

function AuthPage() {
  const Navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    const url = `http://localhost:8080${authMode === 'signup' ? '/auth/signup' : '/auth/login'}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          authMode === 'signup'
            ? { email, password, name }
            : { email, password }
        ),
      });
  
      const data = await response.text(); // Adjust this to `.json()` if backend returns JSON
  
      if (!response.ok) {
        throw new Error(data || 'Authentication failed');
      }
  
      localStorage.setItem('token', data);
      Navigate('/');
  
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong');
    }
  };
  

  

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch('http://localhost:8080/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Google authentication failed');
      }
  
      localStorage.setItem('token', data.token);
      Navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate with Google');
      console.error('Google auth error:', err);
    }
  };
  
//   const handleFBLogin = () => {
//     if (window.FB) {
//         window.FB.login(
//             function (response) {
//                 if (response.authResponse) {
//                     const accessToken = response.authResponse.accessToken;
//                     fetch('/auth/facebook', {
//                         method: 'POST',
//                         headers: { 'Content-Type': 'application/json' },
//                         body: JSON.stringify({ accessToken }),
//                     })
//                     .then(res => res.json())
//                     .then(data => {
//                         if (data.token) {
//                             localStorage.setItem('token', data.token);
//                             // Redirect user to home page or update the UI as needed
//                             navigate('/');
//                         } else {
//                             setError('Failed to authenticate with Facebook');
//                         }
//                     })
//                     .catch(err => {
//                         setError(err.message || 'Failed to authenticate with Facebook');
//                         console.error('Facebook auth error:', err);
//                     });
//                 } else {
//                     setError('Facebook login was cancelled or failed');
//                 }
//             },
//             { scope: 'public_profile,email' }
//         );
//     } else {
//         setError('Facebook SDK not loaded');
//     }
// };

// useEffect(() => {
//     // Load Facebook SDK script
//     const script = document.createElement('script');
//     script.src = 'https://connect.facebook.net/en_US/sdk.js';
//     script.async = true;
//     script.onload = () => {
//         window.FB.init({
//             appId: import.meta.env.VITE_FACEBOOK_APP_ID, 
//             cookie: true,
//             xfbml: true,
//             version: 'v19.0',
//         });
//     };
//     document.body.appendChild(script);
// }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="absolute top-0 left-0 w-full h-64 bg-cover bg-center opacity-20 pointer-events-none"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80")' }}
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative">
          {error && (
            <div className="absolute top-4 left-4 right-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')}>
                <X size={16} />
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">Begin your mindfulness journey with us</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div className="relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 gap-3 flex items-center justify-center ">
              <div className=" border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.log('Google Login Failed')}
                  width="100%"
                />
              </div>

              {/* <button 
                onClick={handleFBLogin}
                className={clsx(
                  "flex items-center justify-center px-4 py-2 rounded-lg transition-colors",
                  "bg-[#1877F2] text-white hover:bg-[#166FE5]"
                )}
              >
                <Facebook size={20} className="mr-2" />
                Facebook
              </button> */}
            </div>
          </div>

          <div className="mt-6 text-center ">
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {authMode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
