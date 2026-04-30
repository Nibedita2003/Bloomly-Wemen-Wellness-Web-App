import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- NEW: Google Sign-In Function ---
  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore to avoid overwriting data
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          createdAt: new Date(),
          photoURL: user.photoURL
        });
      }

      if (onLogin) onLogin({ uid: user.uid, name: user.displayName });
      navigate('/');
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date()
        });

        if (onLogin) onLogin({ uid: user.uid, name: formData.name });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (onLogin) onLogin({ uid: userCredential.user.uid });
      }
      navigate('/');
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50/30 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl shadow-rose-100 border border-rose-50">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-gray-800 italic tracking-tighter mb-2">
            {isRegistering ? 'Join Bloomly' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400 font-medium">
            {isRegistering ? 'Start your wellness journey' : 'Login to track your cycle'}
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-500 text-sm rounded-2xl font-bold">
            {error}
          </div>
        )}

        {/* --- GOOGLE SIGN IN BUTTON --- */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full mb-6 py-4 flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-100"></div>
          <span className="px-4 text-[10px] font-black text-gray-300">OR</span>
          <div className="flex-1 h-px bg-gray-100"></div>
        </div>

        {/* --- ORIGINAL FORM --- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-200 outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-rose-400 text-white font-black rounded-2xl shadow-lg hover:bg-rose-500 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'WAIT A MOMENT...' : (isRegistering ? 'SIGN UP' : 'LOGIN')}
          </button>
        </form>

        <footer className="mt-8 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-xs font-black text-gray-300 uppercase tracking-widest hover:text-rose-400 transition-colors"
          >
            {isRegistering ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;