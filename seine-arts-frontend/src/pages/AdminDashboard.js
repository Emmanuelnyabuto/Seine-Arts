import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Fetch services on load
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/services`);
        setServices(data);
        console.log('Fetched services:', data); // Debugging line to confirm data
      } catch (error) {
        console.error('Error fetching services', error);
      }
    };

    fetchServices();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedService) {
      setUploadError('Please select a service category');
      return;
    }

    const formData = new FormData();
    formData.append('service', selectedService);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('authToken');
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      await axios.post(`${API_BASE_URL}/api/portfolios/upload`, formData, config);
      setUploadSuccess('Portfolio uploaded successfully');
      setUploadError('');
      setDescription('');
      setImage(null);
      setSelectedService('');
    } catch (error) {
      setUploadError('Error uploading portfolio. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Upload Portfolio</h2>
      <div>
        <label htmlFor="service">Service Category:</label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select a Service</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Portfolio description"
        ></textarea>
      </div>

      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleFileChange} />
      </div>

      <button onClick={handleUpload}>Upload Portfolio</button>
      {uploadSuccess && <p style={{ color: 'green' }}>{uploadSuccess}</p>}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default AdminDashboard;
