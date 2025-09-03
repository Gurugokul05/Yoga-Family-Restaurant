import { db } from "../firebase/firebase";
import {  collection, getDocs } from "firebase/firestore";

export const getAdminEmail = async()=>{
    const firestoreAdminemail = await getDocs(collection(db,"Admin"));
    const adminEmail =[];
    firestoreAdminemail.forEach(doc => {
        adminEmail.push(doc.data().email)
    });
    return adminEmail;
};