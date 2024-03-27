
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './NavBar';
import Home from './Home';
import Modal from './Modal';
import LoginPage from './LoginPage';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedApp />} />
        <Route path="/login" element={<LoginPage />} />
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
      price: price 
    };
    setItems([...items, newItem]);
  };

  const editItem = (itemId, imageUrl, title, description, period, price) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, imageUrl: imageUrl, title: title, description: description, period: period, price: price};
      }
      return item;
    });
    setItems(updatedItems);
  };

  const deleteItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };
  
 
  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Home openModal={openModal} openEditModal={openEditModal} deleteItem={deleteItem} items={items} />
      <Modal isOpen={isModalOpen} onClose={closeModal} addItem={addItem} />
      <Modal isOpen={isEditModalOpen} onClose={closeModal} editItem={editItem} itemToEdit={itemToEdit} />
        
    </>
  );
};

export default App;