import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TicketsList from './components/tickets/TicketList';
import StatusCount from './components/tickets/StatusCount';
import UnitiesCount from './components/tickets/UnitiesCount';
import SalesUnitiesCount from './components/tickets/SalesUnitiesCount';
import UserCount from './components/tickets/UsersCount';
import MyNavbar from './components/static/Navbar';
import Footer from './components/static/Footer';
import DatesByEmail from './components/templates/DatesByEmail';
import HourList from './components/templates/HourList';

function App() {
  return (
    <Router>
      <div style={{ marginBottom: '10vh' }}>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate to="/listagem-ingressos" />} />
            <Route path="/listagem-ingressos" element={<TicketsList />} />
            <Route path="/contagem-ingressos-status" element={<StatusCount />} />
            <Route path="/contagem-ingressos-unidade" element={<UnitiesCount />} />
            <Route path="/soma-total-vendas-unidade" element={<SalesUnitiesCount />} />
            <Route path="/contagem-ingressos-usuario" element={<UserCount />} />
            <Route path="/listagem-horarios" element={<HourList />} />
            <Route path="/datas" element={<DatesByEmail />} />
          </Routes>
        </Container>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
