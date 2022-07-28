import { useState, useEffect } from "react";
import Image from 'next/image';
import { FaUserPlus,FaChevronDown,FaChevronUp } from "react-icons/fa";
import PersonalRoom from 'components/PersonalRoom';
import GroupRoom from 'components/GroupRoom';

function SideBar(){
   const [name, setName] = useState("Vu Le Anh")
   const [showPersonalMessage, setShowPersonalMessage] = useState(false);
   const [showGroupMessage, setShowGroupMessage] = useState(false);

   function handleShowPersonalMessage(){
      setShowPersonalMessage(prevState => !prevState);
   }

   function handleShowGroupMessage(){
      setShowGroupMessage(prevState => !prevState);
   } 
   return(
      <div className="sidebar">
         <div className="personalinfo">
            <Image
               src='/avatar.png'
               alt='avatar'
               width={50}
               height={50}
            />
            <div className="info">
               <p className='name'>{name}</p>
               My account
            </div>
         </div>
         <div className='search-add mt-1'>
            <input className='search' type="text" placeholder="Search"></input>
            <FaUserPlus className="icon-add"/>
         </div>
         <div className="typemessage mt-2">
            <div>
               Personal message
               {showPersonalMessage?
                  <>
                     <FaChevronUp className="icon-scrolltypemessage" onClick={handleShowPersonalMessage} />
                     <PersonalRoom/>
                  </>
                  :
                  <FaChevronDown className="icon-scrolltypemessage" onClick={handleShowPersonalMessage}/>             
               }
            </div>

            <div>
               Group message
               {showGroupMessage?
               <>
                  <FaChevronUp className="icon-scrolltypemessage" onClick={handleShowGroupMessage}/>
                  <GroupRoom/>
               </>
                  :
                  <FaChevronDown className="icon-scrolltypemessage" onClick={handleShowGroupMessage}/>                 
               }
            </div>
         </div>
         <p className="copyright">Copyright 2022 All Rights Reserved Bozuman </p>
      </div>
   )
}

export default SideBar;