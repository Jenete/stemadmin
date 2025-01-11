import React from 'react';
import './styling/CourseDataUI.css';

const CourseDataUI = ({ course,  setSelectedCourse, selectedCourse }) => {
    const handleChange = ()=>{
        if (setSelectedCourse){
            setSelectedCourse(course);
        }
    }
  return (
    <div className={`course-data-container ${selectedCourse?.courseName === course?.courseName? 'selected-course':''}`} onClick={handleChange}>
      <h3 className="course-name">{course.courseName}</h3>
      <p className="course-description">{course.description}</p>
    </div>
  );
};

export default CourseDataUI;
