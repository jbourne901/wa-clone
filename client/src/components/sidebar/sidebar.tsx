import React from 'react';
import './sidebar.css';
import {IconButton, Avatar} from "@material-ui/core";
import {DonutLarge, Chat, MoreVert, SearchOutlined} from "@material-ui/icons";
import SidebarChat from "../sidebar-chat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src="https://avatars2.githubusercontent.com/u/24712956?s=400&u=b71527e605ae1b748fc2d4157a842e57e427ad44&v=4"

        />        
        <div className="sidebar-header-right">
           <IconButton>
             <DonutLarge />
           </IconButton>
           <IconButton>
             <Chat />
           </IconButton>
           <IconButton>
             <MoreVert />
           </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlined />
          <input  type="text" 
                  placeholder="Search or start new chat" 
                  className="sidebar-search-input"
          />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />        
      </div>
    </div>
  );
}
export default Sidebar;
