import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, initialData }) => {
  const [user, setUser] = useState({ nome: '', email: '', idade: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const isEditing = initialData && initialData.id;

  useEffect(() => {
    if (isEditing) {
      setUser({
        nome: initialData.nome,
        email: initialData.email,
        idade: initialData.idade,
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const userData = { ...user, idade: parseInt(user.idade, 10) };
      const response = await onSubmit(userData, initialData?.id);
      
      setMessage({ type: 'success', text: response.message });
      if (!isEditing) {
        setUser({ nome: '', email: '', idade: '' }); 
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Ocorreu um erro.' });
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={user.nome} onChange={handleChange} required minLength="2" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" name="idade" value={user.idade} onChange={handleChange} required min="1" max="120" />
        </div>
        <button type="submit">{isEditing ? 'Salvar Alterações' : 'Salvar Usuário'}</button>
      </form>
      {message.text && (
        <p className={`form-message ${message.type}`}>{message.text}</p>
      )}
    </div>
  );
};

export default UserForm;
