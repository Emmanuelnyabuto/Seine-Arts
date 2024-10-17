import React, { useState } from 'react';
import { postJob } from '../services/api';

const JobPost = () => {
  const [jobDetails, setJobDetails] = useState({ title: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postJob(jobDetails);
    setJobDetails({ title: '', description: '' });
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={jobDetails.title}
          onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
          placeholder="Job Title"
        />
        <textarea
          value={jobDetails.description}
          onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
          placeholder="Job Description"
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPost;
