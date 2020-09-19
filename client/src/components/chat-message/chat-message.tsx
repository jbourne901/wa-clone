import React from 'react';
import './chat-message.css';
import IMessage from '../../types/message';

interface IProps {
  message: IMessage;
}

const ChatMessage = (props: IProps) => {
  return (
    <p className="chat-message"> 
      <span className="chat-message-name">
        {props.message.name}
      </span>
      {props.message.message}
      <span className="chat-message-timestamp">
        {props.message.timestamp}
      </span>
    </p>
  );
}
export default ChatMessage;
