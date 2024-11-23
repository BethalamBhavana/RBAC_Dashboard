import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UserTable from './components/UserTable';
import RoleTable from './components/RoleTable';
import './App.css'; 


const App = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };

  const editUser = (user) => {
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addRole = (role) => {
    setRoles([...roles, { ...role, id: roles.length + 1 }]);
  };

  const editRole = (role) => {
    setRoles(roles.map((r) => (r.id === role.id ? role : r)));
  };

  const deleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1>RBAC Admin Dashboard</h1>
      <UserTable
        users={users}
        onAddUser={addUser}
        onEditUser={editUser}
        onDeleteUser={deleteUser}
      />
      <hr />
      <RoleTable
        roles={roles}
        onAddRole={addRole}
        onEditRole={editRole}
        onDeleteRole={deleteRole}
      />
    </div>
  );
};

export default App;
