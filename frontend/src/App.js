import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home"
import AddEdit from "./pages/AddEdit"
import View from "./pages/View"
import About from "./pages/About"
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <body>
        <BrowserRouter>
          <main>
            <Header/>
            <ToastContainer position="top-center"/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddEdit />} />
              <Route path="/update/:productId" element={<AddEdit />} />
              <Route path="/view/:productId" element={<View />} />
              <Route path="/about" element={<About/>} />
            </Routes>
          </main>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
