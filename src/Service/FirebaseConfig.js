import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB77d5fX4Mq6w0tRiIl9_03IpWegyxDZrE",
    authDomain: "app-v1-6f6fb.firebaseapp.com",
    projectId: "app-v1-6f6fb",
    storageBucket: "app-v1-6f6fb.appspot.com",
    messagingSenderId: "616453324690",
    appId: "1:616453324690:web:9611d4d03821afef934b4b"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const usersCollection = collection(db, "manualusers");
const gtkCollection = collection(db, "gtkcollection");

class FirebaseConfig {
    static async postUserData(userData) {
        try {
            userData = { ...userData, email: userData.cellnumber + '@' + userData.learnerName.replace(/\s/g, '') };
            const userRef = doc(usersCollection, userData.email);
            await setDoc(userRef, userData);
            return { success: true, message: "Successfully added a user" };
        } catch (error) {
            console.error('Error adding student: ', error);
            return { success: false, message: 'Error adding student' };
        }
    }
    static async postGTKData(userData) {
        try {
            userData = { ...userData, id: userData?.cellNumber + '@' + userData?.name.replace(/\s/g, '') };
            const userRef = doc(gtkCollection, userData.id);
            await setDoc(userRef, userData);
            return { success: true, message: "Successfully added a user" };
        } catch (error) {
            console.error('Error adding student: ', error);
            return { success: false, message: 'Error adding student' };
        }
    }

    static async getUserByEmail(userEmail) {
        let queryRef = '';
        try {
            queryRef = query(usersCollection, where('email', '==', userEmail));
        } catch (error) {
            console.error('Error in query: ', error);
        }
        
        const querySnapshot = await getDocs(queryRef);
        let user = null;
        querySnapshot.forEach((doc) => {
            user = doc.data();
        });
        return user;
    }

    static async getAllUsers() {
        try {
            const querySnapshot = await getDocs(usersCollection);
            return querySnapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error('Error getting all users: ', error);
            throw error;
        }
    }
    static async getAllGTKS() {
        try {
            const querySnapshot = await getDocs(gtkCollection);
            return querySnapshot.docs.map((doc) => doc.data());
        } catch (error) {
            console.error('Error getting all users: ', error);
            throw error;
        }
    }

    static async updateUser(userData) {
        try {
            const userRef = doc(usersCollection, userData.email);
            await setDoc(userRef, userData);
            return true;
        } catch (error) {
            console.error('Error updating user: ', error);
            return false;
        }
    }

    static async deleteUser(userId) {
        try {
            await deleteDoc(doc(usersCollection, userId));
            return true;
        } catch (error) {
            console.error('Error deleting user: ', error);
            return false;
        }
    }
}

export default FirebaseConfig;

