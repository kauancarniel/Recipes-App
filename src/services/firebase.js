import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
// import { collection, getDocs,
//   getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
// import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCJG0nCg1a3ErXCtklBMxyatRnSqMvvT2I',
  authDomain: 'recipe-app-g6-799a4.firebaseapp.com',
  projectId: 'recipe-app-g6-799a4',
  storageBucket: 'recipe-app-g6-799a4.appspot.com',
  messagingSenderId: '350284085174',
  appId: '1:350284085174:web:0a7ec451fc596b4e373317',
  measurementId: 'G-Z9RELJMEHD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
export const storage = getStorage(app);

export const uploadImage = async (id, photo, dir = 'profile') => {
  try {
    const name = id;
    const storageRef = ref(storage, `${dir}/${name}`);
    await uploadBytes(storageRef, photo);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error(error);
  }
};

// export const postFirebase = async (key, id, data) => {
//   await setDoc(doc(collection(db, key), id), data);
// };

// export const getFirebase = async (key, maxResults = null) => {
//   let q = query(collection(db, key), orderBy('createAt', 'desc'));
//   if (maxResults) q = query(q, limit(maxResults));

//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };
