import React, { useState } from 'react';
import './styling/ViewRegisteredStudents.css';

const ViewRegisteredStudents = ({ students, deleteUser, updateUserDetails }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const showUserDetails = (student) => {
        setSelectedStudent(student);
    };

    const closeModal = () => {
        setSelectedStudent(null);
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setSelectedStudent(prevStudent => ({
            ...prevStudent,
            [field]: value
        }));
    };
    

    const FullDetailsModal = () => {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    {selectedStudent && (
                        <div className="student-details">
                            <h2>Full Details</h2>
                            <p><strong>Name:</strong> <input type="text" value={selectedStudent.learnerName} onChange={(e) => handleInputChange(e, 'learnerName')} /></p>
                            <p><strong>Grade:</strong> <input type="text" value={selectedStudent.grade} onChange={(e) => handleInputChange(e, 'grade')} /></p>
                            <p><strong>Subject:</strong> <input type="text" value={selectedStudent.subject} onChange={(e) => handleInputChange(e, 'subject')} /></p>
                            <p><strong>Cell Number:</strong> <input type="text" value={selectedStudent.cellnumber} onChange={(e) => handleInputChange(e, 'cellnumber')} /></p>
                            <p><strong>Parent's Cell Number:</strong> <input type="text" value={selectedStudent.parentCell} onChange={(e) => handleInputChange(e, 'parentCell')} /></p>
                            <p><strong>Parent's Full Name:</strong> <input type="text" value={selectedStudent.parentFullName} onChange={(e) => handleInputChange(e, 'parentFullName')} /></p>
                            <p><strong>Other Info:</strong> <input type="text" value={selectedStudent.otherInfo} onChange={(e) => handleInputChange(e, 'otherInfo')} /></p>
                            <p><strong>Start Availability:</strong> <input type="text" value={selectedStudent.startAvailability} onChange={(e) => handleInputChange(e, 'startAvailability')} /></p>
                            <p><strong>New Date:</strong> <input type="text" value={selectedStudent.newDate} onChange={(e) => handleInputChange(e, 'newDate')} /></p>
                            <p><strong>Payments:</strong> <input type="text" value={selectedStudent.payments} onChange={(e) => handleInputChange(e, 'payments')} /></p>
                        </div>
                    )}
                    <button onClick={() => updateUserDetails(selectedStudent, closeModal)}>Update</button>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <h2>Registered Students</h2>
            {students ? (
                <table className="students-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Grade</th>
                            <th>Subject</th>
                            <th>Payments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index} onClick={() => showUserDetails(student)} className="student-row">
                                <td>{student.learnerName}</td>
                                <td>{student.grade}</td>
                                <td>{student.subject}</td>
                                <td>{student.payments}</td>
                                <td>
                                    <button onClick={() => deleteUser(student.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
            {selectedStudent && <FullDetailsModal />}
        </div>
    );
};

export default ViewRegisteredStudents;
