import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import Navbar from "./NavBar";
import Home from "./Home";
import Modal from "./modal";
// import Modal from "./Modal";
import LoginPage from "./LoginPage";
import Orders from "./OrdersList";
import OrderDetail from "./OrdersDetail";

const orders = [
  {
    id: 1,
    name: "Sara Getnet",
    itemName: "Netflix",
    period: "1 year",
    price: "1000 ETB",
    email: "example1@example.com",
    phone: "123-456-7890",
    attachedImage: "netflix.png",
    remark: "remark of item ",
  },
  {
    id: 2,
    name: "Naol Getnet",
    itemName: "Netflix",
    period: "6 months",
    price: "200 ETB",
    email: "example2@example.com",
    phone: "987-654-3210",
    attachedImage: "netflix.png",
    remark: "remark of item",
  },
  {
    id: 3,
    name: "Selam Tesfaye",
    itemName: "Spotify",
    period: "3 months",
    price: "100 ETB",
    email: "example3@example.com",
    phone: "122-456-7890",
    attachedImage: "netflix.png",
    remark: "remark of item",
  },
  {
    id: 4,
    name: "Bety Tesfaye",
    itemName: "Spotify",
    period: "1 year",
    price: "1000 ETB",
    email: "example4@example.com",
    phone: "984-654-3210",
    attachedImage: "netflix.png",
    remark: "remark of item",
  },
  // Add more orders as needed
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedApp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Orders orders={orders} />} />
        <Route path="/order/:orderId" />
        {/* Add a route for "/orders" */}
        <Route path="/orders" element={<Orders orders={orders} />} />
      </Routes>
    </Router>
  );
};

const AuthenticatedApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleLogout = () => {
    // Perform logout actions, such as clearing session storage
    // Example: Redirecting to login page
    return <Navigate to="/login" replace />;
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditModalOpen(true);
    setItemToEdit(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const addItem = (imageUrl, title, description, period, price) => {
    const newItem = {
      id: Date.now(),
      imageUrl: imageUrl,
      title: title,
      description: description,
      period: period,
      price: price,
    };
    setItems([...items, newItem]);
  };

  const editItem = (itemId, imageUrl, title, description, period, price) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          imageUrl: imageUrl,
          title: title,
          description: description,
          period: period,
          price: price,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Home
        openModal={openModal}
        openEditModal={openEditModal}
        deleteItem={deleteItem}
        items={items}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} addItem={addItem} />
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeModal}
        editItem={editItem}
        itemToEdit={itemToEdit}
      />
    </>
  );
};

export default App;
