import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const UserTable = ({ users, onAddUser, onEditUser, onDeleteUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (userData.id) {
      onEditUser(userData);
    } else {
      onAddUser(userData);
    }
    setShowModal(false);
    setUserData({ name: '', email: '', role: '' });
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => { setUserData(user); setShowModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => onDeleteUser(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{userData.id ? 'Edit' : 'Add'} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={userData.role}
                onChange={handleChange}
              >
                <option>Admin</option>
                <option>Manager</option>
                <option>User</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
