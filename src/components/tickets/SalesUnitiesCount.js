import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import { sumTotalSalesByBranch } from '../../services/api';



const SalesUnitiesCount = () => {
  const [salesUnitiesCounts, setStatusCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const countsData = await sumTotalSalesByBranch();
        setStatusCounts(countsData);
      } catch (error) {
        console.error('Erro ao buscar total de vendas por unidade', error);
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
          <h2 className='mt-3'>Soma do Total de Vendas por Unidade</h2>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Unidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {salesUnitiesCounts.map((salesUnitiesCounts) => (
                <tr key={salesUnitiesCounts.status}>
                  <td>{salesUnitiesCounts.unity_name}</td>
                  <td>{salesUnitiesCounts.totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SalesUnitiesCount;
