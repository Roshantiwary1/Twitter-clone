import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUJWe_Kp0aV5HYKmmHlV_p9YAdxCJfnyc",
  authDomain: "twitter-8ccdb.firebaseapp.com",
  projectId: "twitter-8ccdb",
  storageBucket: "twitter-8ccdb.appspot.com",
  messagingSenderId: "785415714748",
  appId: "1:785415714748:web:eeebe67acf67cb6a865db9"
};

const app = initializeApp(firebaseConfig);
const db =getFirestore();
const storage=getStorage();
export const auth = getAuth(app);

export {db,storage,app};