import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { useState, Fragment } from "react";
import Navbar from "./NavBar";
import HomePage from "./Home";
import Modal from "./modal";
// import Modal from "./Modal";
import LoginPage from "./LoginPage";
import Orders from "./OrdersList";
import OrderDetail from "./OrdersDetail";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "./OrdersList";

const App = () => {
  return (
    <Router>
      <div
        style={{
          backgroundColor: "#1d232a",
          // color: "white",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/orders" element={<OrderPage />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
