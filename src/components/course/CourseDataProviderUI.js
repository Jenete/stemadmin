import React, { useEffect, useState } from 'react';
import faculties from '../../data/data';  // Assuming data.js is in the same directory
import CourseDataUI from './CourseDataUI';
import './styling/CourseDataProviderUI.css';

const CourseDataProviderUI = ({setSelectedCourseProp}) => {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);

  const handleFacultyChange = (event) => {
    const facultyName = event.target.value;
    setSelectedFaculty(facultyName);
    const faculty = faculties.find(fac => fac.facultyName === facultyName);
    setCourses(faculty ? faculty.courses : []);
  };

  useEffect(()=>{
    if (selectedCourse)setSelectedCourseProp(selectedCourse);
  },[selectedCourse])

  return (
    <div className="course-provider-container">
      <select onChange={handleFacultyChange} value={selectedFaculty} className="faculty-select">
        <option value="">Select a Faculty</option>
        {faculties.map(faculty => (
          <option key={faculty.facultyName} value={faculty.facultyName}>
            {faculty.facultyName}
          </option>
        ))}
      </select>
      {selectedCourse? `You selected ${selectedCourse?.courseName} (scroll down)`: 'Select one'}
      <div className="courses-display">
        {courses.map(course => <CourseDataUI setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse} key={course.courseName} course={course} />)}
      </div>
    </div>
  );
};

export default CourseDataProviderUI;
