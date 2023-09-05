import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import { VscCopy } from "react-icons/vsc";
import { FiSave } from "react-icons/fi";
import { AxiosServer } from '../../api/AxiosInstance';
import { toast } from "react-toastify";
import './linkResult.css'


function LinkResult({InputValue}) {
    console.log(InputValue);
    let fullUrl=InputValue
    console.log(fullUrl)
    const [shortenedURL, setShortenedURL] = useState(); 
    const [copied,setCopied]=useState(false)
    const [create,setCreate]=useState(false)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

    const token=localStorage.getItem(`user`)
    console.log(token)
    const headers={authorization:token}

    const fetchData= async()=>{
       try {
        setLoading(true)
         const response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${InputValue}`)
         console.log(response)
         setShortenedURL(response.data.result.full_short_link)
     
       } catch (error) {
          setError(error)
       }finally{
          setLoading(false)
          setError(false)
       }
    }

   
    useEffect(()=>{
      if(InputValue.length){
        fetchData();
      }    
    },[InputValue])

    useEffect(()=>{
      const timer=setTimeout(()=>{
       setCopied(false)
      },1000)
      return ()=>  clearTimeout(timer)
    },[copied])

    
    useEffect(()=>{
      const timer=setTimeout(()=>{
       setCreate(false)
      },1000)
      return ()=>  clearTimeout(timer)
    },[create])


 if (loading) {
   return <p className="noData">Loading...</p>;
 }

 if (error) {
   return <p className="noData">Something went wrong...</p>;
 }


 const SaveData = async () => {
   try {
     if (token) {
       setCreate(true);
       const response = await AxiosServer.post(
         "/save",
         {
           fullUrl: fullUrl,
           shortenedURL: shortenedURL,
         },
         { headers }
       );
       window.location.reload(); 
     } else {
       toast.error("Please Login");
     }
   } catch (error) {
     console.error("Error saving data:", error);
     setError("Error saving data. Please try again.");
   }
 };


  return (
    <>
      {shortenedURL && (
        <>

<div className="result">
  <p className="symbol text-sm">{shortenedURL}</p>
</div>


<div style={{ display: 'flex', alignItems: 'center' }}>
  <CopyToClipboard text={shortenedURL} onCopy={() => setCopied(true)}>
    <button className={`result-button ${copied ? "copied" : ""} text-sm hover:bg-orange-500 `}>
      <VscCopy className="text-lg" />{" "}
      <span className="text-xs ml-1"> Copy</span>
    </button>
  </CopyToClipboard>

  <button
    onClick={SaveData}
    className={`create-button ${create ? "create" : ""} text-sm hover:bg-orange-500 ml-2 `}
  >
    <FiSave className="text-lg" />
    <span className="text-xs ml-1"> Save</span>
  </button>
</div>



          {/* <div className="result mx-2">
            <p className="symbol">{shortenedURL}</p>

            <CopyToClipboard text={shortenedURL} onCopy={() => setCopied(true)}>
              <button className={`result-button ${copied ? "copied" : ""}  hover:bg-orange-500 `}>
                <VscCopy className="text-lg" />{" "}
                <span className="text-sm ml-1"> Copy</span>
              </button>
            </CopyToClipboard>

            <div className="create ml-2">
              <button
                onClick={SaveData}
                className={`create-button ${create ? "create" : ""} hover:bg-orange-500 `}
              >
                <FiSave className="text-lg" />
                <span className="text-sm ml-1"> Save</span>
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div> */}
        </>
      )}
    </>
  );
}

export default LinkResult