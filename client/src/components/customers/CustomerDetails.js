import React, { useEffect, useState } from 'react';
import { fetchSingleCustomer } from '../../dataManager/customerData.js';
import { Button, Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  const { id } = useParams();

  const getSingleCustomer = () => {
    fetchSingleCustomer(id).then(setCustomer);
  };

  useEffect(() => {
    getSingleCustomer();
  }, []);

  if (!customer.appointments) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h3>{customer.name}</h3>
        <br />
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          </tbody>
        </Table>
        <br />
        <h4>Appointments:</h4>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stylist</th>
              <th>Cancelled?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customer.appointments.map((a, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{a.date}</td>
                    <td>{a.stylist.name}</td>
                    <td>{a.isCancelled ? <div>Yes</div> : <div>No</div>}</td>
                    <td>
                      <Link to={`/appointments/${a.id}`}>
                        <Button color="primary">Details</Button>
                      </Link>
                    </td>
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
