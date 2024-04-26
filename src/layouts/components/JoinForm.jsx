"use client";
import React, { useState } from "react";
import { GoKey } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function JoinForm({setShowForm}){

    const [loadingState , setLoadingState] = useState({state:false,text:""});
    const [code , setCode] = useState("");
    const router = useRouter();

    const handleChange = (event)=>{
        if(code.length < 0)
            setLoadingState({text:"Enter the Invite Code !"});
        else
            setLoadingState({text:""});
        setCode(event.target.value);
    }
    const validate = ()=>{
        setLoadingState({state:true});
        if(code !== "")
           router.push(`/room/${code}`);  
        else{
            setLoadingState({state:false , text:"Enter the Invite Code !" });

        }
    }

    return (
        <React.Fragment>
            <h3 className="font-bold text-lg my-3 pb-4">
            Enter User ID and Invitation code
          </h3>
          <label className="input input-bordered flex items-center gap-2" style={{marginTop: "2rem"}}>
                <GoKey />
                <input type="text" className="grow" placeholder="Invite code" onChange={handleChange} value={code} />
          </label>
          <div style={{display:"grid"}}>
            <span style={{marginTop:"2rem", justifySelf:"center" , color:"red"}}>{loadingState.text}</span>
            <button className="btn btn-primary" style={{marginTop:"2rem" , justifySelf:"center" , paddingLeft:"20px" , paddingRight:"20px"}} onClick={validate}>
                {
                    loadingState.state ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            loading
                        </>
                    ) :
                    (
                        <>Join Room</>
                    )
                }
            </button>
          </div>
          <p className="py-4">Don't have an Invite code ? Create Your <button className="btn btn-sm" onClick={()=>{setShowForm(false)}} style={{cursor:"pointer"}}>own Room</button></p>
        </React.Fragment>
    )
}