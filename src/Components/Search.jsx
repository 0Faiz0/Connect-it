import React from 'react';
import { useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';

//import { BsSearch } from 'react-icons/bs';


const Search = () => {

  const [username, setUsername] = useState("")
  const [ user, setUser ] = useState(null)
  const [ err, setErr ] = useState(false)

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"),where("displayName", "==", username)
    );

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){
      setErr(true);
    }

    

  };

  const handleKey = e=>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try{
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), { messages: []});


        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
 
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  
  };

  return (
    <div className='search'>
        <div className="searchform">
            {/*<span className='searchicon'><BsSearch/></span>*/}
            <input type="search" placeholder='search users...' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username}></input>
        </div>
        {err && alert("User not found")}
        {user &&  <div className="userchat" onClick={handleSelect}>
            <img src={user.photoURL} alt=''></img>
            <div className="userchatinfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search