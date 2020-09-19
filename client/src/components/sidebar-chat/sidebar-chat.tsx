import React from 'react';
import './sidebar-chat.css';
import { Avatar } from '@material-ui/core';

const SidebarChat = () => {
  return (
    <div className="sidebar-chat">
        <Avatar />
        <div className="sidebar-chat-info">
          <h2 className="sidebar-chat-roomname">Room name</h2>
          <p>This is the last message</p>
        </div>
    </div>
  );
}

export default SidebarChat;
