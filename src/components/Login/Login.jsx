import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AxiosServer } from "../../api/AxiosInstance";
import "./login.css";

function Login() {
  const [error, setError] = useState(null);

  const handleGoogleLogin = async (credentialResponse) => {
    console.log('heelo --1')
    try {
      let decoded = jwt_decode(credentialResponse.credential);
      const UserObject = {
        username: decoded.given_name,
        email: decoded.email,
      };
      console.log(UserObject,'heelo --2')
      const response = await AxiosServer.post(
        "/userRegister",
        { ...UserObject, isGoogleSignup: true },
        { withCredentials: true }
      );
      console.log(response,'heelo --3')
      if (response && response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.token));
        window.location.reload(); 
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      {!localStorage.getItem("user") && (
        <div className="googleLogin">
          <GoogleOAuthProvider clientId="376497180189-21t71ir6d7ld1jcqdnb1p5bnr3a809c7.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setError("Login failed. Please try again.");
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          {error && <div className="error">{error}</div>}
        </div>
      )}
    </>
  );
}

export default Login;





// import React, { useState } from "react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import { AxiosServer } from "../../api/AxiosInstance";
// import "./login.css";

// function Login() {
//   const token = localStorage.getItem("user");
//   return (
//     <>
//       {!token && (
//         <div className="googleLogin">
//           <GoogleOAuthProvider clientId="376497180189-21t71ir6d7ld1jcqdnb1p5bnr3a809c7.apps.googleusercontent.com">
//           {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_clientId}> */}
//             <GoogleLogin
//               onSuccess={async (credentialResponse) => {
//                 let decoded = jwt_decode(credentialResponse.credential);
//                 const UserObject = {
//                   username: decoded.given_name,
//                   email: decoded.email,
//                 };
//                 const response = await AxiosServer.post(
//                   "/userRegister",
//                   { ...UserObject, isGoogleSignup: true },
//                   { withCredentials: true }
//                 );

//                 if (response) {
//                   const token = response.data.token;
//                   localStorage.setItem("user", JSON.stringify(token));
//                   window.location.reload();
//                 }
//               }}
//               onError={() => {
//                 console.log("Login Failed");
//               }}
//             />
//           </GoogleOAuthProvider>
//         </div>
//       )}
//     </>
//   );
// }

// export default Login;
