import React, { useEffect, useState } from 'react';
import { fetchAllCustomers } from '../../dataManager/customerData.js';
import { Table } from 'reactstrap';

export const CustomerList = () => {
  const [allCustomers, setAllCustomers] = useState([]);

  const getAllCustomers = () => {
    fetchAllCustomers().then(setAllCustomers);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <>
      <div className="container">
        <h3>Customers</h3>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allCustomers.map((c, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>Details</td>
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
