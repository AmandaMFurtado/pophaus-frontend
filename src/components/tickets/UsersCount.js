import React, { useState, useEffect } from 'react';
import { Table, Pagination, Spinner } from 'react-bootstrap';
import { countTicketsByUser } from '../../services/api';

const UserCount = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await countTicketsByUser();
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => i + 1);
  const firstPage = Math.max(1, currentPage - 2);
  const lastPage = Math.min(firstPage + 4, Math.ceil(users.length / usersPerPage));

  return (
    <div>
      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <span className="ml-2">Carregando...</span>
        </div>
      )}

      {!loading && (
        <>
          <h2 className='mt-3'>Usuários e seus Ingressos</h2>
          <Table striped bordered hover responsive className='mt-3'>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Ingressos</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.user}</td>
                  <td>{user.count}</td>
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

            <Pagination.Next onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(users.length / usersPerPage)))} />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default UserCount;
