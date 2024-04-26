import { useEffect, useState } from "react"

export default function DissapearingText({children , timeout=1500}){

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
            <span style={{ opacity: visible ? "1" : "0" }}>{children}</span>
    )

}