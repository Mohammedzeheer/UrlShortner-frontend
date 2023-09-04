import React, { useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {

  const handleLogout = () => {
    localStorage.removeItem('user');
    googleLogout()
    window.location.reload(); 
  };

  useEffect(()=>{
  },[handleLogout])

  return (
    <div>
        <div
          className="fixed top-4 right-4 cursor-pointer bg-white border border-gray-300 p-2 rounded-full shadow-md z-10"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-gray-600 hover:text-red-400" />
        </div>
  </div>
  );
};

export default LogoutButton;





// import React from 'react';
// import { FaSignOutAlt } from 'react-icons/fa';

// const LogoutButton = () => {
//   const handleLogout = () => {
//     // Implement your logout logic here
//   };

//   return (
//     <div
//       className="fixed top-4 right-4 cursor-pointer bg-white border border-gray-300 p-2 rounded-full shadow-md z-10"
//       onClick={handleLogout}
//     >
//       <FaSignOutAlt className="text-gray-600" />
//     </div>
//   );
// };

// export default LogoutButton;
