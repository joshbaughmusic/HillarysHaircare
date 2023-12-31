import React, { useEffect, useState } from 'react';
import { fetchAllAppointments } from '../../dataManager/appointmentData.js';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AppointmentNew } from './AppointmentNew.js';

export const AppointmentList = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);

  const getAllAppointments = async () => {
    const allApps = await fetchAllAppointments();

    const upcomingApps = allApps.filter((a) => new Date(a.date) >= Date.now());
    const pastApps = allApps.filter((a) => new Date(a.date) < Date.now());

    setUpcomingAppointments(upcomingApps);
    setPastAppointments(pastApps);
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <>
      <div className="container">
        <br />
        <div>
          <AppointmentNew getAllAppointments={getAllAppointments} />
        </div>
        <br />
        <h3>Upcoming Appointments</h3>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stylist</th>
              <th>Customer</th>
              <th>Cancelled?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.map((a, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{a.date}</td>
                    <td>{a.stylist.name}</td>
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
        <h3>Past Appointments</h3>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stylist</th>
              <th>Customer</th>
              <th>Cancelled?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pastAppointments.map((a, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{a.date}</td>
                    <td>{a.stylist.name}</td>
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
