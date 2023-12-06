import React, {useEffect, useState} from 'react';
import Header from "./Components/Header";
import {PostAccount} from "./model/types";
import axios from "axios";

import "./Styles/profile.css";
import {useParams} from "react-router-dom";

const Profile: React.FC = () => {
    const {id}=useParams();
    const [post,setPost] = useState<PostAccount>()
    useEffect(() => {
        axios.get(`http://localhost:3000/post/${id}`)
            .then(res => {
                setPost(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    })

    return (
        <div className="page_Profile">
            <Header />
            <div className=" header_Second">

            </div>
            <div className="content_Profile">
                <p className="text_title">{post?.name}</p>
                <div className="text_Block">
                    <p className="text" >Name:{post?.name}</p>
                    <p className="text" >Account Name:{post?.accountName}</p>
                    <p className="text" >E-mail:{post?.email}</p>
                    <p className="text" >Status:{post?.status}</p>
                    <p className="text" >Start Date:{post?.startDate}</p>
                    <p className="text" >Expiration Date:{post?.expirationDate}</p>




                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Profile;