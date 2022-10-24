import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export const UserContext = createContext(null);

export default function App(){
  const [userData, setUserData] = useState();
  return (
    <UserContext.Provider value ={userData}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage set={setUserData}/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/habits" element={<HabitsPage/>} />
          </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
