import "./auth.scss";
import { auth } from "../../config/firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onLogin();
      }
    });

    return () => unsubscribe();
  }, [onLogin]);
  
  
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError("Niepoprawny email lub hasło");
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <input
        placeholder="Email..."
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Zaloguj się</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
