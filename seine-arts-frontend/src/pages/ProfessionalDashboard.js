import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ProfessionalDashboard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/api/jobs/professional-jobs`, config);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Assigned Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            Job: {job.description}, Status: {job.status}, Client: {job.client.name}, Portfolio: {job.portfolio.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionalDashboard;
