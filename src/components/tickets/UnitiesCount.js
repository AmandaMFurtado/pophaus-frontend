import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import {countTicketsByBranch } from '../../services/api';


const UnitiesCount = () => {
  const [unitiesCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const countsData = await countTicketsByBranch();
        setStatusCounts(countsData);
      } catch (error) {
        console.error('Erro ao buscar contagem de ingressos por unidade', error);
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
          <h2 className='mt-3'>Contagem de Ingressos por Unidade</h2>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Unidade</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {unitiesCounts.map((unitiesCounts) => (
                <tr key={unitiesCounts.status}>
                  <td>{unitiesCounts.unity_name}</td>
                  <td>{unitiesCounts.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default UnitiesCount;
