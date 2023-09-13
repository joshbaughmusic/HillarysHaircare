import React, { useEffect, useState } from 'react';
import { fetchAllStylists } from '../../dataManager/stylistData.js';
import { Table } from 'reactstrap';

export const StylistList = () => {
  const [allStylists, setAllStylists] = useState([]);

  const getAllStylists = () => {
    fetchAllStylists().then(setAllStylists);
  };

  useEffect(() => {
    getAllStylists();
  }, []);

  return (
    <>
      <div className="container">
        <h3>Stylists</h3>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allStylists.map((s, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td>{s.name}</td>
                    <td>{s.isActive ? <div>Yes</div> : <div>No</div>}</td>
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
