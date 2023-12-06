import React, {FC, useState} from 'react';
import Modal from 'react-modal';
import {PostAccount} from "../model/types";
// @ts-ignore
import cross from "../Img/cross.jpg";
// @ts-ignore
import calendar from "../Img/calendar.png";
import PostAccountElement from "./PostAccountElement";
import axios from "axios";

interface IPostAccount{
    oldPost:PostAccount;

}

const ModalWindEdit: FC<IPostAccount> = ({oldPost}) => {
    const [post,setPost] = useState<PostAccount>(oldPost)

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {

            width: '550px',
            height: '400px',
            margin: '20px auto',
            borderRadius: '10px',
        },

    };
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const editPost=()=>{
        axios.post('http://localhost:3000/post', {...post})
            .then(() => {
                console.log('Add was suc..')
                closeModal()
            })
            .catch(() => {
                console.log('Add was suc..')
            })
        closeModal()
    }

    const updatePost = ()=>{
        axios.put(`http://localhost:3000/post/${post.id}`,{...post} )
            .then(() => {
                console.log('Edited')
                closeModal()
            })
            .catch(() => {
                console.log('Error edit')
            })
        closeModal()
    }



    return (
        <div className="modalWindow">
            <button className="edit" onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <div className="blockModal">
                    <h2 className="createText">Create account</h2>
                    <img className="cross"
                         src={cross}
                         onClick={closeModal}></img>

                    <h3 className="inpName">Name</h3>
                    <input className="inp" type="text" value={post.name} onChange={(e) => setPost({...post, name: e.target.value})}/>
                    <h3 className="inpName">Account</h3>
                    <input  className="inp" type="text" value={post.accountName}  onChange={(e)=> setPost({...post, accountName:e.target.value})}/>
                    <h3 className="inpName" >Example select</h3>
                    <select className="inp" value={post.status} onChange={(e)=> setPost({...post,status:e.target.value})}>
                        <option value="active">Active</option>
                        <option value="disable">Disable</option>
                        <option value="pending">Pending</option>
                    </select>
                    <h3 className="inpName">Email</h3>
                    <input className="inp" type="text" value={post.email} onChange={(e)=> setPost({...post, email:e.target.value})}/>

                    <div className="blockDate">
                        <div className="start">

                            <h3 className="inpName">Start date</h3>
                            <div className="date">

                                <input type="text" value={post.startDate} onChange={(e)=>setPost({...post, startDate:Number(e.target.value)})} />
                                <img className="cal"
                                     src={calendar}
                                     alt=""/>
                            </div>

                        </div>
                        <div className="exp">
                            <h3 className="inpName">Expiration date</h3>
                            <div>

                                <input type="text" value={post.expirationDate} onChange={(e)=>setPost({...post, expirationDate:Number(e.target.value)})}/>
                                <img className="cal"
                                     src={calendar}
                                     alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="csBlock">
                        <div className="cancel" onClick={closeModal}>
                            Cancel
                        </div>
                        <div className="save" onClick={() =>  {
                            updatePost()
                        }}>
                            Save
                        </div>
                    </div>

                </div>
            </Modal>

        </div>
    );
};

export default ModalWindEdit;