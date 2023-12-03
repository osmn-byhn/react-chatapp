import React, { useEffect, useState } from 'react'

function Chat({socket, username, room}) {
    const [currentMesssage, setCurrentMessage] = useState()

    const sendMessage = async () => {
        if (currentMesssage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMesssage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setCurrentMessage('')
        }
        

    }
    useEffect(() => {
        socket.on("receive_message", (data) =>{
            console.log(data);
        });
    
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);
    
  return (
    <div>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'></div>
        <div className='chat-footer'>
            <input type='text' placeholder='Heyy...' 
                onChange={(event) => {
                    setCurrentMessage(event.target.value)}
                } 
            />
            <button 
            disabled={!currentMesssage} 
            onClick={sendMessage}
            value={currentMesssage}
            onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
            }}
          >
            Send
            </button>
        </div>
    </div>
  )
}

export default Chat;