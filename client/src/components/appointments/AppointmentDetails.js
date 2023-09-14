import React, { useEffect, useState } from 'react';
import { fetchSingleAppointment } from '../../dataManager/appointmentData.js';
import { Button, Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

export const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState({});
  const { id } = useParams();

  const getSingleAppointment = () => {
    fetchSingleAppointment(id).then(setAppointment);
  };

  useEffect(() => {
    getSingleAppointment();
  }, []);

  if (!appointment.stylist) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h3>Appointment #{appointment.id}</h3>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stylist</th>
              <th>Customer</th>
              <th>Cancelled</th>
              <th>Total Cost:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{appointment.date}</td>
              <td>
                <Link to={`/stylists/${appointment.stylistId}`}>
                  {appointment.stylist.name}
                </Link>
              </td>
              <td>
                <Link to={`/customers/${appointment.customerId}`}>
                  {appointment.customer.name}
                </Link>
              </td>
              <td>
                {appointment.isCancelled ? <div>Yes</div> : <div>No</div>}
              </td>{' '}
              <td>${appointment.totalCost}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <h4>Services:</h4>
        <Table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {appointment.services.map((s, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{s.name}</td>
                    <td>${s.price}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};
