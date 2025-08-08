import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import Modal from './components/Modal';
import './App.css';

const API_URL = 'http://localhost:3001/api/usuarios';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      fetchUsers();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Falha ao criar usuário');
    }
  };

  const handleUpdateUser = async (userData, userId) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`, userData);
      fetchUsers();
      setIsModalOpen(false); 
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Falha ao atualizar usuário');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        fetchUsers();
      } catch (error) {
        alert(error.response?.data?.detail || 'Falha ao deletar usuário');
      }
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Usuários</h1>
      <UserForm onSubmit={handleAddUser} />
      <UserList users={users} onEdit={openEditModal} onDelete={handleDeleteUser} />
      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserForm onSubmit={handleUpdateUser} initialData={editingUser} />
      </Modal>
    </div>
  );
}

export default App;