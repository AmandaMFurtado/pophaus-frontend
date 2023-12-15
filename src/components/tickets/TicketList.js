import React, { useState } from 'react';
import { listTickets } from '../../services/api';
import { Button, Col, Form, Pagination, Row, Table } from 'react-bootstrap';

const TicketsList = () => {
  const [startDate, setStartDate] = useState('');
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);

  const handleLoadData = async () => {
    try {
      console.log(startDate);
      const ticketData = await listTickets(startDate);
      console.log('Dados recebidos da API:', ticketData); // Adicione este log para depurar
      setTickets(ticketData);
    } catch (error) {
      console.error('Erro ao buscar ingressos', error);
    }
  };

  const filteredTickets = startDate
    ? tickets.filter((ticket) => {
      const ticketDate = new Date(ticket.date);
      const startDateTime = new Date(startDate);

      ticketDate.setUTCHours(0, 0, 0, 0);
      startDateTime.setUTCHours(0, 0, 0, 0);


      const ticketDateString = ticketDate.toISOString().split('T')[0];
      const startDateTimeString = startDateTime.toISOString().split('T')[0];


      return ticketDateString === startDateTimeString;
    })
    : tickets;
  const formatDate = (dateString) => {
    try {
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

      const formattedDate = new Date(dateString).toLocaleDateString('pt-BR', options);
      return formattedDate;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return null;
    }
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from({ length: Math.ceil(filteredTickets.length / ticketsPerPage) }, (_, i) => i + 1);
  const firstPage = Math.max(1, currentPage - 2);
  const lastPage = Math.min(firstPage + 4, Math.ceil(filteredTickets.length / ticketsPerPage));


  return (
    <>
      <h2 className='mt-3'>Lista de Ingressos</h2>

      <Row className="mt-2">
        <Col xs={12} md={6}>
          <Form.Group as={Row} controlId="startDate">
            <Form.Label column md={3}>
              Data do Ingresso:
            </Form.Label>
            <Col xs={7} md={5}>
              <Form.Control
                type="date"
                value={startDate || ''}
                onChange={(e) => setStartDate(e.target.value || null)}
                className="form-control-md"
              />
            </Col>
            <Col xs={5} md={4} className="d-flex align-items-end justify-content-xs-end justify-content-md-start">
              <Button className="btn btn-primary" onClick={handleLoadData}>
                Pesquisar
              </Button>
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <div className="tickets-pagination-container mt-3 mb-5"></div>
      <Table striped bordered hover responsive className='mt-3'>
        <thead>
          <tr>
            <th>Data</th>
            <th>Criado em</th>
            <th>Unidade</th>
            <th>Preço</th>
            <th>Horário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket) => (
            <tr key={String(ticket.id)}>
              <td>{ticket.date}</td>
              <td>{formatDate(ticket.created_at)}</td>
              <td>{ticket.filial}</td>
              <td>{ticket.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{ticket.ticket_time}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination size="sm" className="mt-2">
        <Pagination.Prev onClick={() => paginate(Math.max(1, currentPage - 1))} />

        {pageNumbers.slice(firstPage - 1, lastPage).map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(filteredTickets.length / ticketsPerPage)))} />
      </Pagination>

    </>
  );
};

export default TicketsList;
