import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AxiosServer } from "../../api/AxiosInstance";
import "./login.css";

function Login() {
  const token = localStorage.getItem("user");
  return (
    <>
      {!token && (
        <div className="googleLogin">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_clientId}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                let decoded = jwt_decode(credentialResponse.credential);
                const UserObject = {
                  username: decoded.given_name,
                  email: decoded.email,
                };
                const response = await AxiosServer.post(
                  "/userRegister",
                  { ...UserObject, isGoogleSignup: true },
                  { withCredentials: true }
                );

                if (response) {
                  const token = response.data.token;
                  localStorage.setItem("user", JSON.stringify(token));
                  window.location.reload();
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      )}
    </>
  );
}

export default Login;
