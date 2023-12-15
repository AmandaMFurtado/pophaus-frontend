import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import {countTicketsByStatus } from '../../services/api';

const StatusCount = () => {
  const [statusCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const countsData = await countTicketsByStatus();
        setStatusCounts(countsData);
      } catch (error) {
        console.error('Erro ao buscar contagem de ingressos por status', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusCounts();
  }, []);


  return (
    <div>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <span className="ml-2">Carregando...</span>
        </div>
      ) : (
        <div>
          <h2 className='mt-3'>Contagem de Ingressos por Status</h2>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Status</th>
                <th>Quantidade</th>
                
              </tr>
            </thead>
            <tbody>
              {statusCounts.map((statusCount) => (
                <tr key={statusCount.status}>
                  <td>{statusCount.status}</td>
                  <td>{statusCount.count}</td>                
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default StatusCount;
