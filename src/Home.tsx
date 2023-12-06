import React, {useEffect, useState} from 'react';
import {PostAccount} from "./model/types";
import Header from "./Components/Header";
import ModalWind from "./Components/Modal";
import PostAccountElement from "./Components/PostAccountElement";
import axios from "axios";

const Home = () => {
    const [posts, setPosts] = useState([] as PostAccount[])

    useEffect(() => {
        axios.get("http://localhost:3000/post")
            .then(res => {
                setPosts(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    })
    return (
        <div className="container">
            <Header/>
            <div className="content">
                <div className="accountlist">
                    <div className="toptext">
                        <p> Account List</p>
                        <ModalWind/>
                    </div>
                    <div className="totalblock">
                        <p className="total">Total:{posts.length}</p>
                    </div>
                    <div className="accounts">
                        <p className="txt">Name</p>
                        <p className="txt">Account name</p>
                        <p className="txt">E-mail</p>
                        <p className="txtStatus">Status</p>
                        <p className="txtSDate">Start date</p>
                        <p className="txtEDate">Expiration date</p>
                    </div>
                    {posts.map(post =>
                        <PostAccountElement postAccount={post}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;