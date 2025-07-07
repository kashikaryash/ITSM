// src/components/common/Header.jsx

import React, { useContext } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import logo from '/logo.png'; // Assuming it's in public or src/assets

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="ITSM Logo"
          />
          <span className="fw-bold">ITSM Portal</span>
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          {/* You can add notification bell/icon here */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
              <span className="me-2">{user?.name || 'User'}</span>
              <i className="bi bi-person-circle fs-4"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
