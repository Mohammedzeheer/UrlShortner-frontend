import React, { useEffect, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import { VscCopy } from "react-icons/vsc";
import './linkResult.css'

function LinkResult({InputValue}) {
    console.log(InputValue);
    const [shortenedURL, setShortenedURL] = useState();
    const [copied,setCopied]=useState(false)
    const [create,setCreate]=useState(false)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)

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

 if(loading){
      return <p className='noData'>Loading...</p>
    }
    
    if(error){
      return <p className='noData'>Something went wrong...</p>
    }

  return (
    <>  
    {shortenedURL&&(
      <> 
      <div className='result'>
         <p>{shortenedURL}</p>
         <CopyToClipboard text={shortenedURL}
          onCopy={() => setCopied(true)}>
          <button className={copied ? 'copied' : ''}><VscCopy className='copysymbol'/> <span>Copy</span></button>
        </CopyToClipboard>      
     </div>
     <div className='create'>
         
         <button className={create ? 'create' : ''} onCopy={() => setCreate(true)} ><span>Create</span></button>    
     </div> 
     </>
     )}   
    </>
  
  )
}

export default LinkResult