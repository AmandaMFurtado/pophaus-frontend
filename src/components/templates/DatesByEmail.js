import React, { useState, useEffect } from 'react';
import { Table, Pagination, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';
import { listDatesByEmail } from '../../services/api';

const DatesByEmail = () => {
  const [email, setEmail] = useState('');
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        if (email.trim() === '') {
          setUserTickets([]);
          return;
        }

        setLoading(true);
        setError(null);

        const ticketsData = await listDatesByEmail(email);
        setUserTickets(ticketsData);
      } catch (error) {
        console.error('Erro ao obter ingressos por usuário:', error);
        setError('Erro ao obter ingressos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

  const filteredTickets = userTickets
    .filter((ticket) => !email || (ticket.email && ticket.email.toLowerCase().includes(email.toLowerCase())));

  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from({ length: Math.ceil(filteredTickets.length / ticketsPerPage) }, (_, i) => i + 1);
  const firstPage = Math.max(1, currentPage - 2);
  const lastPage = Math.min(firstPage + 4, Math.ceil(filteredTickets.length / ticketsPerPage));

  return (
    <div>
      <h2 className="mt-3">Listagem das Datas</h2>
      <Row className="mt-3 mb-3">
        <Col xs={6} md={6}>
          <Form.Group>
            <Form.Control
              size="sm"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="E-mail: email@email.com"
            />
          </Form.Group>
        </Col>
      </Row>

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <span className="ml-2 mt-5">Carregando...</span>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
          {userTickets.length === 0 ? (
            <p>Nenhum ingresso encontrado.</p>
          ) : (
            <>
              <Table striped bordered hover responsive className="mt-4">
                <thead>
                  <tr>
                    <th>E-mail</th>
                    <th>Data </th>
                    <th>Unidade</th>
                    <th>Horario</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td>{ticket.email}</td>
                      <td>{new Date(ticket.date).toLocaleDateString()}</td>
                      <td>{ticket.filial}</td>
                      <td>{ticket.ticket_time}</td>
                      <td>{ticket.duration}</td>
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
          )}
        </>
      )}
    </div>
  );
};

export default DatesByEmail;
