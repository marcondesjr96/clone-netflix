import React from "react";
import "./Header.css"

export default ({black}) =>{
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://i.pinimg.com/236x/44/12/bf/4412bfc885678031666b7e08b125fbb5.jpg"></img>
                </a>
            </div>
        </header>
    );
}