import React from 'react';
import './styling/UserProfileCard.css'; // Assuming the CSS file is in the same directory

const UserProfileCard = ({ formData }) => {
  // Helper function to format non-empty array elements joined by a separator
  const formatList = (items) => items.filter(Boolean).join(', ');

  const getAgeAndDOB = (dob) => {
    const birthday = new Date(dob); // Convert the input string to a Date object
    const today = new Date(); // Get today's date
  
    let age = today.getFullYear() - birthday.getFullYear(); // Calculate the difference in years
    const m = today.getMonth() - birthday.getMonth(); // Calculate the difference in months
  
    // If the current month is less than the birth month, or
    // if it's the same month but today's date is less than the birth date,
    // then the age is one year less because the birthday hasn't occurred yet this year
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
  
    return age;
  };
  

  return (
    <div className="user-profile-card">
        <h2>My story</h2>
        <img src='https://i.pinimg.com/564x/d7/25/ef/d725efb991ca76d9371f37def547cf57.jpg' alt='graduate-img'></img>
      <p>
        {formData.name && `My name is ${formData.name}`}
        {formData.age && ` and I am ${getAgeAndDOB(formData.age)} years old`}
        {formData.school && `, studying at ${formData.school}`}
        {formData.grade && ` doing grade ${formData.grade}`}.
      </p>
      
      {formData.favoriteSubjects.length > 0 && (
        <p>Favorite subjects? it has to be {formatList(formData.favoriteSubjects)}. </p>
      )}
      {formData.careerInterest && (
        <p>Looking ahead, I'm excited about a future in  {formData.careerInterest?.courseName}. </p>
      )}
      {formData.achievements && (
        <p>I am proud of my achievements such as {formData.achievements}. </p>
      )}
      <p><strong>My contact info:</strong></p><br/>
      {formData.cellNumber && (
        <p>I can be reached at {formData.cellNumber}. </p>
      )}
      {formData.email && (
        <p>My email address is {formData.email}. </p>
      )}
      {formData.parentName && (
        <p>I live with my parent {formData.parentName}, who can be reached at {formData.parentCell || 'N/A'}. </p>
      )}
      
    </div>
  );
};

export default UserProfileCard;
