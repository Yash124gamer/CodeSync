import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import config from '@/config/config.json';

const useSocket = (roomId) => {
  const [socket, setSocket] = useState(null);
  const [keyValue, setKeyValue] = useState(' ');
  const [isConnected , setIsConnected] = useState({state : false , message : "Joining you to the Room"});
  const rooms = [];

  // const removeRoomID = async()=>{
  //   const response = await fetch('http://localhost:3000/InviteCode',{
  //     method : "DELETE",
  //     body : JSON.stringify({code : roomId}),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return response;
  // }

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);
    //This Function will check if the RoomID is created by a user or not
    const checkRoomID = async ()=>{

      const response = await fetch(`${config.api.checkCode}`,{
        method:"POST",
        body : JSON.stringify({code : roomId}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const {result} = await response.json();
      if(result){
      // Join the room when the component mounts
      newSocket.emit('join-room', roomId , (response) => {
        if (response.success) {
          console.log("Joined Room Succesfully");
          setIsConnected({state:true , message : ""});
        } else {
          console.log("Could Not Join Room");
        }
      });
    }
    else{
      setIsConnected({state:false , message:"The Invite Code you entered is Wrong or has Expired "});
    }
  }
  checkRoomID();
    // Listen for incoming messages
    newSocket.on('receive-key', (newKeyValue) => {
        setKeyValue(newKeyValue);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  // Function to send a message via Socket.IO
  const sendKey = (key) => {
    if (socket) {
      socket.emit('send-key', roomId , key);
    }
  };


  //Function to Disconnect the user from the Room
  const disconnect = async ()=>{
    // const response  = await removeRoomID();
    if (socket) {
      socket.emit('leave-room', roomId , (response)=>{
        if (response.success) {
          setIsConnected({state:false , message : ""});
          return response.success;
        } else {
          return false;
        }
      });
      return true;
    }
  }

  return { keyValue, sendKey , isConnected , disconnect};
};

export default useSocket;
