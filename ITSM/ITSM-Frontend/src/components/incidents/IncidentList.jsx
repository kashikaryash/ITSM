// Example: src/components/incidents/IncidentList.jsx
import React, { useEffect, useState } from 'react';
import { getIncidents } from '../../services/incidentService';
import LoadingSpinner from '../common/LoadingSpinner';
import Pagination from '../common/Pagination';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch incidents from backend
    getIncidents()
      .then(data => setIncidents(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container">
      <h2>All Incidents</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.title}</td>
              <td>{incident.status}</td>
              <td>{incident.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total={incidents.length} />
    </div>
  );
};

export default IncidentList;