import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p style={{ textAlign: 'center' }}>Nenhum usuário cadastrado.</p>;
  }

  return (
    <div className="table-container">
      <h2>Lista de Usuários</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.idade}</td>
              <td>{new Date(user.created_at).toLocaleString('pt-BR')}</td>
              <td className="actions-cell">
                <button className="edit-btn" onClick={() => onEdit(user)}>Editar</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;