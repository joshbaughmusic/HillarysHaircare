import React, { useEffect, useState } from 'react';
import { deactivateStylist, fetchSingleStylist } from '../../dataManager/stylistData.js';
import { Button, Table } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

export const StylistDetails = () => {
  const [stylist, setStylist] = useState({});
  const { id } = useParams();

  const getSingleStylist = () => {
    fetchSingleStylist(id).then(setStylist);
  };

  useEffect(() => {
    getSingleStylist();
  }, []);

  const handleDeactivate = () => {
    deactivateStylist(id);
    getSingleStylist();
  }

  if (!stylist.appointments) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h3>{stylist.name}</h3>
        <span>Active: </span>
        {stylist.isActive ? <span>Yes</span> : <span>No</span>}
        <Button
        color='danger'
        onClick={handleDeactivate}>Deactivate</Button>
        <br />
        <br />
        <h4>Appointments:</h4>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Cancelled?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stylist.appointments.map((a, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{a.date}</td>
                    <td>{a.customer.name}</td>
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
