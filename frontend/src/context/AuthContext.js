import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. CHECK for "adminInfo"
    const storedAdmin = localStorage.getItem("adminInfo"); 
    
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    // 2. SAVE as "adminInfo"
    localStorage.setItem("adminInfo", JSON.stringify(data)); 
    setAdmin(data);
  };

  const logout = () => {
    // 3. REMOVE "adminInfo"
    localStorage.removeItem("adminInfo"); 
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;