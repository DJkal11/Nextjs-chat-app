
import React, { useContext} from "react";
import { Context } from "../context";

import { useRouter } from "next/router";
import axios from "axios";


export default function Auth() {
 const { username, setUsername, secret, setSecret } = useContext(Context);
 const router = useRouter();
 const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

 function onSubmit(event) {
   event.preventDefault();
   if( username === 0 || secret === 0) return

   axios.put(
     "https://api.chatengine.io/users/",
     {username, secret},
     {headers: {"Private-key": privateKey}}
   ).then( response => router.push("/chats"))
 }
 
  return <div className="background">
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <div className="auth-title">Chatter Box</div>
        <div className="input-container">
          <input
          placeholder="Enter Email"
          className="text-input"
          onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
          type="password"
          placeholder="Enter Password"
          className="text-input"
          onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Log in / Sign up</button>
      </form>

    </div>
  </div>;
}
