import React from 'react'
import './ChatMsg.css'

export default function ChatMsg(props) {
    return (
        <div className="divmsg">
            <img src={"http://localhost:5000/"+props.pic} alt="profilepic" className="picmsg"/>
            <div className="textmsg">
              {props.content}
            </div>
        </div>

    )
}
