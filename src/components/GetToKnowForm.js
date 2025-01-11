import React, { useState } from 'react';
import { userDataController } from '../Controllers/userDataController';
import CourseDataProviderUI from '../components/course/CourseDataProviderUI';
import "./styling/GetToKnowForm.css";
import UserProfileCard from './UserProfileCard';

const GetToKnowForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    school: '',
    grade: '',
    cellNumber: '',
    parentName: '',
    parentCell: '',
    email: '',
    favoriteSubjects: [],
    careerInterest: '',
    achievements: ''
  });

  const [loadingIndicator, setLoadingIndicator] = useState('');

  const setSelectedCourse = (course)=>{
    if(course){
        setFormData({...formData, careerInterest: course});
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!(name && value)) return;
    if (name === "favoriteSubjects") {
      // Handle checkbox selection for favorite subjects
      setFormData(prevState => ({
        ...prevState,
        favoriteSubjects: e.target.checked
          ? [...prevState.favoriteSubjects, value]
          : prevState.favoriteSubjects.filter(subject => subject !== value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingIndicator('Loading...');
    const res = await userDataController.submitFormData(formData);
    if(res.success)
    {alert('Form submitted successfully!');
      setLoadingIndicator('Form submitted successfully!');
      return;
    }
  else alert('Eiish something went wrong, try again after 10 minutes please. Error:\n'+res.message);
  setLoadingIndicator('Eiish something went wrong, try again after 10 minutes please. Error:\n'+res.message)
  };

  return (
    <div>
      <section className='intro-part'>
        <p>We would love to hear your story, tell us about you! <br/>- AL Jenete (Head tutor)</p>
      </section>
      <section>
          <form onSubmit={(e)=>{e?.preventDefault()}} className="get-to-know-form">
          <label>Name & Surname<br/>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>Birthday<br/>
            <input type="date" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label>School<br/>
            <input type="text" name="school" value={formData.school} onChange={handleChange} />
          </label>
          <label>Grade<br/>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              <option defaultValue={true} disabled></option>
              <option value={'12'} >12</option>
              <option  value={'11'} >11</option>
              <option  value={'10'} >10</option>
              <option  value={'Rewriting'} >Rewriting</option>
            </select>
           
          </label>
          <label>Cell Number<br/>
            <input type="tel" name="cellNumber" value={formData.cellNumber} onChange={handleChange} />
          </label>
          <label>Email<br/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>Parent's Name<br/>
            <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />
          </label>
          <label>Parent's Cell Number<br/>
            <input type="tel" name="parentCell" value={formData.parentCell} onChange={handleChange} />
          </label>
          <label>Favorite Subjects (Select all that apply)<br/>
            <div className='subjects'>
              {["Math", "Science", 'EGD', 'Accounting', 'Life Sciences', 'Business',"Languages", 'Engineering/IT'].map(subject => (
                <div key={subject}>
                  <input
                    type="checkbox"
                    name="favoriteSubjects"
                    value={subject}
                    checked={formData.favoriteSubjects.includes(subject)}
                    onChange={handleChange}
                  /> {subject}
                  <hr/>
                </div>
              ))}
            </div>
          </label>
          <label>Achievements<br/>
            <textarea name="achievements" value={formData.achievements} onChange={handleChange} placeholder='e.g "Top achiever term 2 Math"'/>
          </label>
          <label>Career Interest:
            <CourseDataProviderUI selectedCareer={formData.careerInterest} setSelectedCourseProp={setSelectedCourse} />
          </label>
          
        </form>
      </section>
      {formData.name &&  <section className='my-story-part'>
              <UserProfileCard formData={formData}/>
              <p>Send us a screenshot of this page please and then submit</p>
              <p>{loadingIndicator}</p>
              <button onClick={handleSubmit}>Submit</button>
      </section>}
    </div>
  );
};

export default GetToKnowForm;
