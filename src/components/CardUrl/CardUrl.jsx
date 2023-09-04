import React, { useEffect, useState } from 'react';
import { AxiosServer } from '../../api/AxiosInstance';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { VscCopy } from "react-icons/vsc";
import { FcOk } from "react-icons/fc";
import './CardUrl.css'

const CardUrl = () => {
  const [Url, setUrl] = useState([]);
  const [copied, setCopied] = useState(false);
  const [showAllUrl, setshowAllUrl] = useState(false);
  const [copiedIndexes, setCopiedIndexes] = useState([]);

  const visibleURL = showAllUrl ? Url : Url.slice(0, 1);

  const token=localStorage.getItem(`user`)
  const headers={authorization:token}

  const fetchUrl = async () => {
    try {
      const response = await AxiosServer.get(`/getUrl`,{headers});
      setUrl(response.data.Url)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUrl()
  },[])


  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleCopy1 = (index) => {
    const newCopied = [...copied];
    newCopied[index] = true;
    setCopiedIndexes(newCopied);

    setTimeout(() => {
      newCopied[index] = false;
      setCopiedIndexes(newCopied);
    }, 1000);
  };

  return (
    <>
      {token && (
        <div className="flex flex-col items-center mt-1 mb-5 mx-3">
          <div className="w-lg max-w-md bg-white rounded-lg shadow-lg">
            {visibleURL.length > 0 ? (
              visibleURL.map((url, index) => (
                <div
                  key={index}
                  className={`p-3 ${
                    index === 0 ? "" : "border-t border-gray-200"
                  }`}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div style={{ flex: 1, marginLeft: "1px" }}>
                    <p className="text-gray-800 text-sm p-1">
                      <span className="font-bold pr-2">Url</span> {url.full}{" "}
                    </p>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p className="text-gray-800 text-sm p-1">
                        {" "}
                        <span className="font-bold pr-2">Shorten Url</span>{" "}
                        {url.short}
                      </p>
                      <CopyToClipboard text={url.short} onCopy={handleCopy}>
                        <div className="ml-auto">
                          {copied ? (
                            <FcOk />
                          ) : (
                            <VscCopy className="text-black text-lg hover:text-orange-500 cursor-pointer" />
                          )}
                        </div>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-600">No Url Added.</p>
            )}
          </div>
          {Url.length > 1 && (
            <button
              className="mt-4 text-gray-300 underline"
              onClick={() => setshowAllUrl(!showAllUrl)}
            >
              {showAllUrl ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default CardUrl;







    //         <div
    //           key={index}
    //           className={`p-3 ${index === 0 ? "" : "border-t border-gray-200"}`}
    //           style={{ display: "flex", alignItems: "center" }}
    //         >

    //           <div>    
    //             <p
    //               className="text-gray-800"
    //               style={{ flex: "1", marginLeft: "12px" }}
    //             >
    //             Full Url :  {review.full} <br/>
    //             Short Url :  {review.short}
    
    //   <CopyToClipboard text={review.short} onCopy={handleCopy}>
    //     <div className={`copy-button ${copied ? 'blinking' : ''}`}>
    //       <VscCopy className='text-sky-500 hover:text-sky-700' />
    //     </div>
    //   </CopyToClipboard>
    
    //             </p>

    //             {/* <CopyToClipboard text={review.short}
    //              onCopy={() => setCopied(true)}>
    //              <VscCopy className='bg-sky-500 hover:bg-sky-700'/>
    //     </CopyToClipboard> */}



        
    //           </div>
    //         </div>