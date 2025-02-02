import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { loadStripe } from '@stripe/stripe-js';
import { app } from './firebaseConfig';

const stripePromise = loadStripe("your_stripe_public_key");
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export default function Home() {
  const [user, setUser] = useState(null);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setPurchased(userSnap.data().purchased || false);
        }
      }
    });
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setPurchased(false);
  };

  const handlePurchase = async () => {
    const stripe = await stripePromise;
    const createCheckout = httpsCallable(functions, 'createCheckoutSession');
    const { data } = await createCheckout({ uid: user.uid });
    await stripe.redirectToCheckout({ sessionId: data.sessionId });
  };

  return (
    <div>
      <h1>Fitness Training Platform</h1>
      {!user ? (
        <button onClick={handleLogin}>Login with Google</button>
      ) : (
        <>
          <p>Welcome, {user.displayName}!</p>
          {purchased ? (
            <a href="your_private_video_link">Access Your Content</a>
          ) : (
            <button onClick={handlePurchase}>Buy Training Plan</button>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
