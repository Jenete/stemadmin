import './App.css';
import ManualForm from './Views/ManualForm';
import ViewRegisteredStudents from './Views/ViewRegisteredStudents';
import ClassroomController from './Controllers/ClassroomController ';
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    const ver = sessionStorage.getItem('verifieduser');
    if (!ver){
       let inp = window.prompt("Enter key");
      while(inp !== '0740243108'){
        inp = window.prompt("Enter key");
      }
    }
    sessionStorage.setItem('verifieduser',true);
    fetchRegisteredStudents();
  }, []);

  const fetchRegisteredStudents = async () => {
    const fetchedStudents = await ClassroomController.getRegisteredStudents();
    setStudents(fetchedStudents);
  };

  const addUser = async (userData) => {
    const added = await ClassroomController.addUser(userData);
    if(added.success)
    fetchRegisteredStudents();
  return added;
  };

  const updateUserDetails = async (userData, closeModal) => {
    const added = await ClassroomController.updateUserDetails(userData);
    if(added){
      fetchRegisteredStudents();
      closeModal();
    }
  return added;
  };

  const deleteUser = async (userId) => {
    const remove = await ClassroomController.deleteUser(userId);
    if(remove.success)fetchRegisteredStudents();
    return remove;
  };

  return (
    <div className="App">
      <h1>STEM Hub Tutoring</h1>
      <ManualForm addUser={addUser} />
      <ViewRegisteredStudents students={students} deleteUser={deleteUser} updateUserDetails={updateUserDetails} />
    </div>
  );
}

export default App;
