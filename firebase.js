import { initializeApp } from "firebase/app";
import {getFireStore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "twitter-8ccdb.firebaseapp.com",
  projectId: "twitter-8ccdb",
  storageBucket: "twitter-8ccdb.appspot.com",
  messagingSenderId: "785415714748",
  appId: "1:785415714748:web:eeebe67acf67cb6a865db9"
};

const db =getFireStore();
const storage=getStorage();
const app = initializeApp(firebaseConfig);

export {db,storage,app};