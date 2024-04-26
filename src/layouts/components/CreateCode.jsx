"use client"
import React ,{ useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegClipboard } from "react-icons/fa";
import DissapearingText from "./DisappearingText";
export default function CreateCode({ setShowForm }){

    const router = useRouter();
    const [inviteCode , setInviteCode ] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const [copied , setCopied] = useState(false);

    useEffect(()=>{
        //This Function will Fetch a new Invite Code from the Backend and store it into the local Storage
        async function fetchData(){
            const response = await fetch("http://localhost:3000/InviteCode")
            const responseData = await response.text();
            localStorage.setItem("inviteCode", responseData);                             // Storing the Invite Code inthe local storage to prevent refetching the data again & again
            setInviteCode(responseData);
        };

        const cachedCode = localStorage.getItem("inviteCode");                            // Getting Invite code from the local Storage 
        if (cachedCode) {                                                                 // If code exist"s in local storage then we use it else we fetch a new code
            setInviteCode(cachedCode);
        } else {
            // Fetch the invite code from the server
            fetchData();
        }
    },[]);
    //Function to Copy the Invite Code to the Clipboard
    const copyText = ()=>{
        setCopied(true);
        navigator.clipboard.writeText(inviteCode);

        setTimeout(() => {
        setCopied(false);
        }, 2000);
    }
    // This Function will redirect the user to the Editor page
    const validator = ()=>{
        setLoadingState(true);
        router.push(`/room/${inviteCode}`);  
    }

    return (
      <React.Fragment>
        <h3 className="font-bold text-lg my-3">
          Share this code with your Friends
        </h3>
            {inviteCode !== null ? (
                <div style={{display:"grid"}}>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 border-2 rounded-md border-teal-500">
                            <input type="text" placeholder={inviteCode} className="input input-bordered w-full max-w-xs" disabled  />
                        </div>
                        <div className="self-center	flex flex-row gap-2">
                            <FaRegClipboard size={23} style={{cursor:"pointer"}} onClick={copyText}/>
                            {copied && <DissapearingText>Copied !</DissapearingText>}
                        </div>
                    </div>
                <button className={`btn btn-primary`} style={{marginTop:"2rem" , justifySelf:"center" , paddingLeft:"20px" , paddingRight:"20px" , marginBottom:"1rem"}} onClick={validator}>
                {
                    loadingState ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            loading
                        </>
                    ) :
                    (
                        <>Start Now</>
                        )
                    }
                </button>
            </div>
            ) : (
                <span className="loading loading-infinity loading-lg" style={{marginTop:"1rem"}}></span>
                )}
        <p className="py-4">
          Have a Invite code ?{" "}
          <button
            className="btn btn-sm"
            onClick={() => {
              setShowForm(true);
            }}
            style={{ cursor: "pointer" }}
          >
            Join room
          </button>
        </p>
      </React.Fragment>
    );
}