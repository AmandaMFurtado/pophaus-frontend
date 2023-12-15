import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/img/logo.png';

import { Link } from 'react-router-dom';

function MyNavbar() {
  const navbarStyle = {
    backgroundColor: '#6f3b8c',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '15px',
  };

  return (
    <Navbar expand="lg" style={navbarStyle}>
      <Container>
        <Navbar.Brand>
        <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '5px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ml-auto">
            <Link to="/listagem-ingressos" style={linkStyle}>
              Ingressos
            </Link>
            <Link to="/contagem-ingressos-status" style={linkStyle}>
              Status
            </Link>
            <Link to="/contagem-ingressos-unidade" style={linkStyle}>
             Unidade
            </Link>
            <Link to="/soma-total-vendas-unidade" style={linkStyle}>
              Vendas 
            </Link>
            <Link to="/contagem-ingressos-usuario" style={linkStyle}>
             Usuário
            </Link>
            <Link to="/listagem-horarios" style={linkStyle}>
             Horários
            </Link>
            <Link to="/datas" style={linkStyle}>
            Datas
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
