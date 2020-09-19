import React, { useEffect, useState } from 'react';
import './app.css';
import Chat from "../chat";
import Sidebar from "../sidebar";
import pusher from "../../pusher";
import axios from "../../axios";
import IMessage from "../../types/message"
import useStateValue from "../state-provider";
import { actionTypes } from '../../state/types';

const App = () => {

  const {state, dispatch} = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<IMessage[]>("/api/v1/messages");
        const msgs = res.data;
        dispatch({type: actionTypes.SET_MESSAGES, messages: msgs});
        console.log(`receive messages`)
      } catch(err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (msg: IMessage) => {
      console.log(`new message inserted `)
      console.dir(msg)
      dispatch({type: actionTypes.ADD_MESSAGE, message: msg})
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, []);

  const sendMessage = async (m: IMessage) => {
    try {
      const res = await axios.post("/api/v1/messages", m);
      console.log(`message sent res=`)
      console.dir(res)
      
    } catch(err) {
      console.error(err)
      throw(err);
    }    
  };

  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Chat 
            messages = {state.messages} 
            send = {(m: IMessage) => sendMessage(m) }
        />
      </div>
    </div>
  );
}

export default App;
