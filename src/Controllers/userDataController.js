import FirebaseConfig from "../Service/FirebaseConfig";

export const userDataController = {
    submitFormData: async (formData) => {
      console.log(formData);
        try {
          const success = await FirebaseConfig.postGTKData(formData);
            return success;
        } catch (error) {
          console.error('Error adding user: ', error);
          return {success: false,message:'Error adding user: '};
        }
      },
  };
  