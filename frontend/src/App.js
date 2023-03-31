import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home"
import AddEdit from "./pages/Add"
import View from "./pages/View"
import About from "./pages/About"
import Edit from "./pages/Edit"
import "./App.css";
import Header from "./components/Header";

function NotFound() {
  return (
    <div>
      <h2>404 - Page not found.</h2>
      <Link to="/">Go back to Home.</Link>
    </div>
  )
}

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
                <Route path="/update/:productId" element={<Edit />} />
                <Route path="/view/:productId" element={<View />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
          </main>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
