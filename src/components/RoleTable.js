import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';

const RoleTable = ({ roles, onAddRole, onEditRole, onDeleteRole }) => {
  const [showModal, setShowModal] = useState(false);
  const [roleData, setRoleData] = useState({ name: '', permissions: [] });

  const handleChange = (e) => {
    setRoleData({ ...roleData, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (permission) => {
    setRoleData({
      ...roleData,
      permissions: roleData.permissions.includes(permission)
        ? roleData.permissions.filter((perm) => perm !== permission)
        : [...roleData.permissions, permission],
    });
  };

  const handleSave = () => {
    if (roleData.id) {
      onEditRole(roleData);
    } else {
      onAddRole(roleData);
    }
    setShowModal(false);
    setRoleData({ name: '', permissions: [] });
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add Role</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <Button onClick={() => { setRoleData(role); setShowModal(true); }}>Edit</Button>
                <Button variant="danger" onClick={() => onDeleteRole(role.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{roleData.id ? 'Edit' : 'Add'} Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoleName">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={roleData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Permissions</Form.Label>
              <div>
                {['Read', 'Write', 'Delete'].map((permission) => (
                  <Form.Check
                    key={permission}
                    type="checkbox"
                    label={permission}
                    checked={roleData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                ))}
              </div>
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

export default RoleTable;
