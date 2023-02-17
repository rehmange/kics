import './App.css';
import React,{useContext} from 'react';
import Login from "./pages/login/Login"
import Car from "./pages/car/Car"
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
   <>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={user?<Car/>:<Navigate to="/login" />}/> 
       <Route path="/login" element={user?<Navigate to="/" />:<Login/>}/>
       <Route path="*" element={<>Page does not exist</>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
