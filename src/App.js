import { BrowserRouter, Routes, Route } from "react-router-dom";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";


export default function App(){
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/habits" element={<HabitsPage/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}
