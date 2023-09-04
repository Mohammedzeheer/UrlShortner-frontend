import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Store } from './redux/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer
        width="100px"
        fontSize="8px"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </React.StrictMode>
);


    // <Provider store={Store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <App />
    //   </PersistGate>
    // </Provider>