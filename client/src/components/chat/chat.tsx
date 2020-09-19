import React, {useState} from 'react';
import './chat.css';
import {Avatar, IconButton} from "@material-ui/core";
import {Mic, SearchOutlined, AttachFile, MoreVert, InsertEmoticon} from "@material-ui/icons";
import ChatMessage from "../chat-message";
import IMessage from "../../types/message";

interface IProps {
  send: (m: IMessage) => void;
  messages: IMessage[];
}
const Chat = (props: IProps) => {
  const [msg, setMsg] = useState<string>("");

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`sendmessage `)
    const m: IMessage = {
      name: "user1",
      message: msg,
      timestamp: new Date().toString(),
      received: false      
    };
    try {
      await props.send(m);
      setMsg("");
    } catch(err) {
      console.error(err);
    }
    

  };

  const msgs = [];
  for(let i=0; i<props.messages.length; i++) {
    msgs.push(<ChatMessage key={i} message={props.messages[i]} />);
  }

  
  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar />
        <div className="chat-headerinfo">
          <h3 className="chat-roomname">Dance room</h3>
          <p className="chat-lastseen">Last seen Fri, 04 Sept 2020 18:00:16 GMT</p>
        </div>

        <div className="chat-headerright">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
        </div>
      </div>

      <div className="chat-body">
        {msgs}
      </div>

      <div className="chat-footer">
          <InsertEmoticon />
          <form className="chat-form">
            <input
                  value={msg} 
                  onChange = {(e) => setMsg(e.target.value)}
                  type="text"
                  placeholder="Type a message"                  
                  className="chat-input"
            />
            <button type="submit" 
                  onClick = {(e) => sendMessage(e)}
                  className="chat-button"
            >
              Send a message
            </button>
          </form>   
          <Mic />       
      </div>
    </div>
  );
}

export default Chat;
