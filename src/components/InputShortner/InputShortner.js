import React, { useState } from 'react';
import './InputShortner.css'

function InputShortner({setInputValue}) {
  const [originalURL, setOriginalURL] = useState('');
  const handleClick=()=>{
    setInputValue(originalURL)
    setOriginalURL('')
  }
  return (
    // <div className="Container">
      <div className="InputContainer m-2">
        <h1>
          URL <span> Shortner</span>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Paste the link to shortern it"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
          />
          <button className='hover:bg-orange-500' onClick={handleClick}>Shorten</button>
        </div>
      </div>
    // </div>
  );
}

export default InputShortner;



  // const [shortenedURL, setShortenedURL] = useState('');

  // const handleShorten = () => {
  //   setShortenedURL('https://short.ly/abc123');
  // };

  // return (
    
    // <div className="App">
    //   <h1>URL Shortener</h1>
    //   <div className="shorten-form">
    //     <input
    //       type="url"
    //       placeholder="Enter URL to shorten"
    //       value={originalURL}
    //       onChange={(e) => setOriginalURL(e.target.value)}
    //     />
    //     <button onClick={handleShorten}>Shorten</button>
    //   </div>
    //   {shortenedURL && (
    //     <div className="shortened-url">
    //       <p>Your shortened URL:</p>
    //       <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
    //         {shortenedURL}
    //       </a>
    //     </div>
    //   )}
    // </div>
  // );
// }





// function InputShortner() {
//   return (
//     <div className="InputContainer">
//         <h1>URL <span>Shortner</span></h1>
//         <div className='InputContainer'>
//         <input type="text" name="url" id="" placeholder='Paste the link to shortern it' />
//         <button>Shortern</button>
//         </div>
//     </div>
//   )
// }


