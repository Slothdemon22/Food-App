import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Additem from "./Components/Additem";
import "./App.css";
import Orders from "./Components/Orders";
import FoodItems from "./Components/Fooditems";
import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen ">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Routes>
            <Route path="/additems" element={<Additem />} />
            <Route path="/fooditems" element={<FoodItems />} />
            <Route path="/getorders" element={<Orders />} />
            {/* Define other routes here */}
          </Routes>
        </div>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
