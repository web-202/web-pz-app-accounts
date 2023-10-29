import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/Modal.css";
import { Account } from "./Accounts";

interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
  updateAccountList: (newUser: Account) => void;
  children: React.ReactNode;
}


const Modal: React.FC<ModalProps> = ({
  isOpen,
  isClose,
  updateAccountList,
  children,
}) => {
  const [newUser, setNewUser] = useState({
    name: "",
    account_name: "",
    status: "Active",
    email: "",
    start_date: "",
    expiration_date: "",
  });

  
  const [error, setError] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSaveUser = () => {
    const startTimestamp = new Date(newUser.start_date).getTime() / 1000;
    const expirationTimestamp =
      new Date(newUser.expiration_date).getTime() / 1000;

    if (newUser.name.length > 50) {
      setError("Name should not exceed 50 characters.");
      return;
    }
    if (/\d/.test(newUser.name)) {
      setError("Name should not contain digits.");
      return;
    }
    if (newUser.email.length > 50 || !validateEmail(newUser.email)) {
      setError(
        "Invalid email address. It should be less than 50 characters and have a valid format."
      );
      return;
    }
    if (startTimestamp >= expirationTimestamp) {
      setError("Expiration date should be later than the start date.");
      return;
    }

    const updatedUser = {
      ...newUser,
      start_date: startTimestamp,
      expiration_date: expirationTimestamp,
    };

    axios
      .post("http://localhost:3001/accounts", updatedUser)
      .then((response) => {
        console.log("User added successfully:", response.data);
        setNewUser({
          name: "",
          account_name: "",
          status: "",
          email: "",
          start_date: "",
          expiration_date: "",
        });
        setError("");
        isClose();
        updateAccountList(response.data);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {children}
      {isOpen ? (
        <div className="modal">
          <div className="modal-content">
            <h1 className="modal-title">Create Account</h1>
            <hr />
            <button className="close-btn" onClick={isClose}>
              x
            </button>
            <div className="form-container">
              <div className="form-row">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Account*</label>
                <input
                  type="text"
                  name="account_name"
                  value={newUser.account_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Example select*</label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
              <div className="form-row">
                <label>Email*</label>
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Start date:</label>
                <input
                  type="date"
                  name="start_date"
                  value={newUser.start_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Expiration date:</label>
                <input
                  type="date"
                  name="expiration_date"
                  value={newUser.expiration_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {error && <p className="error-message">{error}</p>}{" "}
            <div className="btn-container">
              <button className="cancel-btn" onClick={isClose}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveUser}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
      ,
    </>,
    document.body
  );
};

export default Modal;
