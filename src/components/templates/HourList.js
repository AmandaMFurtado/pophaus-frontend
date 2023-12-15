import React, { useState, useEffect } from 'react';
import { Table, Spinner, Row, Col, Form } from 'react-bootstrap';
import { listTimetablesByDate } from '../../services/api';

const HourList = () => {
  const [schedules, setSchedules] = useState([]);
  const [currentPage] = useState(1);
  const [schedulesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedulesData = await listTimetablesByDate(startDate);
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error fetching schedules', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [startDate]);


  const indexOfLastSchedule = currentPage * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
  const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

  return (
    <div>
      <h2 className="mt-3">Horários</h2>
      <Col xs={6} md={6}>
        <Form.Group as={Row} controlId="startDate" className="mt-2">
          <Form.Label column md={3} className="mr-2">
            Selecione uma data:
          </Form.Label>
          <Col md={9}>
            <Form.Control
              type="date"
              value={startDate || ''}
              onChange={(e) => setStartDate(e.target.value || null)}
            />
          </Col>
        </Form.Group>
      </Col>

      {loading && (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status" />
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {!loading && (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Data</th>
                <th>Unidade</th>
                <th>Horários</th>
              </tr>
            </thead>
            <tbody>
              {currentSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.date}</td>
                  <td>{schedule.filial}</td>
                  <td>
                    {schedule.hours.map((hourDetail, index) => (
                      <span key={hourDetail.hour}>
                        {hourDetail.hour.toString().padStart(2, '0')}:00
                        {index < schedule.hours.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default HourList;
