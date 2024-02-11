import FirebaseConfig from "../Service/FirebaseConfig";

const ClassroomController = {
  addUser: async (userData) => {
    try {
      const success = await FirebaseConfig.postUserData(userData);
        return success;
    } catch (error) {

      console.error('Error adding user: ', error);
      return {success: false,message:'Error adding user: '};
    }
  },

  updateUserDetails: async (userData) => {
    try {
      const success = await FirebaseConfig.updateUser(userData);
        return success;
    } catch (error) {

      console.error('Error adding user: ', error);
      return false;
    }
  },
  
  getRegisteredStudents: async () => {
    try {
      const students = await FirebaseConfig.getAllUsers();
      return students;
    } catch (error) {
      console.error('Error getting registered students: ', error);
      return [];
    }
  },
  deleteUser: async (userId) => {
    try {
     
      const success = await FirebaseConfig.deleteUser(userId);
        return success;
    } catch (error) {

      console.error('Error adding user: ', error);
      return {success: false,message:'Error adding user: '};
    }
  }
};

export default ClassroomController;
