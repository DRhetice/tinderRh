import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadinInitial] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log("got user:",user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadinInitial(false);
    });
    return unsub;
  }, []);

  const logout = () => {
    signOut(auth).catch((error) => setError(error));
  };
  const memodValue = useMemo(
    () => ({
      user,
      error,
      logout,
    }),
    [user, error]
  );
  return (
    <AuthContext.Provider value={memodValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
