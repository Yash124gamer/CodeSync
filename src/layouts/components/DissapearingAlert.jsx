import { useEffect, useState } from "react"
import { IoHappyOutline } from "react-icons/io5";


export default function DissapearingAlert({children , timeout=3000}){

    const [visible , setVisible] = useState(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setVisible(false);
        },timeout);

        return ()=>{
            clearTimeout(timer);
        };

    },[timeout]);

    return (
        <div role="alert" className="alert alert-success" style={{ opacity: visible ? '1' : '0' }}>
            <IoHappyOutline size={23}/>
            <span>{children}</span>
        </div>
    )

}