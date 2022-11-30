import React from "react";
import "../Style.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { RiUserAddLine } from 'react-icons/ri';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    function refreshPage() {
        // window.location.reload(false);
        // alert("Registered succesfully")
      }

    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const file = e.target[0].files[0];
        const displayName = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;


        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
        

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
            (error) => {
                setErr(true);
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateProfile(res.user,{
                    photoURL: downloadURL,
                    displayName,
                });

                    await setDoc(doc(db, "users", res.user.uid),{
                        uid: res.user.uid,
                        photoURL : downloadURL,
                        displayName,
                        email 
                    });

                    await setDoc(doc(db, "userChats", res.user.uid), {});
                    navigate("/");
                });
            }
            );

            alert("Registered succesfully !")
        }
        catch (err) {
            setErr(true);
        }       
    };


    return(
        <div className="formContainer">
            <div className="formWrapper">
            <div className="logo"><span className='logo1'>Connect<span className='logo2'> it</span></span></div>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="file" id="file" style={{display:"none"}}></input>
                    <label htmlFor="file"><RiUserAddLine/></label>
                    <input type="text" placeholder="Name"></input>
                    <input type="Email" placeholder="Email"></input>
                    <input type="password" placeholder="password"></input>
                    <button onClick={refreshPage}>Sign up</button>
                    {err && <span className="error">Something went wrong</span>}
                </form>
                <p>Already have an account ?<Link to="/Login"> Login </Link></p>
             </div>
        </div>
    )
}

export default Register;