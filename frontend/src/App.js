import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddEdit from "./pages/Add";
import View from "./pages/View";
import Edit from "./pages/Edit";
import "./App.css";
import Header from "./components/Header";

function NotFound() {
  return (
    <>
      <h2>404 - Page not found.</h2>
      <Link to="/">Go back to Home.</Link>
      <hr/>
    </>
  );
}

function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#234075",
        color: "white",
        borderBottom: "3px solid #e3a82b",
      }}
    >
      <p>ARNO-PAN-IS24-full-stack-competition-req97073</p>
      <p>pan.arno@gmail.com</p>
      <p>(778) 893-3437</p>
      <p>March 30th, 2023</p>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <body>
        <BrowserRouter>
          <main>
            <Header />
            <ToastContainer position="top-center" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddEdit />} />
              <Route path="/update/:productId" element={<Edit />} />
              <Route path="/view/:productId" element={<View />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
