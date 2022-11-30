import React from 'react'
import Input from './Input'
import Messages from './Messages'

import githubimg from '../images/githubicon.png'
import mypic from '../images/mypic.jpg'

import { FaLessThan,FaGreaterThan } from 'react-icons/fa';

import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const [isShown, setIsShown] = useState(false);
  const handleClick = event => {
    setIsShown(current => !current);
  };

  const [isLarge, setIsLarge] = useState(false);
  const larger = event => {
    setIsLarge(current => !current);
  };

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="navbarChat">
        <div className="profile">
          <img className='userimg' src={data.user?.photoURL} onClick={larger} alt=''></img>
          <img className='hiddenimg' src={data.user?.photoURL} style={{display: isLarge ? 'block' : 'none'}} alt=''></img>
          <span className='name'>{data.user?.displayName}</span>
        </div>
        
        <div className="buttons">
          <span className='about' style={{display: isShown ? 'block' : 'none'}}>
            <div className="nav">
              <div className="dots">
                <span className='dot1' onClick={handleClick}></span>
                <span className='dot2'></span>
                <span className='dot3'></span>
              </div>
            
              <div className="github"><img className='githubicon' src={githubimg} alt=""></img></div>

            </div>

            <span><img className='mypic' src={mypic} alt=''></img></span>

            <p>
              <FaLessThan className="icon"/><span className="key">html</span><FaGreaterThan className="icon"/><br/>
              <span className="tab1">
                <FaLessThan className="icon"/><span className="key">head</span><FaGreaterThan className="icon"/><br/>
              </span>        
              <span className="tab2">
                <FaLessThan className="icon"/><span className="key">title</span><FaGreaterThan className="icon"/>
                  About me
                <FaLessThan className="icon"/><span className="key">title</span><span className="backslash">/</span><FaGreaterThan className="icon"/>
              </span><br/>
              <span className="tab1">        
                <FaLessThan className="icon"/><span className="key">head</span><span className="backslash">/</span><FaGreaterThan className="icon"/>
              </span><br/>
              <span className="tab1">
                <FaLessThan className="icon"/><span className="key">body</span><FaGreaterThan className="icon"/>
              </span><br/>
              <span className="tab2">
                <FaLessThan className="icon"/><span className="key">p</span><FaGreaterThan className="icon"/>
              </span><br/>
              <span className="tab3">
                Hello, My name is <span><a href="https://www.linkedin.com/in/muhammad-faiz-42bb23190/">Md Faiz</a></span>. I have completed my graduation from Academy Of Technology
                on Information Technology.<br/>
                I have created this web app using React js, Firebase and for the styling i have used SASS. For more info click to the
                github icon.
              </span>
              <span className="tab2">
                <FaLessThan className="icon"/><span className="key">p</span><span className="backslash">/</span><FaGreaterThan className="icon"/>
              </span><br/>
              <span className="tab1">        
                <FaLessThan className="icon"/><span className="key">body</span><span className="backslash">/</span><FaGreaterThan className="icon"/>
              </span><br/>
                <FaLessThan className="icon"/><span className="key">html</span><span className="backslash">/</span><FaGreaterThan className="icon"/>
            </p>

          </span>
          <button className='aboutBtn' onClick={handleClick}>About me</button>
          <button className='logoutBtn' onClick={() => signOut(auth)}>Log out</button>
        </div>       
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat