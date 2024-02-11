import React, { useState } from 'react';
import './styling/ManualForm.css';

const ManualForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    learnerName: '',
    grade: '',
    subject: '',
    cellnumber: '',
    parentCell: '',
    parentFullName: '',
    otherInfo: '',
    startAvailability: '',
    newDate: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? [...prevData[name], value] : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setStatusMessage('Loading please wait');
    const added = await addUser(formData);
    console.log(added);
    if (added) setStatusMessage(added.message);
    if (added.success)setFormData({
      learnerName: '',
      grade: '',
      subject: '',
      parentCell: '',
      parentFullName: '',
      otherInfo: '',
      startAvailability: '',
      newDate: '',
      cellnumber: '',
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="learnerName" 
          value={formData.learnerName} 
          onChange={handleChange} 
          placeholder="Enter learner's full name" 
          required 
        />
        <select 
          name="grade" 
          value={formData.grade} 
          onChange={handleChange} 
          required
        >
          <option value="">Select grade</option>
          <option value="12">Grade 12</option>
          <option value="Upgrading">Upgrading</option>
        </select>
        <select 
          name="subject" 
          value={formData.subject} 
          onChange={handleChange} 
          required
        >
          <option value="">Select subject</option>
          <option value="Math">Math (R150)</option>
          <option value="Physics">Physics (R150)</option>
          <option value="Math and Physics">Math and Physics (R250)</option>
          <option value="Technical Math">Technical Math (R150)</option>
        </select>
        <input 
          type="tel" 
          name="cellnumber" 
          value={formData.cellnumber} 
          onChange={handleChange} 
          placeholder="Enter cell number" 
          required 
        />
        <input 
          type="tel" 
          name="parentCell" 
          value={formData.parentCell} 
          onChange={handleChange} 
          placeholder="Enter parent's cell number" 
          required 
        />
        <input 
          type="text" 
          name="parentFullName" 
          value={formData.parentFullName} 
          onChange={handleChange} 
          placeholder="Enter parent's full name" 
          required 
        />
        <textarea 
          name="otherInfo" 
          value={formData.otherInfo} 
          onChange={handleChange} 
          rows="4" 
          placeholder="Enter any additional information"
        ></textarea>
        <input 
          type="datetime-local" 
          name="startAvailability" 
          value={formData.startAvailability} 
          onChange={handleChange} 
          required 
          placeholder="Select your start date" 
        />
        <input 
          type="month" 
          name="newDate" 
          value={formData.newDate} 
          onChange={handleChange} 
          required 
          placeholder="Select the new date" 
        />
        <p>{statusMessage}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ManualForm;
