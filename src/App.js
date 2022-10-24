import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";

export const UserContext = createContext();

export default function App() {
  const [userData, setUserData] = useState(0);
  
  return (
    <UserContext.Provider value={userData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage set={setUserData} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/habits" element={<HomePage index={0}/>} />
            <Route
              path="/today"
              element={<HomePage index={1}/>}
            />
          </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  );
}
