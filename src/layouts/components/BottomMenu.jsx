"use client";
import React, { useState } from "react";
import { IoExit } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { MdSettingsEthernet } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaRegClipboard } from "react-icons/fa";
import DissapearingText from "./DisappearingText";

export default function BottomMenu({ isMobile , disconnect , setShow}){

  const router = useRouter();
  const url = window.location.href;
  const [copied , setCopied] = useState(false);

  const leaveRoom = async ()=>{
    const response = await disconnect(); 
    console.log(response);
    if(response){
      setShow(true);
      setTimeout(() => {
        localStorage.removeItem("inviteCode");
        router.push("/");
      }, 2200);
    }
  }
  const handleCopyButtonClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(url);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

    return (
      <React.Fragment>
        {!isMobile ? (
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box ">
            <li>
              <span> Configure <MdSettingsEthernet size={23}/></span>
            </li>
            <li  onClick={()=>document.getElementById("share-modal").showModal()}>
              <span> Share <IoMdShare size={23}/></span>
            </li>
            <li onClick={()=>document.getElementById("leave-modal").showModal()}>
              <span> Leave Room <IoExit size={23}/></span>
            </li>
          </ul>
          ):(
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <span><MdSettingsEthernet size={23}/></span>
            </li>
            <li  onClick={()=>document.getElementById("share-modal").showModal()}>
              <span><IoMdShare size={23}/></span>
            </li>
            <li onClick={()=>document.getElementById("leave-modal").showModal()}>
              <span><IoExit size={23}/></span>
            </li>
          </ul>
        )}
        
        {/* Dialog for Sharing  */}
        <dialog id="share-modal" className="modal">
          <div className="modal-box">
            <h1 className="font-bold text-lg my-3">
              Share Code 
            </h1>
            <span className="text-sm ">Anyone with access to this URL will see your code in real time.</span>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="col-span-2 border-2 rounded-md border-teal-500">
              <input type="text" placeholder={url} className="input w-full max-w-xs" disabled  />
              </div>
              <div className="self-center	flex flex-row gap-2">
                <FaRegClipboard size={23} style={{cursor:"pointer"}} onClick={handleCopyButtonClick}/>
                {copied && <DissapearingText>Copied !</DissapearingText>}
              </div>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Modal for Confirming leaving the Editor Page */}
        <dialog id="leave-modal" className="modal">
          <div className="modal-box flex flex-col">
            <h1 className="font-bold text-xl my-3 self-center">
              Are you Sure You want to Leave the Room ?
            </h1>
            <div className="flex justify-center">
              <button className="btn btn-outline btn-accent" onClick={leaveRoom}>Leave</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>


      </React.Fragment>
    )

}