"use client"
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-inline_autocomplete";
import "ace-builds/src-noconflict/ext-options";
import "ace-builds/src-noconflict/snippets/java";
import BottomMenu from "@/layouts/components/BottomMenu";
import AceEditor from "react-ace";
import useSocket from "../../Socket/useSocket";
import { useEffect , useState} from "react";
import DissapearingAlert from "@/layouts/components/DissapearingAlert";

export default function Page({ params }) {

  const roomID = params.inviteCode;                                   // taking the Room ID from the URL parameters 
  const {sendKey , keyValue , isConnected , disconnect} = useSocket(roomID);       // initialising Custom hook useSocket that will connect the user to the respective Room
  const [isMobile, setIsMobile] = useState(false);
  const [show , setShow] = useState(false);

  const changeHandler = (newValue)=>{
    sendKey(newValue);
  }

  useEffect(()=>{
    const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(isMobileDevice);
    console.log(isMobile);
  },[]);

    return isConnected.state  ? (
      <div className="min-h-screen bg-base-200">
          {show && <DissapearingAlert>Thank you For Using our Service </DissapearingAlert>}
          <AceEditor
            style={{width:"100%",height:"100vh"}}
            placeholder=" "
            mode="java"
            theme="solarized_dark"
            name="editor"
            onChange={changeHandler}
            fontSize={20}
            lineHeight={19}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={keyValue}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <div className="absolute bottom-10 left-50 w-full flex justify-center ">
            <BottomMenu isMobile={isMobile} disconnect={disconnect} setShow={setShow}/>
          </div>
      </div>
    ) : (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <span className="loading loading-dots loading-lg"></span>
          <span>{isConnected.message}</span>
        </div>
      </div>
    );
  }